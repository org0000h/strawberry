FROM node:10.15.3
COPY . /strawberry
WORKDIR /strawberry
RUN npm install 
# RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
# CMD [ "npm", "start" ]