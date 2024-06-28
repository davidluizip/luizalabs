FROM public.ecr.aws/v4t2v0o6/node:18.12.1

WORKDIR /usr/src/app

COPY . .

RUN npm cache clean --force && npm ci

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start:prod" ]