# Implementing Statefulsets, PVs, PVCs, & Blue/Green Strategy

## StatefulSets
StatefulSets manage stateful applications in Kubernetes, ensuring each pod has a stable, unique network ID and persistent storage. This is essential for applications needing consistent identifiers or data persistence, such as databases.

## Persistent Volumes (PVs)
Persistent Volumes (PVs) are storage resources in a Kubernetes cluster. They are provisioned by admins and exist independently of the pods, providing persistent storage that retains data even if the pod is deleted.

## Persistent Volume Claims (PVCs)
Persistent Volume Claims (PVCs) are user-generated requests for storage, specifying the required size and access modes. PVCs are matched with available PVs, allowing pods to use the specified persistent storage without needing to know the details of the storage infrastructure.

## Blue/Green Strategy
Blue/Green Strategy is a deployment approach with two identical environments (blue for the current version, green for the new version). The new version (green) is tested in parallel with the old version (blue). Once verified, traffic is switched to green, with the ability to revert to blue if any issues occur, ensuring minimal downtime and risk.


## Steps to implement the above discussed strategy & Statefulsets

### 1. Create/Modify your Deployment file to Statefulset.
We can either create a new or modify an existing one. But, as we are also implementing B&G strategy, it's better we create two different Statefulsets, each for one - Blue Statefulsets & Green Statefulsets.

  - [statefulset-blue.yaml](https://github.com/krunalijain/devops-playground/blob/main/statefulset-blue.yaml)
  - [statefulset-green.yaml](https://github.com/krunalijain/devops-playground/blob/main/statefulset-green.yaml)

### 2. Headless Service for StatefulSets
A headless service is necessary for the StatefulSets to maintain stable network identities. 

**headless-service.yaml:**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-headless
spec:
  ports:
  - port: 3000
    name: http
  clusterIP: None
  selector:
    app: node-app
```

### 3. LoadBalancer Service

You can use a single LoadBalancer service to switch traffic between the blue and green environments.

**loadbalancer-service.yaml:**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-lb
spec:
  type: LoadBalancer
  selector:
    app: node-app
    version: blue  # Initially point to blue
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

### 4. Apply the Configurations

First, apply the headless service and the StatefulSets.

```bash
kubectl apply -f headless-service.yaml
kubectl apply -f statefulset-blue.yaml
kubectl apply -f statefulset-green.yaml
kubectl apply -f loadbalancer-service.yaml
```

### 5. Verify the Deployments

Ensure that the StatefulSets and the service are running correctly.

```bash
kubectl get pods
kubectl get svc
```
### 6. Switch Traffic Between Blue and Green

To switch traffic from the blue deployment to the green deployment, update the selector in the LoadBalancer service.

```bash
kubectl patch service node-app-lb -p '{"spec": {"selector": {"app": "node-app", "version": "green"}}}'
```

## Summary

- You create two separate StatefulSet YAML files for the blue and green environments.
- A headless service is used to manage the stable network identities for the StatefulSets.
- A single LoadBalancer service is used to switch traffic between the blue and green StatefulSets by updating the selector.



 

