/*
Class that manages the game controls, contains a button object for each key that
manages.
*/
function Controller() {
  this.down = new Controller.ButtonInput();
  this.left = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up = new Controller.ButtonInput();

  this.handleKeyDownUp = function (event) {
    let down;
    if (event.type == "keydown") down = true;
    else down = false;

    switch (event.keyCode) {
      case 37:
        this.left.getInput(down);
        break;
      case 38:
        this.up.getInput(down);
        break;
      case 39:
        this.right.getInput(down);
        break;
      case 40:
        this.down.getInput(down);
        break;
    }
  };
}

Controller.ButtonInput = function () {
  this.active = false;
};

Controller.ButtonInput.prototype.getInput = function (down) {
  if (this.active != down) this.active = down;
};
