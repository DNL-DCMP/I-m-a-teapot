# I-m-a-teapot
## Integrantes
- Ailin Sofia Falcon (112231)
- Mateo Olaf Serrano (112011)
- Daniel Docampo (112395)
- Lourdes Acuña (112112)
## Yumm
**Página de recetas de cocina**    
1. Usa la barra de busqueda para encontrar recetas.
2. Comparte tus creaciones con está comunidad.
3. Descubre nuevas recetas y disfruta cocinando.
## requirements 
- Docker v.27.4.0 (Pruebo version 27.2.0) sudo snap install docker --channel=27.2.0/stable
- node v.18.0
- psql 17.2 (Del lado del cliente) instalada para que coincida con la del servidor

## Para el .env
DATABASE_URL="postgresql://user:password@server:port/db_name"

Luego ejecutar npx prisma generate

## Cuando el contenedor de la base de datos no aplico las migraciones:
docker exec -it backend npx prisma migrate deploy

## Start
- **para iniciar el servidor:** 
`docker -compose up --build -d `
- **Para /I-m-a-teapot/psql_data: permission denied**
`sudo chmod -R 777 ./psql_data `