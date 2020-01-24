# intermediate image for building the web app
FROM node AS build-env

LABEL version="0.1.0"

# variable passed in with build command
ARG BUILD_STAGE=prod
ARG NGINX_SERVER_NAME=nginx-server-name
ARG NGINX_REDIRECT_URL=nginx-redirect-url
RUN echo ${BUILD_STAGE}

# copy nginx configuration
COPY nginx/conf.d/default.conf /nginxdefault.conf
# replace placeholders in nginx default.conf file
RUN sed -i "s|nginx-server-name|$NGINX_SERVER_NAME|g" /nginxdefault.conf
RUN sed -i "s|nginx-redirect-url|$NGINX_REDIRECT_URL|g" /nginxdefault.conf

RUN apt-get update && \
    apt-get install -y ssh git build-essential curl && \
    npm i npm@latest -g && \
    apt-get clean

# set up gitlab ssh credentials so npm can install from out private gitlab repos
RUN mkdir /root/.ssh/
# this is NOT a docker secret, we create ./var/secrets/SSH_PRIVATE_KEY_GITLAB manually
COPY ./var/secrets/SSH_PRIVATE_KEY_GITLAB /root/.ssh/id_rsa
RUN chmod 400 /root/.ssh/id_rsa
# make sure your domain is accepted
RUN touch /root/.ssh/known_hosts && \
    ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

# setup work directory, relative path will be inside this directory
# we need this because Jest can't find tests without this work directory
WORKDIR /coco-cms-workdir/

# copy the node dependency list and install
# copying to destinations without prefix / will copy into the work directory
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install
# manually setup web-store-modules since npx isn't working correctly in docker
RUN npm install --production --prefix node_modules/web-store-modules
RUN cd node_modules/web-store-modules && \
    node_modules/.bin/lerna bootstrap --hoist -- --production

# copy test to WORKDIR
COPY test/ test/

# copy bable configuration
COPY babel.config.js babel.config.js

# copy the webpack configuration
COPY webpack/* webpack/

# copy dotenv to WORKDIR
COPY dotenv dotenv

# copy over the application source
COPY src src

# Run linter
RUN npm run lint

# build the application and copy it into the webroot
RUN if [ ${BUILD_STAGE} = "prod" ] ; then npm run build-prod ; elif [ ${BUILD_STAGE} = "beta" ] ; then npm run build-beta ; else npm run build-feature ; fi
# copy built application into the webroot
RUN mkdir /www && \
    chmod -R 755 /www &&\
    cp -rpv build/* /www

# copy files and folders as needed from the intermediate image
# this will remove the SSH_PRIVATE_KEY_GITLAB and intermediate tools like ssh and git, and will reduce the final image size
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
# copy the nginx conf
COPY --from=0 /nginxdefault.conf /etc/nginx/conf.d/default.conf

# create the www folder and copy the www contents over from the intermediate image
RUN mkdir /www && \
    chmod -R 755 /www

COPY --from=0 /www /www
