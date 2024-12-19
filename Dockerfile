FROM node:20-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Set the environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV DATABASE_URL=mongodb://mongo:27017/locationsDB

EXPOSE 8080

CMD ["node", "dist/index.js"]