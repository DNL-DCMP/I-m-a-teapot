# TRABAJO FINAL
## Yumm ( App de Recetas de Comida 🍲)
Es una plataforma social donde los amantes de la cocina pueden compartir sus recetas, descubrir nuevas ideas culinarias y formar parte de una comunidad gastronómica. Esta aplicación permite a los usuarios publicar, buscar y comentar recetas de comida, brindando un espacio para que cada persona pueda compartir sus conocimientos y descubrir las creaciones de otros.
Características principales:

-**Publicar recetas:** Los usuarios pueden crear recetas personalizadas con una lista de ingredientes, pasos detallados y fotos que acompañen el proceso. La interfaz es intuitiva y permite agregar detalles como tiempo de preparación y la temperatura de coccion.

-**Buscar recetas:** Gracias al motor de búsqueda, los usuarios pueden encontrar recetas según el nombre, ingredientes o categorías. Ya sea que busques una receta específica o quieras explorar nuevas opciones, la función de búsqueda facilita encontrar lo que necesitas.

-**Comentar y valoraciones:** Los usuarios pueden dejar comentarios y sugerencias en las recetas de otros, creando un espacio de interacción y aprendizaje. Además, pueden valorar las recetas para ayudar a otros usuarios a encontrar las mejores opciones.

La app está diseñada para ser accesible y fácil de usar, ofreciendo una experiencia de usuario fluida tanto en dispositivos de escritorio como móviles. Ya seas un aficionado a la cocina o un chef profesional, aquí encontrarás un espacio para compartir tu pasión por la comida y explorar lo que otros han creado.

# Instalación 💻:

## requirements 
- Docker v.27.4.0 (Pruebo version 27.2.0) sudo snap install docker --channel=27.2.0/stable
- node v.18.0
- psql 17.2 (Del lado del cliente) instalada para que coincida con la del servidor

#### -Para empezar a usar esta app en tu entorno local, sigue estos pasos:
en tu terminal: `git clone git@github.com:DNL-DCMP/I-m-a-teapot.git `
#### -Para modicar en el archivo .env
DATABASE_URL="postgresql://user:password@server:port/db_name"
### -Luego ejecutar en tu terminal
` npx prisma generate `
### - **para iniciar el servidor:** 
` docker -compose up --build -d `
### - **Para /I-m-a-teapot/psql_data: permission denied**
` sudo chmod -R 777 ./psql_data `

### - **cuando el contenedor de la base de datos no aplico las migraciones:**
` docker exec -it backend npx prisma migrate deploy ` 

## Despliegue
https://i-m-a-teapot-front.onrender.com/

## Integrantes
### Ailin Sofia Falcon **112231**
### Mateo Olaf Serrano **112011**
### Daniel Docampo **112395**
### Lourdes Acuña **112112**
