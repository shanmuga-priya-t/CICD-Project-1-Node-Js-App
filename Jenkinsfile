pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'shanmugapriya3442/my-node-app:latest'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                // Build the docker image locally on your Jenkins server
                bat "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    bat "docker login -u %dockerHubUser% -p %dockerHubPassword%"
                    bat "docker push ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    // Mapping 80 (AWS) to 8000 (App)
                    bat "ssh -o StrictHostKeyChecking=no -i \"C:\\Users\\ELCOT\\Downloads\\my-key.pem.pem\" ubuntu@13.206.68.57 \"docker login -u %dockerHubUser% -p %dockerHubPassword% && docker pull ${DOCKER_IMAGE} && docker stop my-node-container || true && docker rm my-node-container || true && docker run -d --name my-node-container -p 80:8000 ${DOCKER_IMAGE}\""
                }
            }
        }
    }

    post {
        always {
            echo 'Deployment process finished.'
        }
    }
}