class Pinky{
  constructor(game) {
    this.x = PINKY_INIT_POS[0];
    this.y = PINKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    
    this.frame_sets = {
      right: [87, 88],
      down: [89, 90],
      left: [91, 92],
      up: [93, 94],
      frightened: [119, 120, 121, 122],
      returning_right: [111, 112],
      returning_down: [113, 114],
      returning_left: [115, 116],
      returning_up: [117, 118],
    };

    Animator.call(this, this.frame_sets["up"], 10);
  }
}
