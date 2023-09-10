const correctNum = Math.floor(Math.random() * 100);
let count = 0;
const maxChances = 10;
let remainingChances = maxChances;
let hintShown = false;

function vibrateInput() {
  navigator.vibrate(50);
}

document.getElementById('submit-button').addEventListener('click', function() {
  const guessedNum = parseInt(document.getElementById('guess').value);
  const resultElement = document.getElementById('result');
  const hint = document.getElementById('hint');
  const chancesElement = document.getElementById('chances');
  const victorySound = document.getElementById('victory-sound');
  const lossSound = document.getElementById('loss-sound');

  resultElement.style.display = 'none';
  hint.style.display = 'none';
  chancesElement.style.display = 'none';

  if (!isNaN(guessedNum)) {
    remainingChances--;

    if (guessedNum === correctNum) {
      resultElement.innerHTML = 'Congratulations! You guessed the correct number: ' + correctNum;
      hint.innerHTML = 'Hint: You got it!';
      chancesElement.innerHTML = '';
      document.getElementById('guess').disabled = true;
      this.disabled = true;
      victorySound.play();
    } else if (guessedNum > correctNum) {
      resultElement.innerHTML = 'You guessed a bigger number. Try again.';
      count++;
    } else if (guessedNum < correctNum) {
      resultElement.innerHTML = 'You guessed a smaller number. Try again.';
      count++;
    }

    if (count >= 4) {
      const difference = Math.abs(correctNum - guessedNum);
      if (difference >= 20) {
        hint.innerHTML = 'Hint: You are very far away from the actual number.';
      } else if (difference >= 10) {
        hint.innerHTML = 'Hint: You are getting closer to the actual number.';
      } else {
        hint.innerHTML = 'Hint: You are very close to the correct number.';
      }
      hintShown = true;
      hint.style.display = 'block';
    }

    if (remainingChances === 0) {
      resultElement.innerHTML = 'You have used all your chances. The correct number was ' + correctNum + '.';
      hint.innerHTML = 'The correct number was ' + correctNum + '.';
      chancesElement.innerHTML = '';
      document.getElementById('guess').disabled = true;
      this.disabled = true;
      lossSound.play();
    } else {
      resultElement.style.display = 'block';
      chancesElement.style.display = 'block';
      chancesElement.innerHTML = 'Chances remaining: ' + remainingChances;
    }
  } else {
    resultElement.innerHTML = 'Please enter a valid number.';
    resultElement.style.display = 'block';
  }
});
