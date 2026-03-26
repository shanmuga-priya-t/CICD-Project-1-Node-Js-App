pipeline {
    agent any
    stages {
        stage('Code') {
            steps {
                // Pointing to your personal fork
                git url: 'https://github.com/shanmuga-priya-t/CICD-Project-1-Node-Js-App.git', branch: 'main' 
            }
        }
       stage('Build and Test') { 
    agent any 
    steps {
        // Adding --provenance=false and --push=false (default) 
        // forces a standard image format that Docker Hub likes
        bat 'docker build --provenance=false --sbom=false -t shanmugapriya3442/my-node-app:latest .'
    }
}
        stage('Push') { 
            agent any 
            steps {
                withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                    // Windows batch uses % instead of $ for variables
                    bat "docker login -u %dockerHubUser% -p %dockerHubPassword%"
                    bat 'docker push shanmugapriya3442/my-node-app:latest'
                }
            }
        }
        stage('Deployment') {
            parallel {
                stage('Deploy in Local Instance') { 
                    agent any 
                    steps {
                        bat "docker-compose down && docker-compose up -d"
                    }
                }
                // I removed the duplicate 'agent2' block since it's all on your laptop
            }
        }
    }
}