# callcenter
Simple implementation of an open contest due to occupy a job title in Sweden.

## Run server
```javascript
npm start
```

## Port & Host
The default port in development environment has been set to __8000__ along with the localhost as host with ip address __127.0.0.1__. To manipulate ports and hosts you should have checked out the config subdirectory.

## Dockerfile
It prepares an image to be run on docker container. To create/build this contributer image run the following command

```bash
docker build -t <YOU_REPOSITORY>/callcenter-lts-alpine:1.0.0 .
```
The above command ends with <code>.</code> indecating the presence of <code>Dockerfile</code> in the current working directory unless you have to specify Dockerfile in the fully qualified named fashion. Also, it's optional to create this image because it's already pushed in dockerhub and following cammand can easily pull it in your container.

```bash
docker pull kaloneh/callcenter-lts-apline:1.0.0
```
To contain the image on __Docker__ container you can run these commands
```bash
docker run -it -d --name callcenter -p 8000:8000 -e NODE_ENV=dev kaloneh/callcenter-lts-alpine:1.0.0
docker run -it callcenter sh
```
The first command serves the __express__ and __socket-io__ on __port 8000__; the second command allows you to access container terminal and take you jouney.
