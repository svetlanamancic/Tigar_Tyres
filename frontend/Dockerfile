FROM node:23 as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .

RUN ng build

EXPOSE 80
FROM nginx as runtime
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html