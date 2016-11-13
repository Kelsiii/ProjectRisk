node{
  stage('SCM'){
    git 'https://github.com/Kelsiii/ProjectRisk'
  }
  stage('QA'){
    
  }
  stage('build'){
    
  }
  stage('deploy'){
    sh "docker stop f40e || true"
    sh "docker start f40e"
  }
}
