class Pinky extends Ghost {
  constructor(game) {
    super(game.world);
    this.x = PINKY_INIT_POS[0];
    this.y = PINKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    this.targetTile = PINKY_SCATTER_MODE_TARGET;

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

  getOutHome() {
    // this.makeSequence(["up"]);
    if (this.y <= POS_CONSIDERED_OUT_HOME[1]) {
      //if we have completed the sequence
      this.in_home = false;
      this.game.closeHome();
      this.speed = 1;
      // this.current_sequence = [];
      this.dir = "left";
    }
  }

  inChaseMode(pacman) {
    // console.log('ponyk chase')
    // its target is placed 4 tiles ahead of pacman
    this.targetTile = [...pacman.getPositionAsTile()];
    if (pacman.dir == "up") {
      this.targetTile[0] -= 4;
      if (this.targetTile[0] < 0) this.targetTile[0] = 0;
    } else if (pacman.dir == "down") {
      this.targetTile[0] += 4;
      if (this.targetTile[0] > NROWS - 1) this.targetTile[0] = NROWS - 1;
    } else if (pacman.dir == "left") {
      this.targetTile[1] -= 4;
      if (this.targetTile[1] < 0) this.targetTile[1] = 0;
    } else if (pacman.dir == "right") {
      this.targetTile[1] += 4;
      if (this.targetTile[1] > NCOLS - 1) this.targetTile[1] = NCOLS - 1;
    }
    if (this.behaviour != "chase") {
      this.reverseDir();
      this.behaviour = "chase";
    }
  }

  inScatterMode() {
    // console.log('pinky scttr')
    this.behaviour = "scatter";
    this.targetTile = [...PINKY_SCATTER_MODE_TARGET];
    if (this.behaviour != "scatter") {
      this.reverseDir();
      this.behaviour = "scatter";
    }
  }
}
