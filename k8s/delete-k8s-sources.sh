#!/usr/bin/env bash


kubectl delete service burgerqueen
kubectl delete service collector
kubectl delete service customer
kubectl delete service hobos
kubectl delete service iowafried
kubectl delete service redis


kubectl delete deployment burgerqueen-deployment
kubectl delete deployment collector-deployment
kubectl delete deployment customer-deployment
kubectl delete deployment hobos-deployment
kubectl delete deployment iowafried-deployment
kubectl delete deployment redis-deployment