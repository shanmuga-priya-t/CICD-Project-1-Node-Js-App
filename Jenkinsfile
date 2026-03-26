pipeline {
    agent any
    stages{
        stage('Code'){
            steps{
                git url: 'https://github.com/shanmuga-priya-t/CICD-Project-1-Node-Js-App.git', branch: 'main' 
            }
        }
        stage('Build and Test') { 
    // This tells it to use the main Jenkins node
    agent any 
    steps {
        bat 'docker build . -t shanmuga-priya-t/my-node-app:latest'
    }
}
        stage('Push') { 
            agent { label 'agent1' 
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'MyDockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
        	     bat "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                 bat 'docker push shanmuga-priya-t/my-node-app:latest'
                }
            }
        }
        stage ('Deployment') {
        parallel  {stage('Deploy in agent1') { 
            agent { label 'agent1' 
            }
            steps{
                bat "docker-compose down && docker-compose up -d"
            }
        }
                  stage('Deploy in agent2'){ 
            agent { label 'agent2' 
            }
            steps{
                bat "docker-compose down && docker-compose up -d"
            }
        }
       }
      }
    }
}
