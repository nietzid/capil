FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine:3.14 AS runtime-stage

RUN apk add --no-cache wget unzip
WORKDIR /pb

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.12/pocketbase_0.22.12_linux_amd64.zip && \
    unzip pocketbase_0.22.12_linux_amd64.zip && \
    rm pocketbase_0.22.12_linux_amd64.zip

COPY ./pb/pb_migrations /pb/pb_migrations

VOLUME /pb/pb_data

COPY --from=build-stage /app/dist /pb/pb_public

EXPOSE 8090

CMD ["sh", "-c", "./pocketbase serve --http 0.0.0.0:80"]