FROM node:14
# создание директории приложения
WORKDIR /usr/src/app
# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production
EXPOSE 8001