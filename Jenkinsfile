#!groovy

// Jenkins config -----------------------------------------------------------------------------------------------------------------{
def testNode ="master"
//}

// Pipeline config-----------------------------------------------------------------------------------------------------------------{
def sshHeader = "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no centos@34.249.149.60"
def sshCredentials = "centos_34.249.149.60"
def scpHeader = "scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
//---------------------------------------------------------------------------------------------------------------------------------}

// GIT config ---------------------------------------------------------------------------------------------------------------------{
def gitRepo = "https://github.com/jmsampayo/gazelle-analyser-api.git"
def gitCredentials = "github-credentials"
//}

// Docker Registry config ---------------------------------------------------------------------------------------------------------{
def dockerRegistryCredentials = "github-docker-registry"
def dockerRegistryUrl = "docker.pkg.github.com"
//---------------------------------------------------------------------------------------------------------------------------------}

// Docker image config ------------------------------------------------------------------------------------------------------------{
def imagePath = "jmsampayo/the-gazelle-project"
def imageName = "gazelle-analyser-api"
def imageTag ="0.1.0"
//}

// Pipeline -----------------------------------------------------------------------------------------------------------------------{
node(testNode) {
    try{
        currentBuild.result = 'SUCCESS'

        stage("Cleaning workspace"){
           deleteDir()
        }

        stage("Pulling ${imageName} image code") {
            git credentialsId: "${gitCredentials}", url: "${gitRepo}"
        }

        stage("Building ${imageName} image") {
            sshagent([sshCredentials]) {
                sh "${sshHeader} rm -rf ${imageName}"
                sh "${sshHeader} mkdir ${imageName}"
                sh "${scpHeader} -rp . centos@34.249.149.60:/home/centos/${imageName}"
                sh "${sshHeader} docker build -t ${dockerRegistryUrl}/${imagePath}/${imageName}:${imageTag} ${imageName}/."
                sh "${sshHeader} docker tag ${dockerRegistryUrl}/${imagePath}/${imageName}:${imageTag} ${dockerRegistryUrl}/${imagePath}/${imageName}:latest"
            }
        }

        stage("Docker login") {
            withCredentials([usernamePassword(credentialsId: "${dockerRegistryCredentials}", usernameVariable: "username", passwordVariable: "password")]) {
                sshagent([sshCredentials]) {
                    sh "${sshHeader} docker login -u ${username} -p ${password} ${dockerRegistryUrl}"
                }
            }
        }

        stage("Pushing ${imageName} to GitHub Packages registry") {
            sshagent([sshCredentials]) {
                sh "${sshHeader} docker push ${dockerRegistryUrl}/${imagePath}/${imageName}:${imageTag}"
                sh "${sshHeader} docker push ${dockerRegistryUrl}/${imagePath}/${imageName}:latest"
            }
        }

        stage("Cleaning workspace"){
            deleteDir()
        }
    }
    catch(err){
        echo "Caught: ${err}"
        currentBuild.result = "FAILURE"
    }
}
//}
