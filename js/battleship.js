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


