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
              SONAR_SCANNER_OPTS = "-Xmx2G -Xms1G"
            } 
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=devops-task-6 -Dsonar.sources=. "
                    }
                }
            }
        }
    }
}