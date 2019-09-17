//Create trivia questions and answers
var trivQuestions = [{
    question: "What makes an automobile stop?",
    choices: ["Brakes", "Tires", "Headlights", "Steering Wheel"],
    answer: "Brakes"
},
{
    question: "What gives an automobile electrical power?",
    choices: ["Battery", "Starter", "Alternator", "None of the Above"],
    answer: "Battery"
},
{
    question: "In automotive terms, what does RPM stand for?",
    choices: ["Road Power Modulator", "Resale Price Maintenance", "Revolutions Per Minute", "None of the Above"],
    answer: "Revolutions Per Minute"
}
];

//Create values for the game
var counter = 30;
var presQuestion = 0;
var score = 0; 
var loss = 0;
var timer;

//Create logic for new question to cycle through
var newQuestion = function() {

    var questionEnd = (trivQuestions.length - 1) === presQuestion; 
    if (questionEnd) {
        console.log("Game Over!")
    } else {
        presQuestion++;
        showQuestion();
    }
}

//Logic for timer function on page
var timeUp = function() {
    clearInterval(timer);

    loss++;

    newQuestion();
}

var countDown = function() {
    counter--;

    $('#Timer').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

//Display question
var showQuestion = function () {

    counter = 30;
    timer = setInterval(countDown, 1000);

    var question = trivQuestions[presQuestion].question;
    var choices = trivQuestions[presQuestion].choices;

    $('#Timer').html('Timer: ' + counter);
    $('#Gameplay').html(`<h4>${question}</h4>
    ${showChoices(choices)}`
    );
    
}

//Display the choices for the questions
var showChoices = function (choices) {
    var result = '';

    for (var i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

//Added logic for correct or wrong answer
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    var selection = $(this).attr('data-answer');
    var answer = trivQuestions[presQuestion].answer;
    
    if (answer === selection) {
        //TODO
        //USER WINS
        score++;
        alert("Correct!!");
        newQuestion();
    } else {
        loss++;
        alert("Incorrect");
        newQuestion();
    }
});

showQuestion();