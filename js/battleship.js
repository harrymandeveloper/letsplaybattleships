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
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] } 
  ],
    

  fire: function (guess) {
    for (let i = 0; i < this.numShips; i += 1) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      // So if the indexOf here returns -1 then there are no matches.
      if (ship.hits[index] === "hit") {
        view.displayMessage("Oops, you already hit that location!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Hit!");

        if (this.isSunk(ship)) {
          view.displayMessage("You sank a cruiser!");
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

  generateShip: function() {

    let direction = Math.floor(Math.random() * 2);
    let row, col;
    if (direction === 1) {
      // x axis - Remember starting column has to be big enough to accommodate horizontal ships
      // so we use a number that takes the size of the board and subtracts the ship length
      // before being multiplied, to give us a random number between 1 and the length of the ship plus one.
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {
      // y axis - As above, remember to make it large enough for ships placed vertically.
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i += 1) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function (locations) {
    for (let i = 0; i < this.numShips; i+=1) {
      let ship = this.ships[i];
      for (let j = 0; j < locations.length; j+=1) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  },

  generateShipLocations: function () {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
    console.log("Ships array: ");
    console.log(this.ships);
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
          "You sank every battleship in " +
            this.guesses +
            " guesses." + "<br />" + "Your shots were " +
            Math.floor(((model.numShips * model.shipLength) / this.guesses)  * 100) +
            "% accurate."
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
guessInput.focus();

function handleFireButton() {
  let guessInput = document.getElementById("guessInput"); 
  let guess = guessInput.value.toUpperCase(); 
  controller.processGuess(guess);

  // Reset to empty when a value is entered
  guessInput.value = "";
  guessInput.focus();
}


function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  let guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
  model.generateShipLocations();
  guessInput.focus();
}

function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

