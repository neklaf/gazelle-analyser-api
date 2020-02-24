# BASE IMAGE
FROM node:12
LABEL maintainer="Jose M. Sampayo <j.m.sampayo@live.com>"

# SETTING LOCALES
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y locales locales-all
RUN sed -i -e 's/# es_ES.UTF-8 UTF-8/es_ES.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LANG es_ES.UTF-8
ENV LANGUAGE es_ES:es
ENV LC_ALL es_ES.UTF-8

# SETTING WORKING DIR
WORKDIR /usr/src/app

# INSTALLING AND CATCHING APP DEPENDENCIES
ADD package*.json ./
RUN npm ci --only=production

# ADDING APP
COPY . .

# APPLYING PRODUCTION ENVIRONMENT CONFIGURATION
ADD environments/production.env ./.env

# RUNNING APPLICATION
EXPOSE 4202
CMD [ "npm", "start" ]

# Building locally
# docker build -t docker.pkg.github.com/jmsampayo/the-gazelle-project/gazelle-analyser-api:0.1.0 .
