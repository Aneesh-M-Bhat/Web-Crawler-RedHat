# Web-Crawler-RedHat

# Assignment 1:
go to client & server folder & run npm i for installing all dependencies
after installing run npm start for running the client & server

# Assignment 2:
Commands to be used in-order:
docker login
minikube start --driver=docker
kubectl apply -f server-deployment.yaml
kubectl apply -f client-deployment.yaml
minikube service server-service
minikube service client-service
