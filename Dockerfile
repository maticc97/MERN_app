FROM node:16-alpine AS build

WORKDIR /app

COPY app_public/package.json package.json
COPY app_public/package-lock.json package-lock.json

RUN npm install

COPY app_public/. .

RUN npm run-script build --output-path=dist -- --prod

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/app