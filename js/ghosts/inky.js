class Inky extends Ghost {
  constructor(game) {
    super(game.world);
    this.x = INKY_INIT_POS[0];
    this.y = INKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;

    this.frame_sets = {
      right: [103, 104],
      down: [105, 106],
      left: [107, 108],
      up: [109, 110],
      frightened: [122, 120, 121, 119],
      returning_right: [111, 112],
      returning_down: [113, 114],
      returning_left: [115, 116],
      returning_up: [117, 118],
    };
    Animator.call(this, this.frame_sets["up"]);
  }

  getOutHome() {
    this.makeSequence(["up", "right", "up"]);
    if (this.y <= POS_CONSIDERED_OUT_HOME[1]) {
      this.in_home = false;
      this.game.closeHome();
      this.speed = 1;
      this.current_sequence = [];
      this.dir = "left";
    }
  }

  inChaseMode(pacman) {
    let pacman_position = [...pacman.getPositionAsTile()];
    let blinky_position = this.game.blinky.getPositionAsTile();
    if (pacman.dir == "up") {
      pacman_position[0] -= 2;
      if (pacman_position[0] < 0) pacman_position[0] = 0;
    } else if (pacman.dir == "down") {
      pacman_position[0] += 2;
      if (pacman_position[0] > NROWS - 1) pacman_position[0] = NROWS - 1;
    } else if (pacman.dir == "left") {
      pacman_position[1] -= 2;
      if (pacman_position[1] < 0) pacman_position[1] = 0;
    } else if (pacman.dir == "right") {
      pacman_position[1] += 2;
      if (pacman_position[1] > NCOLS - 1) pacman_position[1] = NCOLS - 1;
    }

    let dif_rows = pacman_position[0] - blinky_position[0];
    let dif_cols = pacman_position[1] - blinky_position[1];

    this.targetTile = [...pacman_position];
    this.targetTile[0] += dif_rows;
    this.targetTile[1] += dif_cols;
    if (this.targetTile[0] > NROWS - 1) this.targetTile[0] = NROWS - 1;
    if (this.targetTile[1] > NCOLS - 1) this.targetTile[1] = NCOLS - 1;
    if (this.targetTile[0] < 0) this.targetTile[0] = 0;
    if (this.targetTile[1] < 0) this.targetTile[1] = 0;

    if (this.behaviour != "chase") {
      this.reverseDir();
      this.behaviour = "chase";
    }
  }

  inScatterMode() {
    this.behaviour = "scatter";
    this.targetTile = [...INKY_SCATTER_MODE_TARGET];
    if (this.behaviour != "scatter") {
      this.reverseDir();
      this.behaviour = "scatter";
    }
  }
}
