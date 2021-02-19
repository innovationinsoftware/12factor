node {
    env.NODEJS_HOME = "${tool 'basic_node'}"
    // on linux / mac
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    sh 'npm --version'
}


pipeline {
    agent any

    stages {
        stage('build service') {
            steps {
                git branch: '10-dev-prod-parity.0.0.2',
                    url: 'https://github.com/innovationinsoftware/12factor.git'
                sh "ls $workspace"
                dir("$workspace/app") {
                    sh "pwd"
                    sh "ls -ls"
                    sh "npm install"
                }
            }
        }
        stage('test service') {
            steps {
                dir("$workspace/app") {
                    sh "npm test"
                }
            }
        }
        stage('release service to container repo') {
            steps {
                dir("$workspace/app") {
                    sh "docker build -t secretagent:v2 ."
                    sh "docker tag secretagent:v2 localhost:5000/secretagent:v2"
                    sh "docker push localhost:5000/secretagent:v2"
                    echo 'Secret Society V2 is in the localhost registry. You are now ready to run'
                }
            }
        }
        stage('provision deployment target') {
            steps {
                sh "curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose"
                sh "chmod +x /usr/local/bin/docker-compose"
                sh "docker-compose --version"
            }
        }
        stage('run service on deployment target') {
            steps {
                sh "which docker-compose"
                dir("$workspace/app") {
                    sh "docker-compose up -d"
                    sh "wget -O- http://localhost:4001"
                }
            }
        }
    }
}
