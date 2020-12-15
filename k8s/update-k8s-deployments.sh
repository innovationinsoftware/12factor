#!/usr/bin/env bash

# update-the-deployments
for filename in ./manifests/*-update.yaml; do
    kubectl apply -f "$filename"
done
