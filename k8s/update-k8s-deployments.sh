#!/usr/bin/env bash



#generate the targets, pods first
for filename in ./manifests/*-deployment.yaml; do
    kubectl apply -f "$filename"
done

sleep 5

#then targets services
for filename in ./manifests/*-service.yaml; do
    kubectl apply -f "$filename"
done
