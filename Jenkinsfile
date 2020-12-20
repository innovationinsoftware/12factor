pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                git branch: '10-dev-prod-parity.0.0.1',
                    url: 'https://github.com/innovationinsoftware/12factor.git'
                sh "cd app"
                sh "npm install"
            }
        }
        stage('test') {
            steps {
                sh "npm test"
            }
        }
        stage('release') {
            steps {
                sh "docker build -t secretagent:v1 ."
                sh "docker tag secretagent:v1 localhost:5000/secretagent:v1"
                sh "docker push localhost:5000/secretagent:v1"
                echo 'Secret Society V1 is in the localhost registry. You are now ready to run'
            }
        stage('run') {
            steps {
                sh "cd .."
                sh "docker-compose up"
                sh "wget -O- http://localhost:4000"
            }
        }
    }
}
