# scale_up_back

## Prérequis 

- docker

## build

```bash
docker compose -f docker/docker-compose-dev.yml build
```

## Lancement

```bash
docker compose -f docker/docker-compose-dev.yml up
```

## Launch prisma studio

```bash
docker exec -it docker-api-1 sh
npx prisma migrate dev
npx prisma studio
```
