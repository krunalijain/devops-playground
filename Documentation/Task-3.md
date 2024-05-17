## Deploying Dockerized App on Kubernetes with Load Balancer Access

## Install Kubernetes on Local (Linux OS)

```
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

```
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
