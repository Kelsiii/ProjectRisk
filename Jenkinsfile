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
    sh "docker stop 3121 || true"
    sh "docker start 3121"
  }
}
