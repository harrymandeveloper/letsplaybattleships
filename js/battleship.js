let view = {
  displayMessage: function (msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function (location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

let model = {
  // Board size here is 7 x 7.
  // Recommended number ships is 3.
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    {
      // Equivalent to A6, B6 and C6
      locations: ["06", "16", "26"],
      hits: ["", "", ""],
    },
    {
      // Equivalent to D2, D3 and D4
      locations: ["32", "33", "34"],
      hits: ["", "", ""],
    },
    {
      // Equivalent to G3, G4 and G5
      locations: ["63", "64", "65"],
      hits: ["", "", ""],
    },
  ],

  fire: function (guess) {
    for (let i = 0; i < this.numShips; i += 1) {
      let ships = this.ships[i];
      let index = ships.locations.indexOf(guess);
      // So if the indexOf here returns -1 then there are no matches.

      if (index >= 0) {
        ships.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Hit!");

        if (this.isSunk(ships)) {
          view.displayMessage("You sank one of my cruisers!");
          this.shipsSunk += 1;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },

  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
};

// Test guesses
// model.fire("53");
// model.fire("06");

let controller = {
  guesses: 0,

  processGuess: function (guess) {
    let location = parseGuess(guess);
    if (location) {
      this.guesses += 1;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          "You sank all my battleships, in " +
            this.guesses +
            " guesses. Your shots were " +
            Math.floor(((model.numShips * model.shipLength) / this.guesses)  * 100) +
            "% accurate"
        );
      }
    }
  },
};

function parseGuess(guess) {
  let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length !== 2) {
    alert(
      "Please try again and enter a letter followed by number on the board."
    );
  } else {
    // Converts the guess into a number
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let column = guess.charAt(1);
    if (isNaN(row) || isNaN(column)) {
      alert("Sorry, that space isn't on the board.");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert(
        "Sorry, try typing another entry without sneezing this time – your guess was off the board and off the chart!"
      );
    } else {
      return row + column;
    }
  }
}

window.onload = init;

function handleFireButton() {
  let guessInput = document.getElementById("guessInput"); 
  let guess = guessInput.value.toUpperCase(); 
  controller.processGuess(guess);

  // Reset to empty when a value is entered
  guessInput.value = "";
}


function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
}

function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}
