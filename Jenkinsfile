node{
  stage('SCM'){
    git 'https://github.com/Kelsiii/ProjectRisk'
  }
  stage('QA'){
    sh "sonar-scanner"
  }
  stage('build'){
    
  }
  stage('deploy'){
    sh "docker stop ProjectRisk || true"
    sh "docker rm ProjectRisk || true"
    sh "docker run -itd -p 11111:8080 --name ProjectRisk -v /root/Project_risk_new/:/web -w /web node npm start"
  }
}
