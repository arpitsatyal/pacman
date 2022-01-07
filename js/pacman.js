class Pacman extends Travel {
  constructor(world) {
    super(world);
    this.x = PACMAN_INIT_POS[0];
    this.y = PACMAN_INIT_POS[1];
    this.speed = 1;
    this.mode = "loop";

    this.frame_sets = {
      right: [0, 1],
      left: [2, 3],
      up: [4, 5],
      down: [6, 7],
      die: [123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133],
    };
    Animator.call(this, this.frame_sets["right"], 10);
  }

  /* Performs all the actions of its life cycle  */
  live(game, controller) {
    this.changeDir();
    this.move();
    this.eatBall(game);
    this.reaction2Keys(controller);
  }

  /* Perform the movement based on its current established direction */
  move() {
    if (this.dir == "left") this.moveLeft();
    else if (this.dir == "right") this.moveRight();
    else if (this.dir == "up") this.moveUp();
    else if (this.dir == "down") this.moveDown();
  }

  /* React to keystrokes */
  reaction2Keys(controller) {
    if (controller.left.active && this.checkNextPosition("left"))
      this.dir = "left";
    else if (controller.left.active) {
      this.next_dir = "left";
    } else if (controller.right.active && this.checkNextPosition("right"))
      this.dir = "right";
    else if (controller.right.active) {
      this.next_dir = "right";
    } else if (controller.up.active && this.checkNextPosition("up"))
      this.dir = "up";
    else if (controller.up.active) {
      this.next_dir = "up";
    } else if (controller.down.active && this.checkNextPosition("down"))
      this.dir = "down";
    else if (controller.down.active) {
      this.next_dir = "down";
    }
  }

  /* Consume a ball if it exists in your position. */
  eatBall(game) {
    game.world.balls.setBall(this.x, this.y, 0);
  }
  /*

Get the current position as a tile.
Returns the tile as an array of row coordinates, col
*/
  getPositionAsTile() {
    let col = Math.floor(this.x / TILE_SIZE) + 1;
    let row = Math.floor(this.y / TILE_SIZE) + 1;
    return [row, col];
  }
  die(game){
    //death animation
    this.dir = "";
    this.next_dir = "";
    this.changeFrameSet(this.frame_sets["die"], "loop" );
    this.blocked = true;
}
}
