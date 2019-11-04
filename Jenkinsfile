pipeline {
    agent { docker { image 'keymetrics/pm2: 10-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
