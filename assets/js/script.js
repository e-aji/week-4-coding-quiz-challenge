var startQuizEl = document.getElementById("startQuiz")

var welcomeEl = document.getElementById("welcome")
var quizEl = document.getElementById("quiz")
var resultEl = document.getElementById ("result")
var optionsEl = document.getElementById("options")
var messageEl = document.getElementById("message")
var timerEl = document.getElementById("timer")
var summaryEl = document.getElementById("summary")
var initialsEl = document.getElementById("initials");

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

var questions = [

    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
    },

    {
        title: 'The condition in an if/else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'alerts',

    }, 

   {    title: 'Arrays in JavaScript an be used to store ____', 
        choices: [
            'numbers and strings',
            'other arrays', 
            'booleans',
            'all of the above',
        ], 
        answer: 'all of the above', 
    }, 

    {   title: 'String values must be enclosed within ____ when being assigned to variable',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
    }, 

    {
        title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
];

function displayMessage (msg){
    messageEl.textContent = msg;
}
// Event listener for when the user clicks "Start Quiz" button
startQuizEl.addEventListener ("click", onStartGame);

// Function to start game 
function onStartGame(){

    startQuizEl.style.display = "none";
    welcomeEl.style.display = "none";
    quizEl.style.display = "block";

    displayQuestion ();
    setTimer ();
}
// Function to set timer
function setTimer(){
    secondsLeft = 60;

    countdownTimer = setInterval(function () {
        secondsLeft--;
        // Countdown and display how many seconds left 
        if (secondsLeft > 0) {
            timerEl.textContent = secondsLeft = " seconds remaining";
        }else if (secondsLeft === 1) {
            timerEl.textContent = secondsLeft + " second remaining";
        }else {
            // Stop the counter and end the game when time runs out
            stopGame();
        }
   }, 1000);

}
//Function to display questions 

function displayQuestion () {

    var questions = questions[currentQuestion];
    var options = question.choices;

    console.log ('current question is ') + score;

    if (currentQuestion >= questions.length) {

        stopGame();

        return;
    }
}

function onSelectAnswer(e) {

    var correctanswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;

    if (correctanswer === userAnswer) {
        score++;
        displayMessage("Correct!");
    }   else {
        displayMessage("Wrong!");
        secondsLeft -= 10;
        if (secondsLeft < 0) {
            secondsLeft = 0
        }
    }

    currentQuestion++; 
    if (currentQuestion < questions.length){
        displayQuestion();
    } else {
        stopGame();
    }
}
// Function to stop game
function stopGame() {

    clearInterval (countdownTimer);

    timerEl.textContent = "";

    quizEl.style.display = "none";
    resultEl.style.display - "block";

    summaryEl.textContent = "Your Score is: " + score;
}
