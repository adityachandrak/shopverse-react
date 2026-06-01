# ShopVerse Docker and ECR Steps

This project uses one container for the React production build and Node API.
Run commands from the project root.

## Local Docker

```sh
docker build -t shopverse-web:local .
docker-compose up -d
docker-compose ps
curl -I http://localhost:5173
curl http://localhost:5173/api
docker-compose down
```

## Push to ECR

```sh
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=ap-south-1
REPO_NAME=shopverse-web
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME"

aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$REGION" ||
  aws ecr create-repository \
    --repository-name "$REPO_NAME" \
    --region "$REGION" \
    --image-tag-mutability IMMUTABLE_WITH_EXCLUSION \
    --image-tag-mutability-exclusion-filters filterType=WILDCARD,filter=latest \
    --image-scanning-configuration scanOnPush=true \
    --encryption-configuration encryptionType=AES256

aws ecr get-login-password --region "$REGION" |
  docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

docker tag shopverse-web:local "$ECR_URI:latest"
docker push "$ECR_URI:latest"

aws ecr put-lifecycle-policy \
  --repository-name "$REPO_NAME" \
  --region "$REGION" \
  --lifecycle-policy-text file://lifecycle-policy.json

aws ecr describe-images --repository-name "$REPO_NAME" --region "$REGION"
aws ecr get-lifecycle-policy --repository-name "$REPO_NAME" --region "$REGION"
```
