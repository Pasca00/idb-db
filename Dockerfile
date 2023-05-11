FROM node:18.16.0-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 8081
# EXPOSE 3306

CMD ["npm", "start"]