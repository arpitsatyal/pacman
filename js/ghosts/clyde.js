function Clyde(game) {
  this.x = CLYDE_INIT_POS[0];
  this.y = CLYDE_INIT_POS[1];
  this.game = game;
  this.speed = 1;

  this.frame_sets = {
    right: [79, 80],
    down: [81, 82],
    left: [83, 84],
    up: [85, 86],
    frightened: [119, 120, 121, 122],
    returning_right: [111, 112],
    returning_down: [113, 114],
    returning_left: [115, 116],
    returning_up: [117, 118],
  };

  Animator.call(this, this.frame_sets["up"], 10);
}
