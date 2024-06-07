## Deploying Dockerized App on Kubernetes with Load Balancer Access


## Install Kubernetes on Local (Linux OS)

```bash
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.29.3/2024-04-19/bin/linux/amd64/kubectl && \
chmod +x ./kubectl && \
mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$HOME/bin:$PATH && \
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc &&
```

To verify whether kubectl installed on local, run this command

```
kubectl version --client
```

## Install AWS CLI 

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## Configure AWS on local

To configure, run `aws configure` and it ask for Access key ID; Secrete access key ID; Default region & Output format.
Specify the details accordingly.

## Push docker image to ECR

1) Go to AWS console > ECR service > Create a repo.
2) Once repo created, you can see top right corner "View Push Commands". 
Follow the steps mentioned over there according to your repo created.

**For example:**
- Retrieve an authentication token and authenticate your Docker client to your registry. Use the AWS CLI:
    
    `aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/a1d6x4r5`
    
    Note: If you receive an error using the AWS CLI, make sure that you have the latest version of the AWS CLI and Docker installed.
    

- Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html) . You can skip this step if your image is already built:
    
    `docker build -t devops .`
    

- Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html) . You can skip this step if your image is already built:
    
    `docker tag devops:latest public.ecr.aws/a1d6x4r5/devops:latest`
    

- Run the following command to push this image to your newly created AWS repository:
    
    `docker push public.ecr.aws/a1d6x4r5/devops:latest`

After running all these commands you will be able to view the image in your ECR repo.

## Creating EKS Cluster & Node group

1) Go to AWS console > EKS > Create a cluster.
2) Attach appropriate **IAM Role** which is meant for EKS service. It should have **AmazonEKSClusterPolicy** policy permission.
3) Keep the rest settings as it is > Next > **Attach the default VPC & Subnets** .
4) Under **Control plane logging**, you can turn on those for logs > click Next > Next > Review > Create.

Once clicked on "Create" it will take few minutes to create a cluster, once cluster is in Active state, we need to create a **"Node gorup"**.

5) Click on created cluster, under **Compute** section you can see Node Groups > Create a Node group from there.

**Note: If the node group create fails, you can check the error under *Health Status*.**
For me,. the error was regarding `auto assign public IP` was not enabled for Public subnets. You can do this by going to VPC section > Subnets section > Edit the Public Subnets > Enable the `auto assign public IP`.
And recreate Node Group. 

## Configure `kubectl` to communicate with cluster.

```
aws eks update-kubeconfig --region `region-name` --name `your-cluster-name`
```

Once node group is created and kubectl is configured to communicate wiht cluster, we can create 3 pods. Creation of Node group will create 2 EC2 instances (if setitngs were set to default) and an ASG. To verify created node group run:

```
kubectl get nodes
```

![node group running](https://github.com/krunalijain/devops-playground/blob/main/Assests/running%20node%202%20instances.JPG)

## Creating 3 pods

To create 3 pods, you need to create a manifest file commonly named as [`deployment.yaml`](https://github.com/krunalijain/devops-playground/blob/main/deployment.yaml).

Once created, run this command in terminal:

```
kubectl apply -f deployment.yaml
```

To verify:

```
kubectl get pods
```

Once the status shows *runnning*. we are good to proceed for load balancer creation.

![3 pods running](https://github.com/krunalijain/devops-playground/blob/main/Assests/running%203%20pods.JPG)

## Creating Load Balancer

Create another manifest file, commonly named as [`service.yaml`](https://github.com/krunalijain/devops-playground/blob/main/service.yaml).

Run the command:

```
kubectl apply -f service.yaml

```

To verify run this below command. You should see your service listed with an external IP assigned.

```
kubectl get services
```

![service created](https://github.com/krunalijain/devops-playground/blob/main/Assests/created%20service%20yml%20file%20to%20access%20via%20LB.JPG)

Once completed, you can access it via external IP or DNS of Load Balancer.

```
http://<external-ip>
```

![accessing via LB](https://github.com/krunalijain/devops-playground/blob/main/Assests/accessing%20via%20LB.JPG)
