let view = {

  displayMessage: function(msg){
    let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },

};


view.displayMiss("00"); 
view.displayHit("34"); 
view.displayMiss("55"); 
view.displayHit("12"); 
view.displayMiss("25"); 
view.displayHit("26");

view.displayMessage("This is a test of the hit or miss alert system");

// ====

// Below is the old code for version 1.0, which will need to be deleted once the MVC update is complete.

// let randomLoc = Math.floor(Math.random() * 5);

// let location1 = randomLoc;
// let location2 = location1 + 1;
// let location3 = location2 + 1;

// let guess = undefined;
// let hits = 0;
// let guesses = 0;

// let isSunk = false;

// // A Boolean that is set to true once a ship has been sunk.
// // Guesses are added to, even if the guess is incorrect, meaning 'a miss'.

// while (isSunk === false) {
//   guess = prompt("Prepare to fire! (Enter a number from 0-6):");
//   if (guess < 0 || guess > 6) {
//     alert("Oh my, please try again and enter a number between 1 and 6!");
//   } else {
//     guesses = guesses + 1;

//     if (guess == location1 || guess == location2 || guess == location3) {
//       alert("Hit!");
//       hits = hits + 1;

//       if (hits === 3) {
//         isSunk = true;
//         alert("You sank my cruiser!");
//       }
//     } else { 
//         alert("Miss!")
//     } 
//   }
// }

// let stats =
//   "You took " +
//   guesses +
//   " guesses to sink all my battleships. " +
//   "Your shots were " +
//   3 / guesses * 100 + "% accurate";

// alert(stats);
