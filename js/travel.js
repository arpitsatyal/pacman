/*
Class for objects that move with in the path
*/
class Travel {
  constructor(world) {
    this.next_dir = ""; // desired address
    this.dir = ""; //current movement direction
    this.path = world.path;
    this.logical_map = world.logical_map;
  }
  /*

We check if we can move to the indicated position
*/
  checkNextPosition(dir) {
    let next_x = this.x + 24;
    let next_y = this.y;

    if (dir == "left") {
      next_x -= this.speed;
    } else if (dir === "right") {
      next_x += this.speed;
    } else if (dir === "up") {
      next_y -= this.speed;
    } else if (dir === "down") {
      next_y += this.speed;
    }

    let pixel = this.path.getImageData(next_x, next_y, 1, 1); 
    if (
      pixel.data[0] === PATH_COLOR_R &&
      pixel.data[1] === PATH_COLOR_G &&
      pixel.data[2] === PATH_COLOR_B
    ) {
      return true;
    } else return false;
  }

  isValidPoint(tile) {
    if (
      this.logical_map[tile[0] * NCOLS + tile[1]] == 1 ||
      this.logical_map[tile[0] * NCOLS + tile[1]] == 2 ||
      this.logical_map[tile[0] * NCOLS + tile[1]] == 3
    )
      return true;
    return false;
  }

  /*

Check if the tile contains a special decision point
*/
  isSpecialPoint(tile) {
    if (this.logical_map[tile[0] * NCOLS + tile[1]] == 3) return true;
    return false;
  }

  moveLeft() {
    let can = this.checkNextPosition("left");
    if (can > 0) {
      this.x -= can;
      if (this.behaviour != "frightened" && this.behaviour != "returning")
        this.changeFrameSet(this.frame_sets["left"], "loop");
      else if (this.behaviour == "returning")
        this.changeFrameSet(this.frame_sets["returning_left"], "loop");
      if (this.x < -23)
        //if we enter the tuner on the left
        this.x = SCREEN_WIDTH;
    } else this.mode = "pause";
  }

  moveRight() {
    let can = this.checkNextPosition("right");
    if (can > 0) {
      this.x += can;
      if (this.behaviour != "frightened" && this.behaviour != "returning")
        this.changeFrameSet(this.frame_sets["right"], "loop");
      else if (this.behaviour == "returning")
        this.changeFrameSet(this.frame_sets["returning_right"], "loop");
    } else this.mode = "pause";
    if (this.x > SCREEN_WIDTH)
      //if we enter the tuner on the left
      this.x = -23;
  }

  moveUp() {
    let can = this.checkNextPosition("up");
    if (can > 0) {
      this.y -= can;
      if (this.behaviour != "frightened" && this.behaviour != "returning")
        this.changeFrameSet(this.frame_sets["up"], "loop");
      else if (this.behaviour == "returning")
        this.changeFrameSet(this.frame_sets["returning_up"], "loop");
    } else this.mode = "pause";
  }

  moveDown() {
    let can = this.checkNextPosition("down");
    if (can > 0) {
      this.y += can;
      if (this.behaviour != "frightened" && this.behaviour != "returning")
        this.changeFrameSet(this.frame_sets["down"], "loop");
      else if (this.behaviour == "returning")
        this.changeFrameSet(this.frame_sets["returning_down"], "loop");
    } else this.mode = "pause";
  }

  changeDir() {
    if (this.next_dir != "") {
      if (this.next_dir == "left" && this.checkNextPosition("left")) {
        this.dir = "left";
        this.next_dir = "";
      } else if (this.next_dir == "right" && this.checkNextPosition("right")) {
        this.dir = "right";
        this.next_dir = "";
      } else if (this.next_dir == "up" && this.checkNextPosition("up")) {
        this.dir = "up";
        this.next_dir = "";
      } else if (this.next_dir == "down" && this.checkNextPosition("down")) {
        this.dir = "down";
        this.next_dir = "";
      }
    }
  }
}
