/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll(".card");
console.log(cards);
var icons = []; // this array will hold the names for classes  
let openCards = []; // adding open cards to this array

let movesCounter = 0;

let numberOfStars = 3;

let seconds = 0;

let minutes = 0;

let totalTime;

let timerHandler; // going to use it to stop the timer when required

// initialize game 
function initializeGame() {

    cards.forEach(cardClass => {

        // adding event listener 

        cardClass.addEventListener("click", clickingCard);


        // get image name  for each first child
        var cardNames = cardClass.children[0];
        // console.log(cardNames);
        // adding the class names to the array
        icons.push(cardNames.className);
        // cardClass.className = "card open show"; // delete me later
    });

    // event listener to the dialog buttons

    document.querySelector("#play-again").addEventListener("click", startAgainDialog);
    document.querySelector("#close").addEventListener("click", closeDialog);
    document.querySelector(".restart").addEventListener("click", startAgainDialog);

}



function flipAllCards() {
    // using for loop to remove the show ,  match and open classes in each li .
    cards.forEach(cardClass => {
        // right now all the cards are showing  the back only
        // cardClass.classList.remove("show");
        // cardClass.classList.remove("match");
        //  cardClass.classList.remove("open");
        cardClass.className = "card";


    });
}



function startAgainDialog() {
    closeDialog();
    numberOfStars = 3; // resetting the values 
    movesCounter = 0; // resetting the values 
    seconds = -1; // resetting the values 
    minutes = 0; // resetting the values 
    openCards = []; // to reset the array each time the game is played .
    updateScore();
    shuffleCards();
    flipAllCards();
    startTimer(); // start timer with every new game.
}


function startTimer() {
    if (!timerHandler) {
        // this function will be executed every second 
        timerHandler = setInterval(function() {
            seconds += 1;
            if (seconds > 59) {
                seconds = 0;
                minutes += 1;
            }
            // handle the leading zero for both seconds and minutes here :
            let stringSeconds = "";
            let stringMinutes = "";
            if (seconds < 10) {
                stringSeconds = "0" + seconds;
            } else {
                stringSeconds = seconds;
            }

            if (minutes < 10) {
                stringMinutes = "0" + minutes;

            } else {
                stringMinutes = minutes;
            }

            // handle the html for the timer
            document.querySelector(".timer").innerText = `${stringMinutes}:${stringSeconds}`;
            document.querySelector("#time-span").innerText = `${stringMinutes}:${stringSeconds}`;

        }, 1000);
    }

}

function stopTimer() {
    clearInterval(timerHandler);
    timerHandler = null;
}


function closeDialog() {
    document.querySelector("#dialog-box").close();
}


function shuffleCards() {
    icons = shuffle(icons);
    var i = 0;
    cards.forEach(cardClass => {
        var child = cardClass.children[0];
        child.className = icons[i];
        i++;
    });
}



function clickingCard() {
    // this if will stop the user from being able to click on the same card twice 
    if (this.classList.contains("show")) {
        return;
    }

    // condition to check if there are less than 2 cards open then i can open a card
    if (openCards.length < 2) {
        //flp the card when clicked on
        this.classList.toggle("show");
        this.classList.toggle("shake-it"); // toggle the animation 
        this.classList.toggle("open");
        // now i need to add the cards i opened to the array
        openCards.push(this);

        if (openCards.length == 2) {
            setTimeout(matchingTheCards, 1000);

            // so i can see the second card other wise you wont be able to see the second card being flipped 
            // if i have two cards open check if they match each other using this method
        }

    }

}



function matchingTheCards() {

    // check once again if i have only two cards open , not needed but just to be sure
    if (openCards.length == 2) {
        var firstCardFlipped = openCards[0];
        var secondCardFlipped = openCards[1];

        // now i need to get the class name for each card to compare
        // it and check if they are equal for each card
        var firstClass = firstCardFlipped.children[0].className; // getting class name
        var secondClass = secondCardFlipped.children[0].className; //getting class name

        // now compare the names ;
        if (firstClass == secondClass) {

            firstCardFlipped.classList.add("match");
            secondCardFlipped.classList.add("match");
            //    openCards = []; // release the date to enable me to click on another card
        } else {
            // flip the card back
            firstCardFlipped.className = " card ";
            secondCardFlipped.className = " card";
            // openCards = [];
        }
        // release the date to enable me to click on another card
        openCards = [];

        // increase the number of attempts and stars 
        updateScoreAndStars();

    }

    // check if there is no more cards left to open 

    const remainingUnOpenedCards = document.querySelectorAll(".card:not(.match)");
    if (remainingUnOpenedCards.length == 0) {
        // display : You win message
        showDialogToUser();

    }

}


function updateScoreAndStars() {
    movesCounter += 1;


    if (movesCounter <= 14) {
        numberOfStars = 3;
    } else if (movesCounter <= 35) {
        numberOfStars = 2;
    } else {
        numberOfStars = 1;
    }

    //hi yo
    // this function will update the html to the user
    updateScore();
}


function updateScore() {

    const counter = document.querySelector(".moves");
    counter.innerText = movesCounter;

    // update starts 

    let starsHolder = document.querySelector(".stars");

    let ScoreSpanHolder = document.querySelector("#scored-span");
    // clear the stars element
    starsHolder.innerHTML = "";
    ScoreSpanHolder.innerHTML = "";
    // adding starts to the elements based on the number of stars 
    for (var i = 0; i < numberOfStars; i++) {
        var stars = '<li><i class="fa fa-star"></i></li>';
        var scoreSpan = '<i class="fa fa-star"></i>';

        starsHolder.innerHTML += stars;
        ScoreSpanHolder.innerHTML += scoreSpan;
    }

}

function showDialogToUser() {
    var myDialog = document.querySelector("#dialog-box");

    document.querySelector("#moves-span").innerText = movesCounter;


    myDialog.showModal();



    // stop the timer when the user win.
    stopTimer();
}


// clear the score at the beginning of very game ; 
initializeGame();
startAgainDialog();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}