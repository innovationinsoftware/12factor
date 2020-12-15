#!/usr/bin/env bash



#update-the-deployments
for filename in ./manifests/*deployment-update.yaml; do
    kubectl apply -f "$filename"
done