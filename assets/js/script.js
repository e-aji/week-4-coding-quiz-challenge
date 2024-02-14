var startQuizEl = document.getElementById("startQuiz");

var welcomeEl = document.getElementById("welcome");
var quizEl = document.getElementById("quiz");
var resultEl = document.getElementById("result");
var optionsEl = document.getElementById("options");
var messageEl = document.getElementById("message");
var timerEl = document.getElementById("timer");
var summaryEl = document.getElementById("summary");
var initialsEl = document.getElementById("initials");
var highScoresEl = document.getElementById("highScores");
var viewHighScoresEl = document.getElementById("viewHighScores");
var listHighScoreEl = document.getElementById("listHighScore");
var viewScoresEl = document.getElementById("viewScores");


var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

//Define quiz questions, choices and answers 
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if/else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    title: "String values must be enclosed within ____ when being assigned to a variable",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];


function init() {
  highScoresEl = JSON.parse(localStorage.getItem("highScores")) || [];
}

init()

function displayMessage(msg) {
  messageEl.textContent = msg;
}

// Event listener for when the user clicks "Start Quiz" button
startQuizEl.addEventListener("click", onStartGame);

// Function to start game
function onStartGame() {
  startQuizEl.style.display = "none";
  welcomeEl.style.display = "none";
  quizEl.style.display = "block";

  displayQuestion();
  setTimer();
}

// Function to set timer
function setTimer() {
  secondsLeft = 60;

  countdownTimer = setInterval(function () {
    secondsLeft--;
    // Countdown and display how many seconds left
    if (secondsLeft > 1) {
      timerEl.textContent = secondsLeft + " seconds remaining";
    } else if (secondsLeft === 1) {
      timerEl.textContent = secondsLeft + " second remaining";
    } else {
      // Stop the counter and end the game when time runs out
      stopGame();
    }
  }, 1000);
}

//Function to display questions
function displayQuestion() {
  var question = questions[currentQuestion];
  var options = question.choices;

  optionsEl.innerHTML = ""; // Clear previous options

  document.getElementById("question").textContent = question.title;

  options.forEach(function (option) {
    var button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", onSelectAnswer);
    optionsEl.appendChild(button);
  });
}

function onSelectAnswer(e) {
  var correctAnswer = questions[currentQuestion].answer;
  var userAnswer = e.target.textContent;

  if (correctAnswer === userAnswer) {
    score++;
    displayMessage("Correct!");
  } else {
    displayMessage("Wrong!");
    secondsLeft -= 10;
    if (secondsLeft < 0) {
      secondsLeft = 0;
    }
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    stopGame();
  }
}

// Function to stop game
function stopGame() {
  clearInterval(countdownTimer);

  timerEl.textContent = "";
  quizEl.style.display = "none";
  resultEl.style.display = "inline";
  summaryEl.textContent = "Your Score is: " + score;

  var saveScoreBtn = document.getElementById("saveScore");
  var restartBtn = document.getElementById("restart");
  var clearBtn = document.getElementById("clear");

  saveScoreBtn.addEventListener('click', function () {
    var initials = initialsEl.value.trim();

    if (initials !== '') {
      // Save the score
      var newScore = { initials: initials, score: score };
      highScoresEl.push(newScore);
      localStorage.setItem("highScores", JSON.stringify(highScoresEl));

      displayMessage("Your score has been submitted and saved!");
      initialsEl.value = '';
    } else {
      displayMessage("Please enter your initials so your score can be submitted and saved!");
    }
  });
  
}

clearButton.onclick = clearScores;

restartButton.onclick = restart;

//Show the page that contains high scores 
function showScores() {

    initialsEl.setAttribute("style", "display: none");
    saveScoreButton.setAttribute("style", "display: none");
    restartButton.setAttribute("style", "display: none");
    clearButton.setAttribute("style", "display: initial");

    //High scores that have been saved in local storage 
    highScoresEl = JSON.parse(localStorage.getItem("highScores"));

    localStorage.setItem("highScores", JSON.stringify(highScoresEl))  ;
}

//Clears high scores from local storage 
function clearScores(){

  localStorage.removeItem("highScores");
}

document.getElementById("clear").onclick = clearScores;

showScores();

//Restarts the game 
function restart() {
  clearInterval(countdownTimer);
  score = 0;
  currentQuestion = 0;
  initialsEl = "";

  onStartGame();

  location.reload()
}

function showHighScoresPage (){
  window.location.href = "scores.html";

}

viewScoresEl.addEventListener("click", showHighScoresPage);