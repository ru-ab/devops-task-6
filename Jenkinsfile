pipeline {
    agent any

    stages {
        stage('1-Tests') {
            steps {
                nodejs('Node_22') {
                  echo 'Install dependencies...'
                  sh 'npm ci'
                  echo 'Run tests...'
                  sh 'npm run test'
                  echo 'Done.'
                }
            }
        }
        stage('2-SonarQube') {
            environment {
              SONAR_SCANNER_OPTS = "-Xmx4G -Xms2G"
            } 
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=devops-task-6 -Dsonar.sources=./src -Dsonar.javascript.node.maxspace=4096 -Dsonar.sourceEncoding=UTF-8 -X"
                    }
                }
            }
        }
    }
}
