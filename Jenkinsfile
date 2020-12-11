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
                echo 'this is run'
            }
        }
    }
}
