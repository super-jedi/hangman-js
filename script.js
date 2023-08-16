
const container_1 = document.getElementById("buttons-container-1");
const container_2 = document.getElementById("buttons-container-2")

 const alphabet_1 = "ABCDEFGHIJKLM";
 const alphabet_2 = "NOPQRSTUVWXYZ";


 for (let letter of alphabet_1) {
     const button = document.createElement("button");
     button.type = "submit";
     button.className = "alphabets";
     button.innerText = letter;
     container_1.appendChild(button);
 }

 for (let letter of alphabet_2) {
    const button = document.createElement("button");
    button.type = "submit";
    button.className = "alphabets";
    button.innerText = letter;
    container_2.appendChild(button);
}




const movieNames = ["INCEPTION", "INTERSTELLAR", "OPPENHEIMER", "ALIEN", "GLADIATOR", "FROZEN", "HUGO", "DUNE", "DUNKIRK", "TENET", "TITANIC", "JAWS", "MEMENTO", "JOKER", "AVATAR" ];
const randomIndex = Math.floor(Math.random() * movieNames.length);
const randomMovie = movieNames[randomIndex];

console.log(randomMovie);




const movieNameDisplay = document.getElementById("movie-name-display");
movieNameDisplay.textContent = "-".repeat(randomMovie.length);


const hangmanStages = document.querySelectorAll(".hangman-stage");
let currentHangmanStage = 0;

const alphabetButtons = document.querySelectorAll(".alphabets");

const guessedLetters = [];

alphabetButtons.forEach(button => {
    button.addEventListener("click", () => {
        const guess = button.innerText;
        const isCorrect = checkGuess(button.innerText);

        if (!isCorrect) {
            incrementHangmanStage();
            button.classList.add("incorrect");
            console.log(currentHangmanStage)
            if(currentHangmanStage == 6){
                console.log("GAMEOVER")
                movieNameDisplay.textContent = "Hangman. The answer was "+ randomMovie;
            }
        }
        else{
            button.classList.add("correct");
            guessedLetters.push(guess);
        }  
        if (checkIfAllLettersGuessed()) {
            
            console.log("GAME WON")
            movieNameDisplay.textContent = "Thats correct. The answer was "+ randomMovie;

        }   
    });
});



function incrementHangmanStage() {
    if (currentHangmanStage < hangmanStages.length - 1) {
        hangmanStages[currentHangmanStage].classList.remove("active");
        currentHangmanStage++;
        hangmanStages[currentHangmanStage].classList.add("active");
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
    let updatedDisplay = movieNameDisplay.textContent;

    for (let i = 0; i < movieArray.length; i++) {
        if (movieArray[i] === guess) {
            
            updatedDisplay = updatedDisplay.substring(0, i) + guess + updatedDisplay.substring(i + 1);
        }
    }

    movieNameDisplay.textContent = updatedDisplay;
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


var refreshButton = document.getElementById("refresh-button");

  
  refreshButton.addEventListener("click", function() {
    
    location.reload();
  });