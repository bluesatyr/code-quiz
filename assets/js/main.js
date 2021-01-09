// Declare global variables
var playerScore = 0;
var highScore = 0;
var questionNumber = 1;
var currentQuestion = document.querySelector('.current-question');
var timer = 75
var timerEl = document.querySelector('.time');
var modalText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

var questions = {
    q1 : {question: "Commonly used data types do not include:", options: ["strings", "booleans", "numbers", "alerts"], answer: "alerts"},
    q2 : {question: "The condition in if/else statements is enclosed inside _______.", options: ["square brackets", "parenthesis", "curly brackets", "quotes"], answer: "parenthesis"},
    q3 : {question: "Arrays in JavaScript can be used to store ______.", options: ["numbers & strings", "other arrays", "booleans", "all of the above"], answer: "all of the above"},
    q4 : {question: "String values must be enclosed within _______ when being assigned to variables", options: ["commas", "curly brackets", "quotes", "parenthesis"], answer: "quotes"},
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
}


// TODO: display question and options (as buttons)

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
};

