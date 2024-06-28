#!/bin/bash 

mkdir artifact

cd app/

#######################################################

source ~/.nvm/nvm.sh

nvm install v18.12.1

node --version

npm install

cp config/.env-${ENVIRONMENT} config/.env

npm run build

if [ $? -eq 1 ]; then
  echo "Erro ao fazer o build da aplicação!"
  exit 1
fi

########################################################

zip -r app.zip .

mv app.zip ../artifact/