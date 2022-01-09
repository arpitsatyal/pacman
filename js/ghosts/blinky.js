class Blinky extends Ghost {
  
  constructor(game) {
    super(game.world);
    this.x = BLINKY_INIT_POS[0];
    this.y = BLINKY_INIT_POS[1];
    this.game = game;
    this.speed = 1;
    this.targetTile = BLINKY_SCATTER_MODE_TARGET;

    this.in_home = false;
    this.behaviour = "";

    this.frame_sets = {
      right: [95, 96],
      down: [97, 98],
      left: [99, 100],
      up: [101, 102],
      frightened: [119, 120, 121, 122],
      returning_right: [111, 112],
      returning_down: [113, 114],
      returning_left: [115, 116],
      returning_up: [117, 118],
    };
    Animator.call(this, this.frame_sets["up"], 10);

  }

  getOutHome(){
    this.makeSequence(["up"]);
    if(this.y <= POS_CONSIDERED_OUT_HOME[1]) 
    {
        this.in_home = false;
        this.game.closeHome();
        this.current_sequence = [];
        this.dir = "left";
    }    
}

  inChaseMode(pacman) {
    this.targetTile = [...pacman.getPositionAsTile()];
    if (this.behaviour != "chase") {
      this.reverseDir();
      this.behaviour = "chase";
    }
  }

  inScatterMode() {
    this.behaviour = "scatter";
    this.targetTile = [...BLINKY_SCATTER_MODE_TARGET];
    if (this.behaviour != "scatter") {
      this.reverseDir();
      this.behaviour = "scatter";
    }
  }
}
