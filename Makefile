COMPOSE := docker-compose -f docker-compose.yml

build:
	yarn build

run:
	@$(COMPOSE) up -d --build