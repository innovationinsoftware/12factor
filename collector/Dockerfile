FROM node:15.4.0-alpine3.10

WORKDIR /app
COPY package.json /app
RUN npm install --only-production
COPY index.js /app
# COPY datastore /app/datastore
EXPOSE 3000
CMD node index.js