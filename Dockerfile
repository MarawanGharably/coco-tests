# intermediate image for building the web app
FROM node:15 AS build-env

LABEL version="0.2.0"

# variable passed in with build command
ARG APP_ENV=develop
ENV APP_ENV $APP_ENV

ARG BASE_PATH
ENV BASE_PATH $BASE_PATH

# Disable Next telemetry
ARG NEXT_TELEMETRY_DISABLED=1

RUN apt-get update

# setup work directory, relative path will be inside this directory
# we need this because Jest can't find tests without this work directory
WORKDIR /coco-cms-workdir/

# copy the node dependency list and install
# copying to destinations without prefix / will copy into the work directory
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm ci

# copy test to WORKDIR
#COPY test/ test/

# copy bable configuration
COPY babel.config.js babel.config.js

# copy dotenv to WORKDIR
COPY dotenv dotenv

# copy over the application source
COPY src src

# copy eslint configuration
COPY .eslintrc.json .eslintrc.json

# copy eslint ignore
COPY .eslintignore .eslintignore

COPY next.config.js next.config.js

# build the application and copy it into the webroot
RUN npm run build-static

# copy built application into the webroot
RUN mkdir /www && \
    cp -rpv out/* /www

# copy files and folders as needed from the intermediate image
# this will remove the SSH_PRIVATE_KEY_GITLAB and intermediate tools like ssh and git which reduces the final image size
FROM alpine:3.7

# create the www folder and copy the www contents over from the intermediate image
RUN mkdir /www && \
    chmod -R 755 /www

COPY --from=0 /www /www
