pipeline {
    agent any 
    stages {
        stage('Code') {
            steps {
                git url: 'https://github.com/shanmuga-priya-t/CICD-Project-1-Node-Js-App.git', branch: 'main' 
            }
        }

        stage('Build and Test') { 
            steps {
                bat 'docker build --provenance=false --sbom=false -t shanmugapriya3442/my-node-app:latest .'
            }
        }

        stage('Push to Docker Hub') { 
            steps {
                withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    bat "docker login -u %dockerHubUser% -p %dockerHubPassword%"
                    bat 'docker push shanmugapriya3442/my-node-app:latest'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Ensure you have added your .pem key to Jenkins Credentials with ID 'ec2-ssh-key'
                sshagent(['ec2-ssh-key']) {
                    withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                        // Replace <EC2_PUBLIC_IP> with your actual AWS Instance IP
                        bat """
                            ssh -o StrictHostKeyChecking=no ubuntu@<EC2_PUBLIC_IP> "
                                sudo docker login -u %dockerHubUser% -p %dockerHubPassword% &&
                                sudo docker pull shanmugapriya3442/my-node-app:latest &&
                                sudo docker stop my-node-container || true &&
                                sudo docker rm my-node-container || true &&
                                sudo docker run -d --name my-node-container -p 80:3000 shanmugapriya3442/my-node-app:latest
                            "
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up the workspace...'
            cleanWs() 
        }
        success {
            echo 'Pipeline finished successfully! Your app is live on AWS EC2.'
        }
    }
}