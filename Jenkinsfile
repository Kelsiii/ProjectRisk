node{
  stage('SCM'){
    git 'https://github.com/Kelsiii/ProjectRisk'
  }
  stage('QA'){
    sh 'sonar-scanner'
  }
  stage('build'){
    
  }
  stage('deploy'){
    sh "docker stop bea0 || true"
    sh "docker start bea0"
  }
}
