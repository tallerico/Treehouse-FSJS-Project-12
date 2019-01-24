FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm run build
# RUN npm prune

COPY --chown=node:node

EXPOSE 3000

ENTRYPOINT ["npm", "start" ]
