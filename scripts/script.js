//TODO:
//invalid key check
//new game generator
//
var loseCount = 0;
var winCount = 0;

function game(){
  var wordList = [
    'terminator',
    'batman',
    'superman',
    'wonderwoman',
    'deadpool',
    'wolverine']
  var currentWord = wordList[Math.floor(Math.random()*wordList.length)];
  var keyPressed; //current letter pressed
  var knownLetters = '';
  var wrongLetters = [];
  var wrongGuessText = document.getElementById('wrong');
  var rightGuessText = document.getElementById('right');
  var guessesRemainingText = document.getElementById('guesses-remaining');
  var loseCountText = document.getElementById('lose-count');
  var winCountText = document.getElementById('win-count')

   
  var guessesRemaining = 9;
  var lettersArray;



    for(var i = 0; i<currentWord.length; i++){
        knownLetters += '_';
    }
    
    lettersArray = knownLetters.split('');
    
   
    //this function allows for the individual letters to stay displayed. without it being a function, previous correct letters would disapear
    function letterArrayFunc(key){
      if (currentWord.indexOf(key) !== -1) {// is correct letter indexOf
        for (var i = 0; i<lettersArray.length; i++){
          if(key == currentWord[i]){
              lettersArray[i] = key; 
              gameWonCheck(lettersArray,currentWord);
          
          }
        }
      } 
      else {
        // letter is not correct
        wrongLetters.push(key);
        guessesRemaining -= 1;
        gameOver(guessesRemaining)
      }
    }

    //checks the array against the string to see if they match. If so, win
    function gameWonCheck(lArray, cWord){
      var  playAgain;
      lArray=lArray.join('')
      if(lArray===cWord){
        playAgain = confirm ('winner! Play again?');
        if(playAgain){
          winCount +=1;
          game();
        }
      }
    }

    //checks wrong letter and counts down guesses
    function gameOver(guess){
      var playAgain;
      if (guess === 0){
        playAgain = confirm('Game Over! Play again?')
        if (playAgain){
          loseCount += 1;
          game() //starts game over again
          
        }
      }
    }

    
      document.onkeyup = function(event){
            keyPressed = event.key;
            
            letterArrayFunc(keyPressed);
            
            //reset game option?
            //new game button?
            if (loseCount > 0 || winCount > 0){
              loseCountText.innerHTML ="Losses: " + loseCount;
              winCountText.innerHTML = "Wins: "+winCount;
            }

            rightGuessText.innerHTML=lettersArray.join(' ');
            wrongGuessText.innerHTML = wrongLetters.join(' ');  
            guessesRemainingText.innerHTML = guessesRemaining;
      }
}

game();