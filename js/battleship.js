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

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");

// view.displayMessage("This is a test of the hit or miss alert system");

let model = {
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
    for (let i = 0; i < this.numShips; i+=1) {
      let ships = this.ships[i];
      let index = ship.locations.indexOf(guess);
      // So if the indexOf here returns -1 then there are no matches.
      
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess); 
        view.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          view.displayMessage("You sank one of my cruisers!");
          this.shipsSunk+=1;
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
