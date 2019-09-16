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

//Logic for timer function on page
var timeUp = function() {
    clearInterval(timer);
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

showQuestion();