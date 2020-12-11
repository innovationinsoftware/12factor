pipeline {
    agent any

    stages {
        stage('build 1: source code') {
            steps {
                git branch: '5-build-release-run.0.0.1',
                    url: 'https://github.com/innovationinsoftware/12factor.git'
                sh "npm install"
                sh "apt update"
                sh "apt install net-tools -y"
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
            }
        }
        stage('run') {
            steps {
                sh "docker stop mysecretagent || true && docker rm -f mysecretagent || true"
                sh "docker run --name mysecretagent -d -p 3060:3050 localhost:5000/secretagent:v1"
                sh "curl http://localhost:3060"
            }
        }
    }
}
