function loadHighScores () {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || []
    var highScoresList = document.getElementById('highScoresList')
  
    for (var i = 0; i < highScores.length; i++) {
      var newLi = document.createElement('li')
      newLi.textContent = highScores[i].initials + ' - ' + highScores[i].score
      highScoresList.appendChild(newLi)
    }
  }
  
  listHighScore();