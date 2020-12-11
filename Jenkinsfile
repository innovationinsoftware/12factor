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
        stage('build 2: container image') {
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
        stage('get local config') {
            steps {
                script {
                    def MYIP = sh "ifconfig eth0 | awk '/inet addr/{print substr(\$2,6)}'"
                    echo MYIP
                }
            }
        }
        stage('exercise') {
            steps {
                sh "ping -c 1 localhost"
                sh "ifconfig"
                sh "curl http://localhost:3050"
            }
        }
    }
}
