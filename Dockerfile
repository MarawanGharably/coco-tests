# intermediate image for building the web app
FROM node AS build-env

LABEL version="0.2.0"

# variable passed in with build command
ARG BUILD_STAGE=beta
RUN echo ${BUILD_STAGE}

RUN cd $(npm root -g)/npm && \
    npm install fs-extra && \
    sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

RUN apt-get update && \
    npm i npm@latest -g

# setup work directory, relative path will be inside this directory
# we need this because Jest can't find tests without this work directory
WORKDIR /coco-cms-workdir/

# copy the node dependency list and install
# copying to destinations without prefix / will copy into the work directory
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm install

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

# copy eslint configuration
COPY .eslintrc.json .eslintrc.json

# copy eslint ignore
COPY .eslintignore .eslintignore

# Run linter
RUN npm run lint

# build the application and copy it into the webroot
RUN if [ ${BUILD_STAGE} = "prod" ] ; then npm run build-prod ; elif [ ${BUILD_STAGE} = "beta" ] ; then npm run build-beta ; else npm run build-feature ; fi
# copy built application into the webroot
RUN mkdir /www && \
    cp -rpv build/* /www

# copy files and folders as needed from the intermediate image
# this will remove the SSH_PRIVATE_KEY_GITLAB and intermediate tools like ssh and git, and will reduce the final image size
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
# copy the nginx conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# create the www folder and copy the www contents over from the intermediate image
RUN mkdir /www && \
    chmod -R 755 /www

COPY --from=0 /www /www
