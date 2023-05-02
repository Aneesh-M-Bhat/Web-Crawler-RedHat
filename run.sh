#!/bin/bash
docker login
minikube start --driver=docker
kubectl apply -f server-deployment.yaml
kubectl apply -f client-deployment.yaml
minikube service server-service
minikube service client-service
