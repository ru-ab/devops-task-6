# Task 6: Application Deployment via Jenkins Pipeline

This repository contains a simple NodeJS project. A `Dockerfile` is used to build the container, and a Helm Chart for deploying this application is located in the `devops-task-6` folder. The `Jenkinsfile` automates running tests, SonarQube analysis, building, and deploying the application.

## Application Description

This is a simple API application with the following routes:

- `GET` /counter - retrieve the current counter value
- `POST` /counter/increment - increment the counter value by 1 and return the new value
- `POST` /counter/decrement - decrement the counter value by 1 and return the new value

## Pipeline Steps in the Jenkinsfile

### 1-Tests

In this step, all application dependencies are installed, and tests are executed.

1. For this step to work, the `NodeJS Plugin` must be installed in Jenkins. Then, add a new **NodeJS Installation** in the Tools configuration with the name **Node_22**.

### 2-SonarQube

In this step, code quality is analyzed using a SonarQube server deployed on a separate virtual machine.

1. For this step to work, the `SonarQube Scanner for Jenkins` plugin must be installed. Then, add a new **SonarQube Scanner installation** in the Tools configuration with the name **SonarQube Scanner**.

2. On the SonarQube server, create a new project and generate a token for Jenkins access.

3. Add the SonarQube token to **Credentials** in Jenkins. In the **System Configuration**, add the SonarQube server by specifying its URL and token.

### 3-Build-Container

In this step, the Docker container is built using `Kaniko` and pushed to the Amazon ECR repository.

1. To allow Kaniko to push the built container to Amazon ECR, add a secret with AWS credentials to the Kubernetes cluster.

Create a `credentials` file:

```ini
[default]
aws_access_key_id = AKXXXXXXXXXMQ
aws_secret_access_key = HdXXXXXXXXXXXXXXXXX458
```

Create the secret:

```bash
kubectl create secret generic aws-secret --from-file=credentials -n jenkins
```

Create the `config.json` file:

```json
{
  "auths": {
    "<ECR_repository>": {},
    "https://index.docker.io/v1/": {}
  },
  "credsStore": "ecr-login"
}
```

Create the ConfigMap:

```bash
kubectl create configmap docker-config --from-file=config.json -n jenkins
```

### 4-Deploy

In this step, the application is deployed to a Kubernetes cluster using Helm.

1. For this step, create an `aws-ecr-secret` in Kubernetes:

```bash
aws ecr get-login-password --region us-east-2 | kubectl create secret docker-registry aws-ecr-secret -n jenkins   --docker-server=<ECR_repository> --docker-username=AWS   --docker-password=$(aws ecr get-login-password --region us-east-2)
```

### Post - Email Notification

After completing all the steps, an email notification will be sent with the build status.
