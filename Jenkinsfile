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
                // Using flags to ensure standard format for Docker Hub/AWS
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

        stage('Deployment') {
            steps {
                // Simplified: down removes old version, up starts the new one
                bat "docker-compose down && docker-compose up -d"
            }
        }
    } // End of Stages

    post {
        always {
            echo 'Cleaning up the workspace...'
            cleanWs() 
        }
        success {
            echo 'Pipeline finished successfully! Deployment is live.'
        }
    }
} // Final closing brace