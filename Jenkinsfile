pipeline {
    agent any

    stages {
        stage('1-Tests') {
            steps {
                echo 'Install dependencies...'
                sh 'npm ci'
                echo 'Run tests...'
                sh 'npm run test'
                echo 'Done.'
            }
        }
    }
}
