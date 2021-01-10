// Declare global variables
var questionNumber = 1;
var currentQuestion = document.querySelector('.current-question');
var timer = 75;
var timerOn = false; 
var timerEl = document.querySelector('.time');
var rightWrong = "";
var score = 0;

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
    button.className = "option-list-item btn";
    var answer = questions[key]['options'][index];
    button.setAttribute('data-value', answer);
    console.log(button.dataset.value);
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

// handles user input and adds to localStorage
var scoreFormHandler = function(event){
    console.log(event);
    event.preventDefault();
    var highScores = JSON.parse(localStorage.getItem('high-scores'));
    console.log(highScores);
    if (!highScores) {
        highScores = [];
    };
    console.log(highScores);
    var myScore = score;
    var scoreNameInput = document.querySelector("input[name='player-name']").value;
    
    var scoreEntry = [scoreNameInput, myScore];
    highScores.push(scoreEntry);
    highScores.sort(function(a, b){return b[1]-a[1]});
    console.log(highScores);
    localStorage.setItem('high-scores', JSON.stringify(highScores));
    
    renderScores();
};

// create final results view
var finalResults = function (score) {
    timer = 0;
    var intro = document.querySelector('.game-wrapper');
    intro.innerHTML = "<div class='intro'><h1 class='title'>Coding Quiz Challenge</h1><p>You have completed the Quiz! Your Score is " + score + "</p><input type='text' name='player-name' class='text-input' placeholder='Enter Your Initials' /><button class='btn' id='log-score' type='submit'>Submit</button></div>";
    timerOn = false;
    document.querySelector('#log-score').addEventListener('click', scoreFormHandler);
};

// retrieves high scores and renders to view
var renderScores = function() {
    var scoreboard = document.querySelector('.game-wrapper');
    scoreboard.innerHTML = "<div class='scoreboard'><h2>High Scores</h2><ul class='score-list'></ul></div>";
    var highScores = JSON.parse(localStorage.getItem('high-scores'));
    if (!highScores) {
        highScores = [];
    }
    var scoreList = document.querySelector('.score-list');
    for (var i = 0; i < highScores.length; i++){
        var entry = document.createElement('li');
        entry.className = "scoreboard-item"
        entry.textContent = (i + 1) + ". " + highScores[i][0] + " - " + highScores[i][1];
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
            var listEl = event.target.closest(".option-list-item");
            var listElValue = listEl.dataset.value
            console.log(listElValue);
            
            var answer = questions[questionKey]['answer'];
            
            console.log(answer);
            
            
            // update the rightWrong variable to be used during next call of createQuestionEl function
            
            if (listElValue === answer) {
                questionNumber++;
                if (questionNumber >= 6) {
                    score = timer;
                    timerOn = false;
                    timerEl.textContent = "Final Score: " + score;
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
                    score = (timer-= 10);
                    timerOn = false;
                    timerEl.textContent = "Final Score: " + score;
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
        timerOn = true;
        
        if (timer > 1){
            timerEl.textContent = timer; 
            timer--;
        } 
        else if (timer === 1){
            timerEl.textContent = timer;
            timer--;
        } 
        else if (timer<0 || timerOn===false) {
            timerEl.textContent = "The time has expired"; //change to say time is up
            clearInterval(startTimer); // stop the timer
            //displayMessage();
            // stop the timer
            // Call a function to make timer the final score     
        }
        }, 1000);
    
       
};

// initial view
var createIntro = function () {
    var intro = document.querySelector('.game-wrapper');
    intro.innerHTML = "<div class='intro'><h1 class='title'>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><button id='start' class='btn'>Start Quiz</button></div>";
    
    // listen for start button click then start the game
    document.querySelector('#start').addEventListener('click', startQuiz);
};


document.querySelector('.high-score').addEventListener('click', renderScores);

createIntro();
