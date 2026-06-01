FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY db.js server.js ./

EXPOSE 5001

CMD ["node", "server.js"]
