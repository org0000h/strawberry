# strawberry
## start up with docker
automatic deployment by docker-compose,run cmd below:
```
docker-compose up
```
Use URI https://localhost:4433 to access the container,

## or just run in localhost 
```
cd strawberry/
npm install
npm start

```
Use URI https://localhost:3000 to access the server

This server also supports websocket by socket.io 

## some helpful docker cmd

```
docker image build -t strawberry .

docker images

docker save strawberry -o strawberry_dockerImage.tar

docker run  --rm -it -p 8000:3000/tcp strawberry node bin/www
```

## todo 
- user login/logout
- auth(jwt)

