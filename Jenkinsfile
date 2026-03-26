pipeline {
    agent any 

    environment {
        // This makes it easy to update your IP in one place
        EC2_IP = '13.206.68.57'
        DOCKER_IMAGE = 'shanmugapriya3442/my-node-app:latest'
    }

    stages {
        stage('Code') {
            steps {
                // Pulls your latest code from GitHub
                git url: 'https://github.com/shanmuga-priya-t/CICD-Project-1-Node-Js-App.git', branch: 'main' 
            }
        }

        stage('Build and Test') { 
            steps {
                // Builds the image with standard formatting for Docker Hub/AWS compatibility
                bat "docker build --provenance=false --sbom=false -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Push to Docker Hub') { 
            steps {
                // Logs into Docker Hub using your Jenkins credentials
                withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    bat "docker login -u %dockerHubUser% -p %dockerHubPassword%"
                    bat "docker push ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy to AWS EC2') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
            // We use the -i flag to point directly to your .pem key
            // Note: Use double backslashes \\ for Windows paths
            bat """
                ssh -o StrictHostKeyChecking=no -i "C:\\Users\\ELCOT\\Downloads\\my-key.pem.pem" ubuntu@13.206.68.57 "
                    docker login -u %dockerHubUser% -p %dockerHubPassword% &&
                    docker pull shanmugapriya3442/my-node-app:latest &&
                    docker stop my-node-container || true &&
                    docker rm my-node-container || true &&
                    docker run -d --name my-node-container -p 80:3000 shanmugapriya3442/my-node-app:latest
                "
            """
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
            echo "Successfully deployed! Visit http://${EC2_IP} to see your app."
        }
        failure {
            echo "Build failed. Check the Jenkins console output for errors."
        }
    }
}