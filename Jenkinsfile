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
    }
}
