/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll(".card");
console.log(cards);
var icons = []; // this array will hold the names for classes  
let openCards = []; // adding open cards to this array

let movesCounter = 0;

let numberOfStars = 3;


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
    numberOfStars = 3;
    movesCounter = 0;
    openCards = []; // to reset the array each time the game is played .
    updateScore();
    shuffleCards();
    flipAllCards();
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
            firstCardFlipped.className = "card";
            secondCardFlipped.className = "card";
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
        // display : You win
        showDialogToUser();
    }

}


function updateScoreAndStars() {
    movesCounter += 1;


    if (movesCounter <= 10) {
        numberOfStars = 3;
    } else if (movesCounter <= 20) {
        numberOfStars = 2;
    } else {
        numberOfStars = 1;
    }


    // this function will update the html to the user
    updateScore();
}


function updateScore() {

    const counter = document.querySelector(".moves");
    counter.innerText = movesCounter;

    // update starts 

    const starsHolder = document.querySelector(".stars");

    // clear the stars element
    starsHolder.innerHTML = "";
    // adding starts to the elements based on the number of stars 
    for (var i = 0; i < numberOfStars; i++) {
        var stars = '<li><i class="fa fa-star"></i></li>';
        starsHolder.innerHTML += stars;
    }

}

/* يمكن هون المشكله مالي متاكد  */
function showDialogToUser() {
    var myDialog = document.querySelector("#dialog-box");

    document.querySelector("#moves-span").innerText = movesCounter;
    myDialog.showModal();
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */