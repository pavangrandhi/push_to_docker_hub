#base image
FROM node:21-alpine 

#install dependecies
WORKDIR /usr/visitorapp

COPY ./package.json ./
RUN npm install
COPY ./ ./

#startup command
CMD ["npm","start"]