pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                git branch: '5-build-release-run.0.0.1',
                    url: 'https://github.com/innovationinsoftware/12factor.git'
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
            }
        }
        stage('run') {
            steps {
                sh "docker stop mysecretagent || true && docker rm mysecretagent || true"
                sh "docker run --name mysecretagent -d -p 3050:3050 secretagent:v1"
            }
        }
        stage('exercise') {
            steps {
                sh "docker ps -a"
                sh "ping -c 1 localhost"
            }
        }
    }
}
