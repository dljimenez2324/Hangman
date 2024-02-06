// Psuedo Code here
//we will count the number of turns left
// make a counter variable to count the number of remaining turns
// variable for max number of turns

// make an array of different words
// make a random generator or function to grab a word from the array
// keep a letter bank, to show which letters the user has already tried
// count the number of correct guesses to see if they've won the game
// have an input field for user
// start and replay button
// maybe a loop to display the letter s in their correct position for when the user guesses a letter correctly
// display field for the number of remaining turns
// popup to ask if you're sure if you want to restart ??

let displayedWord = document.getElementById('displayedWord');
let displayedGuesses = document.getElementById('displayedGuesses');
let letterBank = document.getElementById('letterBank');
let userInput = document.getElementById('userInput');
let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('restartBtn');

// will become the random word we pull from our array
let randomWord = "";

// this will contain an array that we will join together later in order to display the underscores, & letters they have guessed correctly, in the spaces they would take up in a word
let letterArray = [];

// number of missed guess they have made, starts at zero
let guesses = 0;

// max number of missed guesses
let maxGuesses = 6;

// this will be the letters they have guessed
let wrongGuess = "";

startBtn.addEventListener('click', function(){
    dataCall();
});

restartBtn.addEventListener('click', function(){
    resetGame();
});

// event or "e"   is a reserved word which will run the function event and also stores the data from the function   its like a fishing net and grabs a bunch of data unlike us making a variable normally
// event.key will take the value that is entered and save it to event

//  this is the rundown of how this function works
// if the key was enter, then we save the value of what was pressed in the input.  Guess will now be checked with the if for if its within our random word.  if it is in then we update the displayed letter array position.
userInput.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        let guess = userInput.value.toLowerCase();

        // check if the users guess is included in our random word
        if(randomWord.includes(guess)){
            //alert("test");
            for(let i=0; i < randomWord.length; i++){
                if(randomWord[i] === guess){
                    letterArray[i] = guess;
                }
            }
        }
        else{
            wrongGuess += guess + "  ";
            letterBank.textContent = wrongGuess;
            guesses++;
        }
        updateGameState();
        userInput.value = "";
        gameEnd();
    }
});

function dataCall() {
    // fetch mean grab data  
    fetch('../data/data.json').then(response => response.json()).then( data => {

        let rndNum = Math.floor(Math.random() * data.words.length);
        randomWord = data.words[rndNum];
        console.log(randomWord);

        startGame(randomWord);
    });
    
}

function startGame(word){
    letterArray = []; // clears letter array at start of game
    
    for(let i=0; i < word.length; i++){
        letterArray[i] = "_";
        updateGameState();
        // makes readonly turn off  rememeber . means look at userInput and then look at the readOnly and now change it
        userInput.readOnly = false;  

    }
}

function updateGameState(){
    displayedWord.textContent = letterArray.join(" ");
    displayedGuesses.textContent = `Guesses Used: ${guesses} / ${maxGuesses}`;
}

function resetGame(){
    randomWord = "";
    wrongGuess = "";
    letterArray = [];
    guesses = 0;
    userInput.readOnly = true;
    userInput.value = "";
    displayedGuesses.textContent = "Guesses Used: X / X";
    displayedWord.textContent = "Displayed Word";
    letterBank.textContent = "Letter Bank";
}

function gameEnd(){
    // Lose: check if guesses === maxGuesses
    // Win: check if randomWord === letterArray

    if(guesses === maxGuesses){
        alert(`You Lose! Your word was ${randomWord}! Good luck next time!`);
        resetGame();
    }
    else if(letterArray.join("") === randomWord && randomWord !=""){
        alert(`You Win!  The word was ${randomWord}!`);
        resetGame();
    }
    // else{

    // }
}