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

### 3. Apply the Configurations

First, apply the headless service and the StatefulSets.

```bash
kubectl apply -f headless-service.yaml
kubectl apply -f statefulset-blue.yaml
kubectl apply -f statefulset-green.yaml
```

### 4. Verify the Deployments

Ensure that the StatefulSets and the service are running correctly.

```bash
kubectl get pods
kubectl get svc
```

### 5. LoadBalancer Service Updation & how to Switch between Blue/Green

Here, we will create two different lb services for blue & green strategy routing.
We'll adjust the node-app-lb service to point to either the blue or green deployment depending on the desired version to be live.

- **Initial Blue Deployment Service**  > [node-app-lb-blue.yaml](https://github.com/krunalijain/devops-playground/blob/main/node-app-lb-blue.yaml)
- Apply the initial service configuration to direct traffic to the blue deployment: 

```
kubectl apply -f node-app-lb-blue.yaml
```
- **Switch to Green Deployment** > [node-app-lb-green.yaml
](https://github.com/krunalijain/devops-playground/blob/main/node-app-lb-green.yaml)
- Apply the service configuration to direct traffic to the green deployment:

 ```
kubectl apply -f node-app-lb-green.yaml
```

## References

- For additional and details understanding on Statefusets, PVs & PVCs, please refer the [official documentation of Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/).

- [Blue/Green Deployement Strategy](https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/bluegreen-deployments.html#:~:text=A%20blue%2Fgreen%20deployment%20is%20a%20deployment%20strategy%20in,environment%20%28green%29%20is%20running%20the%20new%20application%20version.) : AWS provides amazing documentation on Blue/Green strategy. 

To learn other deployment strategies you can watch [this video](https://youtu.be/AWVTKBUnoIg?si=GcsVDkPhIfU4WQJN). I personally referred it for better understanding on all types of Deployment Strategies.


 

