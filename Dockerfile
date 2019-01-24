FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm run build
# RUN npm prune

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "start" ]
