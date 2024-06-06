# Implementing Statefulsets, PVs, PVCs, & Blue/Green Strategy

## StatefulSets
StatefulSets manage stateful applications in Kubernetes, ensuring each pod has a stable, unique network ID and persistent storage. This is essential for applications needing consistent identifiers or data persistence, such as databases.

## Persistent Volumes (PVs)
Persistent Volumes (PVs) are storage resources in a Kubernetes cluster. They are provisioned by admins and exist independently of the pods, providing persistent storage that retains data even if the pod is deleted.

## Persistent Volume Claims (PVCs)
Persistent Volume Claims (PVCs) are user-generated requests for storage, specifying the required size and access modes. PVCs are matched with available PVs, allowing pods to use the specified persistent storage without needing to know the details of the storage infrastructure.

## Blue/Green Strategy
Blue/Green Strategy is a deployment approach with two identical environments (blue for the current version, green for the new version). The new version (green) is tested in parallel with the old version (blue). Once verified, traffic is switched to green, with the ability to revert to blue if any issues occur, ensuring minimal downtime and risk.


# Steps to implement the above discussed strategy & Statefulsets

## 1. Create/Modify your Deployment file to Statefulset.
We can either create a new or modify an existing one. But, as we are also implementing B&G strategy, it's better we create two different Statefulsets, each for one - Blue Statefulsets & Green Statefulsets.

  - [statefulset-blue.yaml](https://github.com/krunalijain/devops-playground/blob/main/statefulset-blue.yaml)
  - [statefulset-green.yaml](https://github.com/krunalijain/devops-playground/blob/main/statefulset-green.yaml)



