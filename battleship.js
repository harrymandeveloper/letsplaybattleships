// A test location for a ship while we check the code is working.
var location1 = 3;
var location2 = 4;
var location3 = 5;

var guess;
var hits = 0;
var guesses = 0;

var isSunk = false;

// A Boolean that is set to true once a ship has been sunk.
// Guesses are added to, even if the guess is incorrect, meaning 'a miss'.

while (isSunk === false) {
  guess = prompt("Prepare to fire! (Enter a number from 0-6):");
  if (guess < 0 || guess > 6) {
    alert("Oh my, please try again and enter a number between 1 and 6!");
  } else {
    guesses = guesses + 1;

    if (guess == location1 || guess == location2 || guess == location3) {
      alert("Hit!");
      hits = hits + 1;

      if (hits === 3) {
        isSunk = true;
        alert("You sank my cruiser!");
      }
    } else { 
        alert("Miss!")
    } 
  }
}

var stats =
  "You took " +
  guesses +
  " guesses to sink a cruiser, " +
  "which means your shooting accuracy was " +
  3 / guesses * 100 + "%";

alert(stats);
