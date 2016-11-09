node{
  stage('SCM'){
    git 'https://github.com/Kelsiii/ProjectRisk'
  }
  stage('QA'){
    sh 'sonar-scanner'
  }
  stage('build'){
    npm install
  }
  stage('deploy'){
    sh "docker stop ProjectRisk || true"
    sh "docker rm ProjectRisk || true"
    sh "docker run --name ProjectRisk -p 11111:8080 -d tomcat"
    sh "docker cp target/MavenDemo.war ProjectRist:/usr/local/tomcat/webapps"
  }
  stage('results'){
    archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
  }
}
