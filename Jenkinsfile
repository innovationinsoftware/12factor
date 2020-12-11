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
                sh "docker tag secretagent:v1 localhost:5000/secretagent:v1"
                sh "docker push localhost:5000/secretagent:v1"
                echo 'Secret Society is in the localhost registry. You are now ready to run'
            }
        }
    }
}
