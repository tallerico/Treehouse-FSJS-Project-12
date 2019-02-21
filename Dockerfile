FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY client/package*.json ./client/

RUN npm install && \
    npm install backend && \
    npm install client
     
# RUN npm run build
# RUN npm prune

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["npm", "start" ]
