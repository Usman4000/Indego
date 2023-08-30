# Use the official Node.js image as the base image
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]