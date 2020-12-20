FROM node:15.4.0-alpine3.10
USER root
COPY index.js .
COPY package.json .
RUN npm install --only-production
EXPOSE 3000
CMD ["node", "index.js"]
