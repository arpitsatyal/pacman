/*
Class for objects that move with ujn path
*/
class Mobile {
  constructor(world) {
    this.next_dir = ""; // desired address
    this.dir = ""; //current movement direction
    this.path = world.path;
  }
  /*

We check if we can move to the indicated position
*/
  checkNextPosition(dir) {
    let next_x = this.x;
    let next_y = this.y;
    let offset_x = 24; //an offset to match canvas grids for map and canvas for path
    let offset_y = 0;
    if (dir == "left") {
      next_x -= this.speed;
    } else if (dir == "right") {
      next_x += this.speed;
    } else if (dir == "up") {
      next_y -= this.speed;
    } else if (dir == "down") {
      next_y += this.speed;
    }
    let pixel = this.path.getImageData(
      next_x + offset_x,
      next_y + offset_y,
      1,
      1
    ); //+1 is because the position starts at 0 and the function starts at 1
    if (
      pixel.data[0] == PATH_COLOR_R &&
      pixel.data[1] == PATH_COLOR_G &&
      pixel.data[2] == PATH_COLOR_B
    ) {
      return true;
    } else return false;
  }

  /*
We check if we can move to the indicated position or, failing that, we are testing with smaller displacements.
Returns the number of pixels that was finally able to move.
Returns 0 if it cannot scroll.
*/
  checkNextPositionTry(dir) {
    let offset_x = 24; //an offset to match canvas grids for map and canvas for path
    let offset_y = 0;
    let speed_to_try = this.speed; // we test with the largest possible displacement first

    while (speed_to_try > 0) {
      let next_x = this.x;
      let next_y = this.y;

      if (dir == "left") {
        next_x -= speed_to_try;
      } else if (dir == "right") {
        next_x += speed_to_try;
      } else if (dir == "up") {
        next_y -= speed_to_try;
      } else if (dir == "down") {
        next_y += speed_to_try;
      }

      let pixel = this.path.getImageData(
        next_x + offset_x,
        next_y + offset_y,
        1,
        1
      ); 
      if (
        pixel.data[0] == PATH_COLOR_R &&
        pixel.data[1] == PATH_COLOR_G &&
        pixel.data[2] == PATH_COLOR_B
      ) {
        return speed_to_try;
      }
      speed_to_try--;
    }
    return 0;
  }

  moveLeft() {
    let can = this.checkNextPositionTry("left");
    if (can > 0) {
      this.x -= can;
        this.changeFrameSet(this.frame_sets["left"], "loop");
      if (this.x < -23)
        //if we enter the tuner on the left
        this.x = SCREEN_WIDTH;
    } else {
      this.mode = "pause";
    }
  }

  moveRight() {
    let can = this.checkNextPositionTry("right");
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
    let can = this.checkNextPositionTry("up");
    if (can > 0) {
      this.y -= can;
      if (this.behaviour != "frightened" && this.behaviour != "returning")
        this.changeFrameSet(this.frame_sets["up"], "loop");
      else if (this.behaviour == "returning")
        this.changeFrameSet(this.frame_sets["returning_up"], "loop");
    } else this.mode = "pause";
  }

  moveDown() {
    let can = this.checkNextPositionTry("down");
    if (can > 0) {
      this.y += can;
      if (this.behaviour != "frightened" && this.behaviour != "returning")
        this.changeFrameSet(this.frame_sets["down"], "loop");
      else if (this.behaviour == "returning")
        this.changeFrameSet(this.frame_sets["returning_down"], "loop");
    } else this.mode = "pause";
  }

  /*
If you have a pending change of address, check if it is possible and in
If so, make this change.
*/
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
