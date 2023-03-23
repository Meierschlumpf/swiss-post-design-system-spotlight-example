#!groovy
@Library('pipeline-library@master') _

def PROJECT_NAME = 'spotlight-test'

pipeline {
    agent {
        label 'linux-slaves'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        ansiColor('xterm')
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    parameters {
        booleanParam(name: 'FORCE_RELEASE', defaultValue: 'false', description: 'false (default): release only when the branch is \'master\'; true: release event if the branch is not \'master\'')
        string(name: 'RELEASE_VERSION', defaultValue: '', description: 'used to set a custom docker image name')
    }

    tools {
        nodejs 'nodejs-16'
    }

    environment {
        NODE_OPTIONS = '--max-old-space-size=4096'
        RELEASE = "${env.BRANCH_NAME == 'master' || FORCE_RELEASE == 'true' ? 'true' : 'false'}"
    }

    stages {

        stage('Build') {
            steps {
                npmBuild()
            }
        }

        stage('Test') {
            steps {
                npmTest()
            }
        }

        stage('Sonar') {
            when { environment name: 'RELEASE', value: 'true' }
            environment {
                VERSION = getNpmVersion(directory: './')
            }
            steps {
                sonarScan(settings: [
                    projectKey    : PROJECT_NAME,
                    projectName   : PROJECT_NAME,
                    projectVersion: VERSION
                ])
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    GIT_HASH = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    IMAGE_TAG = params.RELEASE_VERSION ? params.RELEASE_VERSION : String.format('%s-%s', BRANCH_NAME, BUILD_NUMBER);
                    currentBuild.description = "<pre>IMAGE_TAG=$IMAGE_TAG</pre>"
                }
                dockerBuild(
                    projectName: PROJECT_NAME,
                    registry_path: 'app',
                    tag: IMAGE_TAG,
                    buildOptions: ['pull', 'no-cache', 'rm=true']
                )
                dockerPush(
                    projectName: PROJECT_NAME,
                    registry_path: 'app',
                    tag: IMAGE_TAG, credentialsId: '05e790a3-2dfd-4a30-b846-513dfcfa152f')
            }
        }

    }

    post {
        always {
            sendBuildMail(projectName: PROJECT_NAME, message: 'Hi, something noteworthy happened!!')
            cleanWs()
        }
    }
}
