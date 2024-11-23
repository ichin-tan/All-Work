const diceElements = Array.from(document.querySelectorAll('.dice'));
const scoreElement = document.getElementById('score');

// Function to generate random dice rolls
function rollDice() {
    // Generate random dice rolls
    const rolls = diceElements.map(() => Math.floor(Math.random() * 6) + 1);
  
    // Display the rolls on the dice elements
    for (let i = 0; i < diceElements.length; i++) {
      diceElements[i].textContent = rolls[i];
    }
  
    // Calculate and update the score
    const score = calculateScore(rolls);
    scoreElement.textContent = score;
  
    // Check win/lose conditions
    if (score >= 100) {
      alert('Congratulations! You won!');
      resetGame();
    } else if (rolls.includes(1)) {
      alert('Oops! You rolled a 1. Game over!');
      resetGame();
    }
}
// Function to calculate the score

function calculateScore(rolls) {
  // TODO: Implement the scoring logic
  // This function should return the total score based on the dice rolls.
  // Refer to the rules of the Ferengi Game of Daboo to determine the scoring logic.
  // You can use conditional statements, loops, and other JavaScript features to calculate the score.
  // Feel free to define additional helper functions if needed.
  let score = 0;
  
  // Calculate the score based on the dice rolls
  // You need to implement the scoring rules of the Ferengi Game of Daboo here.

  // Example scoring logic (modify according to the game rules):
  for (const roll of rolls) {
    if (roll === 1) {
      score += 10;
    } else if (roll === 6) {
      score += 6;
    } else {
      score += roll;
    }
  }

  return score;

}

// Function to reset the game
function resetGame() {
    // Reset dice rolls
    for (const diceElement of diceElements) {
      diceElement.textContent = '';
    }
  
    // Reset the score
    scoreElement.textContent = '0';
}

// Event listener for the "Roll Dice" button
const rollButton = document.getElementById('roll-button');
rollButton.addEventListener('click', rollDice);

// Event listener for the "Enter" key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    rollDice();
  }
});