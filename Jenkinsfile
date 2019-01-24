def project = 'the-space-app'
def appName = 'treehouse-fsjs-project-12'
def imageTag = "gcr.io/${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

pipeline {
  agent {
    kubernetes {
      label 'Treehouse-FSJS-Project-12'
      defaultContainer 'jnlp'
        yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: jenkins
  containers:
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
    }
  }
  stages {
    stage('Build and push image with Container Builder') {
      steps {
        withCredentials([file(credentialsId: 'google-secret-file', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
          container('gcloud') {
            sh "PYTHONUNBUFFERED=1 gcloud auth activate-service-account --key-file $GOOGLE_APPLICATION_CREDENTIALS"
            sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${imageTag} ."
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        kubernetesDeploy(
            kubeconfigId: 'kubeconfig',
            configs: 'treehouse-fsjs-project-12-kube.yaml',
            enableConfigSubstitution: true
        )
      }
    }
  }
}
