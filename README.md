# strawberry
## start up with docker
---
automatic deployment by docker-compose,run cmd below:
```
docker-compose up
```
Use URI https://localhost:4433 to access the container.

If using vscode to debug, first change the value og command to "npm run debug" in docker-compose.yml ,then start the vscode,chosing "attach docker" in launch.json

## or just run in localhost 
---

```
cd strawberry/
npm install
npm start // or npm run debug 

```
Use URI https://localhost:3000 to access the server

## some helpful docker cmd
---

```
docker image build -t strawberry .

docker images

docker save strawberry -o strawberry_dockerImage.tar

docker run  --rm -it -p 8000:3000/tcp strawberry node bin/www
```

## todo 
---


