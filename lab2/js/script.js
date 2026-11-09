//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;
   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
   
   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";
  
   //adding focus to textbox
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();
   playerGuess.value = "";
   
   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";
   
   document.querySelector("#guesses").textContent = "";
   document.querySelector("#attempts").textContent = 7 - attempts;
   document.querySelector("#attempts").style.color = "#274AB3";
   document.querySelector("#wins").textContent = wins;
   document.querySelector("#wins").style.color = "green";
   document.querySelector("#losses").textContent = losses;
   document.querySelector("#losses").style.color = "#C93636";
}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99){
        feedback.textContent = "Enter a number between 1 and 99.";
        feedback.style.color = "#C93636";
        return;
    }
    
    attempts++;
    console.log("Attempts: " + attempts);
    document.querySelector("#attempts").textContent = 7 - attempts;
    document.querySelector("#attempts").style.color = "#274AB3"; 
    feedback.style.color = "orange";
    
    if(guess == randomNumber){
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "green";
        wins++;
        document.querySelector("#wins").textContent = wins;
        document.querySelector("#wins").style.color = "green"
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if(attempts == 7){
            feedback.textContent = "Sorry, you lost! The number is " + randomNumber + ".";
            feedback.style.color = "#C93636";
            losses++;
            document.querySelector("#losses").textContent = losses;
            document.querySelector("#losses").style.color = "#C93636";
            gameOver();
        } else if(guess > randomNumber){
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}