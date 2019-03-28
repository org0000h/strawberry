# strawberry
A fast webApp framwork by vue.js, Express and socket.io on a nodejs server supporting https and websocket.

Start up with docker,automatic deployment by docker-compose.

Run cmd below to start the server:
```
git clone https://github.com/org0000h/strawberry.git
cd strawberry
docker-compose up
```
Use URI https://localhost:4443 to access the server in docker container

# debug in VSCode

clone this repository and run these cmd:
```
git clone https://github.com/org0000h/strawberry.git
cd strawberry
docker-compose -f "docker-compose-debug-brk.yml" up
```
Then open folder "strawberry" in vscode.

Chose debug configurations as "Attach docker".
Press F5,then happy debuging in vscode attach to the docker container. 

server starting log:
```
PS R:\DATA\project\strawberry> docker-compose up
Building strawberry
Step 1/6 : FROM node:10.15.3
 ---> 8c10e6cc3f51
Step 2/6 : COPY . /strawberry
 ---> ba987df1cd08
Step 3/6 : WORKDIR /strawberry
 ---> Running in 7e1c8974565b
Removing intermediate container 7e1c8974565b
 ---> 421397de0c76
Step 4/6 : RUN npm install
 ---> Running in 017b4c4ab22a
added 149 packages from 165 contributors and audited 283 packages in 5.254s
found 0 vulnerabilities

Removing intermediate container 017b4c4ab22a
 ---> 567b047b495e
Step 5/6 : EXPOSE 3000
 ---> Running in cc200aa38867
Removing intermediate container cc200aa38867
 ---> 5c8647912ea9
Step 6/6 : CMD [ "npm", "start" ]
 ---> Running in 3226250252ef
Removing intermediate container 3226250252ef
 ---> 4e10f246e52c
Successfully built 4e10f246e52c
Successfully tagged strawberry_strawberry:latest
WARNING: Image for service strawberry was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating strawberry_strawberry_1 ... done
Attaching to strawberry_strawberry_1
strawberry_1  |
strawberry_1  | > strawberry@0.0.1 start /strawberry
strawberry_1  | > node ./bin/www
strawberry_1  |
strawberry_1  | listening on port:3000
```

# Run without docker
just run in local host computer using:
```
git clone https://github.com/org0000h/strawberry.git
cd strawberry/
npm start

```
or
```
git clone https://github.com/org0000h/strawberry.git
cd strawberry/
node bin/www 

```
Use URI https://localhost:3000 to access the server

# some helpful docker cmd

```
docker image build -t strawberry .

docker images

docker save strawberry -o strawberry_dockerImage.tar

docker run  --rm -it -p 8000:3000/tcp strawberry node bin/www
```

