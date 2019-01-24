FROM node:10.15.0-alpine

RUN npm install
RUN npm run build
RUN npm prune

ENTRYPOINT ["npm", "run", "-d", "start" ]
