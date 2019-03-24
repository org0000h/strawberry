# strawberry
start up

```
cd newWebApp/
npm start

```
or
```
cd newWebApp/
node bin/www 

```
Use URI https://localhost:3000 to access the server

This server also supports websocket by socket.io 

# for docker 
```
docker image build -t strawberry .

docker images

docker save strawberry -o strawberry_dockerImage.tar

docker run  --rm -it -p 8000:3000/tcp strawberry node bin/www
```