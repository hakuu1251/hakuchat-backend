# hackuchat
JS Плагин мини-чат для связи с менеджером

## Make

Для запуска mongodb и nodejs в докере
```
make run
```

Для сборки `dist`
```
make build
```

## .env
```
PORT=your_port #for nodejs

DB_USER=your_username
DB_PASSWORD=your_pass
DB_DATABASE=your_database_name

DATABASE_URL=mongodb://${DB_USER}:${DB_PASSWORD}@mongo:27017/${DB_DATABASE}
```
## UI
[Figma project](https://www.figma.com/file/0LNKlUK1FPE2RcEUNpYRJS/hakuchat?node-id=0%3A1)
