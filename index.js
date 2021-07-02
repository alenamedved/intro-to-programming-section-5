const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('num-of-guesses');
const correctMessage = document.getElementById('correct');

let nanMessage = document.createElement('p')

const min = 1
const max = 100

let targetNumber;
let attempts;
const maxNumberOfAttempts = 5;


// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(min, max);
  console.log(`target number: ${targetNumber}`);
  
  //Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
  
  hideAllMessages();
  resetButton.style.display = 'none';
}


function validateInput(guess) {
  
  if(guess > (max - min) || guess < min || isNaN(guess)) {
    console.log(nanMessage)
    nanMessage.style.color = "red"
    nanMessage.className = "message"
    tooLowMessage.parentNode.insertBefore(nanMessage, tooLowMessage.nextSibling)
    if(guess > (max - min)) {
      nanMessage.innerText = `Number must be less than ${max}`
    } else if(guess < min) {
      nanMessage.innerText = `Number must be greater than ${min}`
    } else {
      nanMessage.innerText = `Must input a number between ${min} and ${max - min}`
    }
    return false
  }
  return true
}

function pluralVsSingle(remainingAttempts, attempts) {

  if(guessInput.value == targetNumber) {
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guess${attempts === 1 ? '' : 'es'}`
  } else {
    numberOfGuessesMessage.innerHTML = `You guessed ${guessInput.value}. <br> ${remainingAttempts} guess${remainingAttempts === 1 ? '' : 'es'} remaining`
  }
  return numberOfGuessesMessage
}


    
function checkGuess() {
    // Get value from guess input element
    const guess = parseInt(guessInput.value, 10);
    hideAllMessages();
    attempts = attempts + 1;
    
    if(validateInput(guess)) {
       
      if (attempts >= maxNumberOfAttempts) {
        guessInput.value = '';
        submitButton.disabled = true; 
        guessInput.disabled = true;
        maxGuessesMessage.innerHTML = `You lost! You have no more attempts. The number was ${targetNumber}`
        maxGuessesMessage.style.color = "red"
        maxGuessesMessage.style.display = ''
        return
      }
      
      const remainingAttempts = maxNumberOfAttempts - attempts;
         
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
        pluralVsSingle(remainingAttempts, attempts)
        numberOfGuessesMessage.style.display = '';

      } else if(guess > targetNumber) {
          tooHighMessage.style.display = '';
          pluralVsSingle(remainingAttempts, attempts)
          numberOfGuessesMessage.style.display = '';

      } else {
        pluralVsSingle(remainingAttempts, attempts)
        numberOfGuessesMessage.style.display = '';
        correctMessage.style.display = '';
        
        submitButton.disabled = true;
        guessInput.disabled = true;
      } 
    } else {
      nanMessage.style.display = ''
    }
  
  guessInput.value = '';

  resetButton.style.display = '';
}


submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
