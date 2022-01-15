var question_container = document.getElementById('question_container');
var response_container = document.getElementById('response_container');
var firstButton = document.getElementById('choice_1');
var secondButton = document.getElementById('choice_2');

var questionClass = "question_container animate__animated animate__fadeInUp";
var buttonClass = "response_container animate__animated animate__fadeInUp";
var refreshButtonClass = "refresh_button animate__animated animate__fadeInUp";

var previousButton1 = firstButton;

var question2 = "What do you want to eat?";
var questions = [question2, "An example question"];
var options2 = ["Pizza", "Burgers", "Chinese", "Italian", "Mexican"];


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Generates a random number except for specified number
function randomNumExcept(except){
    var num = 0;
    do{
        num = getRandomInt(options2.length);
    } while(num == except);

    return num;
}

//Disables previous 2 generated buttons
function disableButtons(){
    var previousButtons = document.getElementsByClassName('response');
    var refreshButton = document.getElementById('refresh_button');

    previousButtons[previousButtons.length - 1].disabled = true;
    previousButtons[previousButtons.length - 2].disabled = true;
    if(refreshButton){ refreshButton.disabled = true; }
}

var answer = '';//records answer selected for each question
var queryChoices = '';//combined answers for use in Google search query

function createQuestion(question){
    var questionText = question;
    var newQuestion = document.createElement("div");
    newQuestion.setAttribute('class', questionClass);
    newQuestion.setAttribute('id', 'question_container');
    newQuestion.innerText = questionText;

    return newQuestion;
}

function createNewResponseButton(responseText, id){
    var newChoice = document.createElement('button');
    newChoice.setAttribute('class', 'response');
    newChoice.setAttribute('id', id);
    newChoice.innerText = responseText;
    newChoice.addEventListener('click', showNextQuestion);

    return newChoice;
}

function refreshChoices(){
    var previousButtons = document.getElementsByClassName('response');
    
    var randomInt = getRandomInt(options2.length);
    previousButtons[previousButtons.length - 1].textContent = options2[randomInt];
    previousButtons[previousButtons.length - 2].textContent = options2[randomNumExcept(randomInt)];

    console.log(previousButtons);
}

var questionNumber = 0;

function showNextQuestion(){
    //disable previous button
    disableButtons();

    //build up search query
    answer = this.innerText;
    queryChoices = queryChoices.length > 0 ? answer + "+" + queryChoices : answer;

    //keep track of questions
    questionNumber++;
    if(questionNumber >= questions.length){
        //Show results and button to search for restaurants
        var searchButtonContainer = document.createElement('div');
        searchButtonContainer.setAttribute('class', 'response_container');

        var searchButton = document.createElement('button');
        searchButton.setAttribute('class', 'response');
        searchButton.setAttribute('id', 'search_button');
        searchButton.innerText = "Search for Restaurants";
        searchButton.addEventListener('click', searchForRestaurants);

        searchButtonContainer.appendChild(searchButton);
        document.body.append(searchButtonContainer);
    } else{
        //create new container for question and response buttons
        var newContainer = document.createElement('div');
        newContainer.setAttribute('class', 'container');

        //create new question
        var newQuestion = createQuestion(question2);

        //create new response buttons
        var newButtons = document.createElement('div');
        newButtons.setAttribute('class', buttonClass);
        newButtons.setAttribute('id', 'response_container');

        var cuisineChoice = getRandomInt(options2.length);
        var choice1Text = options2[cuisineChoice];
        var newChoice1 = createNewResponseButton(choice1Text, 'choice_1');

        var choice2Text = options2[randomNumExcept(cuisineChoice)];
        var newChoice2 = createNewResponseButton(choice2Text, 'choice_2');

        var refreshButton = document.createElement('button');
        refreshButton.setAttribute('class', refreshButtonClass);
        refreshButton.setAttribute('id', 'refresh_button');
        var fa_refresh_button = document.createElement('i');
        fa_refresh_button.setAttribute('class', 'fas fa-sync-alt');
        fa_refresh_button.addEventListener('click', refreshChoices);
        refreshButton.appendChild(fa_refresh_button);

        //append new button to button container
        newButtons.appendChild(newChoice1);
        newButtons.appendChild(newChoice2);
        newButtons.appendChild(refreshButton);


        //append new question and response buttons to container
        newContainer.appendChild(newQuestion);
        newContainer.appendChild(newButtons);

        //append container to document
        document.body.append(newContainer);
    }
}

function searchForRestaurants(){
    window.open(`https://www.google.com/search?q=${queryChoices}`, "_blank");
}


firstButton.addEventListener('click', showNextQuestion);
secondButton.addEventListener('click', showNextQuestion);
