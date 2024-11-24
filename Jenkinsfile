pipeline {
    agent {
        kubernetes {
          yaml """
            kind: Pod
            metadata:
              name: kaniko
            spec:
              containers:
              - name: jnlp
                workingDir: /home/jenkins
              - name: kaniko
                workingDir: /home/jenkins
                image: gcr.io/kaniko-project/executor:debug
                command:
                - /busybox/cat
                tty: true
                volumeMounts:
                - name: docker-config
                  mountPath: /kaniko/.docker/
                - name: aws-secret
                  mountPath: /root/.aws/
                env:
                - name: AWS_EC2_METADATA_DISABLED
                  value: true
                - name: AWS_SDK_LOAD_CONFIG
                  value: true
              restartPolicy: Never
              volumes:
              - name: docker-config
                configMap:
                  name: docker-config 
              - name: aws-secret
                secret:
                  secretName: aws-secret
          """
        }
    }

    stages {
        // stage('1-Tests') {
        //     steps {
        //         nodejs('Node_22') {
        //           echo 'Install dependencies...'
        //           sh 'npm ci'
        //           echo 'Run tests...'
        //           sh 'npm run test'
        //           echo 'Done.'
        //         }
        //     }
        // }
        // stage('2-SonarQube') {
        //     environment {
        //       SONAR_SCANNER_OPTS = "-Xmx2G -Xms1G"
        //     } 
        //     steps {
        //         script {
        //             def scannerHome = tool 'SonarQube Scanner'
        //             withSonarQubeEnv('SonarQube') {
        //                 sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=devops-task-6 -Dsonar.sources=./src -Dsonar.javascript.node.maxspace=4096 -Dsonar.sourceEncoding=UTF-8 -X"
        //             }
        //         }
        //     }
        // }
        stage('3-Build-Container') {
            environment {
                PATH = "/busybox:/kaniko:$PATH"
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                  sh '''#!/busybox/sh
                      dockerConfig=\${DOCKER_CONFIG:-/kaniko/.docker}
                      [ -d \${dockerConfig} ] && echo "Docker directory Exists" || mkdir -p \${dockerConfig}
                      echo '{"credsStore":"ecr-login"}' > \${dockerConfig}/config.json
                  '''
                  sh '''#!/busybox/sh
                    /kaniko/executor --context `pwd` --dockerfile Dockerfile --verbosity debug --destination 156041410244.dkr.ecr.us-east-2.amazonaws.com/aws-devops-2024/task-6
                  '''
                }
            }
        }
    }
}
