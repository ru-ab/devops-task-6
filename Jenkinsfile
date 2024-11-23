pipeline {
    agent any

    stages {
        stage('1-Tests') {
            steps {
                echo 'Install dependencies...'
                npm ci
                echo 'Run tests...'
                npm run test
                echo 'Done.'
            }
        }
    }
}
