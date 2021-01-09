// Declare global variables
var questionNumber = 1;
var currentQuestion = document.querySelector('.current-question');
var timer = 75;
var timerEl = document.querySelector('.time');
var rightWrong = "";


var questions = {
    q1 : {question: "Commonly used data types do not include:", options: ["strings", "booleans", "numbers", "alerts"], answer: "alerts"},
    q2 : {question: "The condition in if/else statements is enclosed inside _______.", options: ["square brackets", "parenthesis", "curly brackets", "quotes"], answer: "parenthesis"},
    q3 : {question: "Arrays in JavaScript can be used to store ______.", options: ["numbers & strings", "other arrays", "booleans", "all of the above"], answer: "all of the above"},
    q4 : {question: "String values must be enclosed within _______ when being assigned to variables.", options: ["commas", "curly brackets", "quotes", "parenthesis"], answer: "quotes"},
    q5 : {question: "A very useful tool for development and debugging for printing content to the debugger is:", options: ["JavaScript", "terminal/bash", "for loops", "console.log"], answer: "console.log"},
};

// make a `keys array` of questions object keys
var  questionArray = Object.keys(questions);
console.log(questionArray);

// Randomize the order of the `keys array`
var randomize = function(array){
    for (let i = questionArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * questionArray.length);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
    return array;
};


// create and display options (as buttons)
var createButtonEl = function(key, index) {
    var optionList = document.querySelector('.option-list');
    var button = document.createElement('li');
    button.className = "option-list-item";
    var answer = questions[key]['options'][index];
    // data attribute of answer?
    var buttonText = (index+1) + ". ";
    button.innerHTML = buttonText + "<span class='option-value'>" + answer + "</span";
    optionList.appendChild(button);
}

// depending upon a right or wrong answer: adjust timer & display result.
var result = function(clicked) {
    if (clicked === "wrong") {
        var resultDiv = document.querySelector('.previous-result')
        resultDiv.innerHTML = "";
        var resultEl = document.createElement('div');
        resultEl.className = "incorrect";
        resultEl.innerHTML = "<hr><h3>Incorrect!</h3>";
        timer-=10;
        resultDiv.appendChild(resultEl);
        
    }
    else if (clicked === "right"){
        var resultDiv = document.querySelector('.previous-result')
        resultDiv.innerHTML = "";
        var resultEl = document.createElement('div');
        resultEl.className = "correct";
        resultEl.innerHTML = "<hr><h3>Correct!</h3>";
        resultDiv.appendChild(resultEl);
    }
};

// create final results view
var finalResults = function (score) {
    var intro = document.querySelector('.game-wrapper');
    intro.innerHTML = "<div class='intro'><h1 class='title'>Coding Quiz Challenge</h1><p>You have completed the Quiz! Your Score is " + score + "</p><button id='log-score'>Submit</button></div>";
    
    // label for input: 'Enter your initials'
    
    // input field
}

// High Scores - list,from localStoarage, go back button , clear high scores button.

// highScores = [['SE', 22]]
// 1. SE - 22

var renderScores = function() {
    var scoreboard = document.querySelector('.game-wrapper');
    scoreboard.innerHTML = "<div class='scoreboard'><h2>High Scores</h2><ul class='score-list'></ul></div>";
    var highScores = JSON.parse(localStorage.getItem('high-scores'));
    var scoreList = document.querySelector('score-list');
    for (var i = 0; i < highScores.length; i++){
        var entry = document.createElement('li');
        entry.className = "scoreboard-item"
        entry.textContent = (i + 1) + ". " highScores[i][0] + " - " + highScores[i][1];
        scoreList.appendChild(entry);
    }
}

// create questionEl
var createQuestionEl = function(arr, randArr, index) {
    
    // create the quiz elements
    document.querySelector('.game-wrapper').innerHTML= 
        "<div class='current-question'><h3 class='question-number'></h3><p class='question-text'></p><div class='options'><ul class='option-list'></ul></div></div><div class='previous-result'></div>";    
    // select question-number class       
    var questionNum = document.querySelector('.question-number');
    // set question-number text content
    questionNum.textContent = "Question: " + questionNumber;
    
    // get the key name from the randomized array
    var questionKey = randArr[index];
    // use that key to get the values from the questions object
    var questionText =  questions[questionKey]['question'];
    var qTextEl = document.querySelector('.question-text')
    qTextEl.textContent = questionText;
    
    // create option buttons in a for loop
    for (var i = 0 ; i < 4; i++) {
        createButtonEl(questionKey, i); 
    };
    
    // check status of last question
    if (rightWrong === "right") {
        result("right");
    }
    else if (rightWrong === "wrong") {
        result("wrong");
    }
    
    var options = document.querySelector(".options");
    
    // function when an option is clicked
    options.addEventListener("click", function(event) {
         
            var listEl = event.target.closest(".option-value");
            console.log(listEl);
            
            var answer = questions[questionKey]['answer'];
            
            console.log(answer);
            
            
            // update the rightWrong variable to be used during next call of createQuestionEl function
            
            if (listEl.textContent === answer) {
                questionNumber++;
                if (questionNumber >= 6) {
                    var score = timer;
                    finalResults(score); // function to display results and add player to scoreboard
                }
                else {
                    rightWrong = "right";
                    createQuestionEl(questions, randArr, (questionNumber - 1));
                }
            }
            else {
                questionNumber++;
                if (questionNumber >= 6) {
                    var score = (timer-= 10);
                    finalResults(score); // function to display results and add player to scoreboard
                }
                else {
                    rightWrong = "wrong";
                    createQuestionEl(questions, randArr, (questionNumber - 1));
                }
            }
        
    });
};


// start the quiz
var startQuiz = function() {
    var questionNumber = 1;
    var questionArray = Object.keys(questions);
    console.log(questionArray);
    var randQuestions = randomize(questionArray);
    console.log(randQuestions);
    
    createQuestionEl(questions, randQuestions, (questionNumber - 1));
         
     var startTimer = setInterval(function() {
      if (timer > 1){
          timerEl.textContent = timer; 
          timer--;
      } else if (timer === 1){
          timerEl.textContent = timer;
          timer--;
      } else {
          timerEl.textContent = "The time has expired"; //change to say time is up
          clearInterval(startTimer); // stop the timer
          //displayMessage();
          // stop the timer
          // Call a function to make timer the final score     
      }
    }, 1000);
    
    
    
    
    /* Loop through questions one by one
    for (var i = 0; i < questions.length; i++) {
        createQuestionEl(questions, randQuestions, i);
        // createOptionEls
        questionNumber++;
    } */
}

document.querySelector('#start').addEventListener('click', startQuiz);


