function Inky(game) {
  this.x = INKY_INIT_POS[0];
  this.y = INKY_INIT_POS[1];
  this.game = game;
  this.speed = 1;

  this.frame_sets = {
    right: [103, 104],
    down: [105, 106],
    left: [107, 108],
    up: [109, 110],
    frightened: [119, 120, 121, 122],
    returning_right: [111, 112],
    returning_down: [113, 114],
    returning_left: [115, 116],
    returning_up: [117, 118],
  };

  Animator.call(this, this.frame_sets["up"], 10);
}
