#!/usr/bin/env bash

#generate the deployment
for filename in ./manifests/*-deployment.yaml; do
    kubectl apply -f "$filename"
done

sleep 5

#then the services
for filename in ./manifests/*-service.yaml; do
    kubectl apply -f "$filename"
done
