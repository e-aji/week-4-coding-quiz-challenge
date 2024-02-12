var startQuizEl = document.getElementById("startQuiz")

var welcomeEl = document.getElementById("welcome")
var quizEl = document.getElementById("quiz")
var resultEl = document.getElementById ("result")
var optionsEl = document.getElementById("options")
var messageEl = document.getElementById("message")
var timerEl = document.getElementById("timer")
var summaryEl = document.getElementById("summary")

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;

var countdownTimer;

// Function to stop game
function stopGame() {

    clearInterval (countdownTimer);

    timerEl.textContent = ""

    quizEl.style.display = 'none';
    resultEl.style.display - 'flex'

    summaryEl.textContent = "Your Score is: " + score;
}


function onSelectAnswer(e) {

    var correctanswer = questions[currentQuestion].answer;
    
    var userAnswer = e.target.textContent;

    if (correctanswer === userAnswer) {

        score ++;
        displayMessage('Correct!')
    }

    else{
        displayMessage('Wrong!')
        secondsLeft -= 10;

    }
} 

function displayMessage (msg){

    messageEl.textContent = msg;



}

//Function to display questions 

function displayQuestion () {

    currentQuestion++;

    console.log ('current question is ') + score;

    if (currentQuestion >= questions.length) {

        stopGame();

        return;
    }
}

// Function to start game 
function onStartGame()
{
    secondsLeft = 75;

    score = 0;

    countdownTimer = setInterval(function () {

        // Countdown and display how many seconds left 
        if (secondsLeft > 0) {
            timerEl.textContent = secondsLeft = " seconds remaining";

        }else {

            // Stop the counter and end the game
            stopGame();
        }
   }, 1000);

}

// Quiz will be started when the user clicks 
startQuizEl.addEventListener ("click", onStartGame);
