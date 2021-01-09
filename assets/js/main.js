// Declare global variables
var playerScore = 0;
var highScore = 0;
var questionNumber = 1;
var currentQuestion = document.querySelector('.current-question');
var timer = 75
var timerEl = document.querySelector('.time');
var introText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

var questions = {
    q1 : {question: "Commonly used data types do not include:", options: ["strings", "booleans", "numbers", "alerts"], answer: "alerts"},
    q2 : {question: "The condition in if/else statements is enclosed inside _______.", options: ["square brackets", "parenthesis", "curly brackets", "quotes"], answer: "parenthesis"},
    q3 : {question: "Arrays in JavaScript can be used to store ______.", options: ["numbers & strings", "other arrays", "booleans", "all of the above"], answer: "all of the above"},
    q4 : {question: "String values must be enclosed within _______ when being assigned to variables.", options: ["commas", "curly brackets", "quotes", "parenthesis"], answer: "quotes"},
    q5 : {question: "A very useful tool for development and debugging for printing content to the debugger is:", options: ["JavaScript", "terminal/bash", "for loops", "console.log"], answer: "console.log"},
};

// Create intro to prompt game start
var createIntro = function () {
    var intro = document.querySelector('.game-wrapper');
    intro.innerHTML = "<div class='intro'><h1 class='title'>Coding Quiz Challenge</h1><p>"+introText+"</p><button id='start'>Start Quiz</button></div>";
    
    // listen for start button click then start the game
    document.querySelector('#start').addEventListener('click', startQuiz);
}

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
}


// create and display options (as buttons)
var createButtonEl = function(key, index) {
    var optionList = document.querySelector('.option-list');
    var button = document.createElement('li');
    button.className = "option-list-item";
    var answer = questions[key]['options'][index];
    button.textContent = (index+1) + ". " + answer;
    optionList.appendChild(button);
}


// create questionEl
var createQuestionEl = function(arr, randArr, index) {
    // create the quiz elements
    document.querySelector('.game-wrapper').innerHTML= 
        "<div class='current-question'><h3 class='question-number'></h3><p class='question-text'></p><div class='options'><ul class='option-list'></ul></div></div>";    
    // select question-number class       
    var questionNum = document.querySelector('.question-number');
    // set question-number text content
    questionNum.textContent = "Question: " + questionNumber;
    
    var questionKey = randArr[index];
    var questionText =  questions[questionKey]['question'];
    var qTextEl = document.querySelector('.question-text')
    qTextEl.textContent = questionText;
    
    // create option buttons in a for loop
    for (var i = 0 ; i < 4; i++) {
        createButtonEl(questionKey, i);
    }
};


var startQuiz = function() {
    var questionNumber = 1;
    var questionArray = Object.keys(questions);
    console.log(questionArray);
    var randQuestions = randomize(questionArray);
    console.log(randQuestions);
    
    createQuestionEl(questions, randQuestions, 2);
     var startTimer = setInterval(function() {
      if (timer > 1){
          timerEl.textContent = timer; 
          timer--;
      } else if (timer === 1){
          timerEl.textContent = timer;
          timer--;
      } else {
          timerEl.textContent = ""; //change to say time is up
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



