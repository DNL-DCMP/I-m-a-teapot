# Dockerfile
FROM postgres:17

RUN apt-get update && apt-get install -y postgresql-client