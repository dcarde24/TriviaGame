//Create trivia questions and answers
var trivQuestions = [{
    question: "What makes an automobile stop?",
    choices: [" Brakes", " Tires", " Headlights", " Steering Wheel"],
    answer: " Brakes"
},
{
    question: "What gives an automobile electrical power?",
    choices: [" Battery", " Starter", " Alternator", " None of the Above"],
    answer: " Battery"
},
{
    question: "In automotive terms, what does RPM stand for?",
    choices: [" Road Power Modulator", " Resale Price Maintenance", " Revolutions Per Minute", " None of the Above"],
    answer: " Revolutions Per Minute"
},
{
    question: "What does antifreeze do?",
    choices: [" Make the car go vroom vroom", " Keep the engine cool", " Make a tasty drink", " None of the Above"],
    answer: " Keep the engine cool"
},
{
    question: "Where does engine oil go?",
    choices: [" In the trunk", " In the headlight", " Inside the engine", " None of the Above"],
    answer: " Inside the engine"
},
{
    question: "What should you do when your check engine light comes on?",
    choices: [" Put tape over the light", " Take it to a trusted mechanic", " Open the hood and see if the engine is there", " None of the Above"],
    answer: " Take it to a trusted mechanic"
},
{
    question: "How often should you change your blinker fluid?",
    choices: [" It's a lifetime fluid", " Once a month", " Once a year", " There is no such thing as blinker fluid"],
    answer: " There is no such thing as blinker fluid"
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
        console.log("Game Over!");
        showOutCome();
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
    $('#Gameplay').html(`
    <h4>${question}</h4>
    ${showChoices(choices)}
    ${questRem()}
    `);
    
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
        score++;
        alert("Correct!!");
        newQuestion();
    } else {
        loss++;
        alert(`Incorrect. The correct answer is ${answer}`);
        newQuestion();
    }
});

//I want to show the user's stats at the end of the game
var showOutCome = function() {
    var outCome = `
        <p>You answered ${score} questions(s) correctly and</p>
        <p>you answered ${loss} questions(s) incorrectly</p>
        <p>out of a total amount of ${trivQuestions.length} questions(s)</p>
        <button class="btn btn-light" id="restart">Restart Game</button>
    `; 

    $('#Gameplay').html(outCome);
};

//add button to restart the game
$(document).on('click', '#restart', function() {
    counter = 30;
    presQuestion = 0;
    score = 0; 
    loss = 0;
    timer = null;

    showQuestion();
});

//Below is the question counter for user visual
var questRem = function() {
    var remQuest = trivQuestions.length - (presQuestion + 1);
    var totQuest = trivQuestions.length;

    return `Rem Quest: ${remQuest}/${totQuest}`;
}

//This begin function allows the user to begin the game by clicking the button at the top of the webpage.
$('#Begin').click(function() {
    $('#Begin').remove();
    $('#Timer').html(counter);
    showQuestion();
})