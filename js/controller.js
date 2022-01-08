/*
Class that manages the game controls such as key press.
*/
class Controller {
  constructor() {
    this.pressed = false;
    this.down;
    this.left;
    this.right;
    this.up;   
  }
  keyPressed = (event) => {
    event.type === 'keydown' ? this.pressed = true : this.pressed = false;
    switch (event.keyCode) {
      case 37:
        this.left = this.pressed;
        break;
      case 38:
        this.up = this.pressed;
        break;
      case 39:
        this.right = this.pressed;
        break;
      case 40:
        this.down = this.pressed;
        break;
    }
  }
}