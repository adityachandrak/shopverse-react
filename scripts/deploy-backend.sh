#!/usr/bin/env bash
set -euo pipefail

registry="$1"
repository="$2"
image_tag="$3"
region="$4"
image="$registry/$repository:$image_tag"
env_file="/opt/shopverse-backend/.env"
candidate="shopverse-backend-candidate"
current="shopverse-backend"
previous="shopverse-backend-previous"

wait_for_health() {
  local url="$1"

  for _ in $(seq 1 30); do
    if curl --fail --silent --show-error "$url"; then
      return 0
    fi
    sleep 2
  done

  return 1
}

if [ ! -f "$env_file" ]; then
  echo "Required backend environment file is missing: $env_file" >&2
  exit 1
fi

aws ecr get-login-password --region "$region" |
  docker login --username AWS --password-stdin "$registry"
docker pull "$image"

docker rm --force "$candidate" >/dev/null 2>&1 || true
docker run --detach \
  --name "$candidate" \
  --env-file "$env_file" \
  --env PORT=5002 \
  --publish 127.0.0.1:5002:5002 \
  "$image"

if ! wait_for_health "http://127.0.0.1:5002/api/health"; then
  echo "Candidate health check failed. Existing backend remains active." >&2
  docker logs "$candidate" >&2 || true
  docker rm --force "$candidate" >/dev/null 2>&1 || true
  exit 1
fi

docker rm --force "$candidate" >/dev/null
docker rm --force "$previous" >/dev/null 2>&1 || true

if docker inspect "$current" >/dev/null 2>&1; then
  docker stop "$current" >/dev/null
  docker rename "$current" "$previous"
  rollback_mode="container"
else
  systemctl stop shopverse-backend.service
  rollback_mode="systemd"
fi

docker run --detach \
  --name "$current" \
  --restart unless-stopped \
  --env-file "$env_file" \
  --env PORT=5001 \
  --publish 5001:5001 \
  "$image"

if ! wait_for_health "http://127.0.0.1:5001/api/health"; then
  echo "Production health check failed. Rolling back." >&2
  docker logs "$current" >&2 || true
  docker rm --force "$current" >/dev/null 2>&1 || true

  if [ "$rollback_mode" = "container" ]; then
    docker rename "$previous" "$current"
    docker start "$current" >/dev/null
  else
    systemctl start shopverse-backend.service
  fi

  exit 1
fi

systemctl disable shopverse-backend.service >/dev/null 2>&1 || true
docker rm --force "$previous" >/dev/null 2>&1 || true
docker image prune --force >/dev/null

echo "Backend deployed successfully: $image"
