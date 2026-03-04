pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances...'
                dir('task-service') {
                    sh 'npm install'
                }
                dir('user-service') {
                    sh 'npm install'
                }
                dir('api-gateway') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Construction des images Docker...'
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Déploiement...'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Pipeline terminé avec succès'
        }
        failure {
            echo 'Pipeline échoué'
        }
    }
}
