
const container_1 = $("#buttons-container-1");
const alphabet_1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (let letter of alphabet_1) {
    const button = $("<button></button>");
    button.prop("type", "submit");
    button.addClass("alphabets");
    button.text(letter);
    container_1.append(button);
}

const movieNames = ["INCEPTION", "INTERSTELLAR", "OPPENHEIMER", "ALIEN", "GLADIATOR", "FROZEN", "HUGO", "DUNE", "DUNKIRK", "TENET", "TITANIC", "JAWS", "MEMENTO", "JOKER", "AVATAR"];
const randomIndex = Math.floor(Math.random() * movieNames.length);
const randomMovie = movieNames[randomIndex];

console.log(randomMovie);

const movieNameDisplay = $("#movie-name-display");
movieNameDisplay.text("-".repeat(randomMovie.length));

const firsthangmanStage = $("#stage-blank");
const hangmanStages = $(".hangman-stage");
let currentHangmanStage = 0;

const alphabetButtons = $(".alphabets");

const guessedLetters = [];

alphabetButtons.on("click", function() {
    const guess = $(this).text();
    const isCorrect = checkGuess($(this).text());
    
    if (!isCorrect) {
        incrementHangmanStage();
        $(this).addClass("incorrect");
        console.log(currentHangmanStage);
        if (currentHangmanStage === 6) {
            console.log("GAMEOVER");
            movieNameDisplay.text("Hangman. The answer was " + randomMovie);
        }
    } else {
        $(this).addClass("correct");
        guessedLetters.push(guess);
    }
    
    if (checkIfAllLettersGuessed()) {
        console.log("GAME WON");
        movieNameDisplay.text("Thats correct. The answer was " + randomMovie);
    }
});

function incrementHangmanStage() {
    if (currentHangmanStage < hangmanStages.length - 1) {
        $(hangmanStages[currentHangmanStage]).removeClass("active");
        currentHangmanStage++;
        $(hangmanStages[currentHangmanStage]).addClass("active");
        
        if (currentHangmanStage === 1) {
            firsthangmanStage.css("display", "none");
        }
    }
}

function checkGuess(guess) {
    const movieArray = randomMovie.split('');
    const isCorrect = movieArray.includes(guess);
    
    if (isCorrect) {
        updateMovieNameDisplay(guess);
    }
    
    return isCorrect;
}

function updateMovieNameDisplay(guess) {
    const movieArray = randomMovie.split('');
    let updatedDisplay = movieNameDisplay.text();
    
    for (let i = 0; i < movieArray.length; i++) {
        if (movieArray[i] === guess) {
            updatedDisplay = updatedDisplay.substring(0, i) + guess + updatedDisplay.substring(i + 1);
        }
    }
    
    movieNameDisplay.text(updatedDisplay);
}

function checkIfAllLettersGuessed() {
    const movieArray = randomMovie.split('');
    for (let letter of movieArray) {
        if (!guessedLetters.includes(letter)) {
            return false;
        }
    }
    return true;
}

const refreshButton = $("#refresh-button");

refreshButton.on("click", function() {
    location.reload();
});
