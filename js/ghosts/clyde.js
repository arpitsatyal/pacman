class Clyde extends Ghost {
  constructor(game) {
    super(game.world);
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

  getOutHome() {
    this.makeSequence(["up", "left", "up"]);
    if (this.y <= POS_CONSIDERED_OUT_HOME[1]) {
      this.in_home = false;
      this.game.closeHome();
      this.speed = 1;
      this.current_sequence = [];
      this.dir = "left";
    }
  }

  inChaseMode(pacman) {
    let distance = this.distanceFromTile2Tile(
      pacman.getPositionAsTile(),
      this.getPositionAsTile()
    );
    if (distance > 8) {
      this.targetTile = [...pacman.getPositionAsTile()];
    } else {
      this.targetTile = [...CLYDE_SCATTER_MODE_TARGET];
    }
    if (this.behaviour != "chase") {
      this.reverseDir();
      this.behaviour = "chase";
    }
  }

  inScatterMode() {
    this.behaviour = "scatter";
    this.targetTile = [...CLYDE_SCATTER_MODE_TARGET];
    if (this.behaviour != "scatter") {
      this.reverseDir();
      this.behaviour = "scatter";
    }
  }
}
