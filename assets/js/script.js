//Set variables 

var startQuizEl = document.getElementById("startQuiz");
var welcomeEl = document.getElementById("welcome");
var quizEl = document.getElementById("quiz");
var resultEl = document.getElementById("result");
var optionsEl = document.getElementById("options");
var messageEl = document.getElementById("message");
var timerEl = document.getElementById("timer");
var summaryEl = document.getElementById("summary");
var initialsEl = document.getElementById("initials");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var viewScoresEl = document.getElementById("viewScores");
var saveScoreEl = document.getElementById("saveScore");
var restartEl = document.getElementById("restart");
var clearButtonEl = document.getElementById("clearButton");

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

// Define quiz questions, choices, and answers
var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if/else statement is enclosed within ____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    title: "String values must be enclosed within ____ when being assigned to a variable",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

function displayMessage(msg) {
  messageEl.textContent = msg;
}

// Function to start game
function onStartGame() {
  startQuizEl.style.display = "none";
  welcomeEl.style.display = "none";
  quizEl.style.display = "block";
  resultEl.style.display = "none";


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

// Function to display questions

function displayQuestion() {
  var question = questions[currentQuestion];
  var options = question.options; 

  optionsEl.innerHTML = ""; // Clear previous options

  document.getElementById("question").textContent = question.title;

  options.forEach(function (option) {
    var button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", onSelectAnswer);
    optionsEl.appendChild(button);
  });
}

// Function to handles user's answer selection, update score, and progresses to the next question or end game

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
}
// // Save high scores in local storafe after initials are entered
function showHighScoresPage() {

  var initials = initialsEl.value.trim();

  if (initials !== ""){
    var newScore = {
      initials: initials,
      score: score,
    }; 

    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.href = "scores.html";
  }}
// Function to clear high scores from local storage
function clearScores() {
  window.localStorage.removeItem("highScores");
  window.location.reload();
}
// Add event listeners

// Event listener for when the user clicks "Start Quiz" button
startQuizEl.addEventListener("click", onStartGame);

// Clear high scores from local storage when button clicked

clearButtonEl.addEventListener("click", clearScores);

restartEl.addEventListener("click", function() {
  clearInterval(countdownTimer); // Clear any existing timer
  secondsLeft = 0; // Reset seconds left
  score = 0; // Reset score
  currentQuestion = 0; // Reset current question
  onStartGame(); // Start the game again
});

// Save score and redirect to local storage and redirect to high scores page

saveScoreEl.addEventListener("click", showHighScoresPage);

