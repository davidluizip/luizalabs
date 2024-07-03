FROM node:18.17.1-alpine as base

RUN npm install -g @nestjs/cli
RUN apk add --no-cache nodejs

WORKDIR /usr/app/
COPY package.json ./
RUN npm ci

FROM base as test
ENV NODE_ENV=development

COPY . .
EXPOSE 3000
CMD ["npm", "start:dev"]

FROM base as development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["npm", "start:dev"]

FROM base as production
ENV NODE_ENV=production
COPY . .
EXPOSE 3000
CMD ["npm", "start:prod"]