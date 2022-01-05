class Ghost extends Travel {
  constructor(world) {
    super(world);
    this.mode = "loop";
    this.behaviour = "waiting"; //scatter, chase, frightened, waiting, returning, entering
    this.in_home = true;
    this.current_sequence = [];

    this.dir = "left"; //initially all go to the left
    this.logical_map = world.logical_map;
    this.has_decided = false;
  }
  /**
 Performs all the actions of its life cycle
 */
  live(game) {
    if (
      !this.in_home &&
      this.behaviour != "frightened" &&
      this.behaviour != "returning"
    )
      this.applyBehaviourWaves(game);

    this.changeDir();
    this.move();
    this.think();
  }

  /* Change the mode of the ghosts according to the wave that corresponds to the elapsed time */

  applyBehaviourWaves(game) {
    //wave 1
    if (game.frames_rendered >= 1 && game.frames_rendered <= 7 * FPS)
      this.inScatterMode(game.pacman);
    else if (game.frames_rendered > 7 * FPS && game.frames_rendered < 27 * FPS)
      this.inChaseMode(game.pacman);
  }

  /* Performs the movement based on its current established direction */

  move() {
    if (this.dir == "left") this.moveLeft();
    else if (this.dir == "right") this.moveRight();
    else if (this.dir == "up") this.moveUp();
    else if (this.dir == "down") this.moveDown();
  }

  /* Think about where you want to go based on the position of pacman */

  think() {
    if (this.inDecisionPoint() && !this.has_decided) {
      // if (this.behaviour == "frightened") {
        // in this mode it chooses the addresses randomly.
        this.next_dir = this.getRandomDir();
        this.has_decided = true;
      // } else {
        // this.next_dir = this.getShortestStrightPath();
      // }
    } else if (!this.inDecisionPoint()) {
      this.has_decided = false;
      if (this.mode == "pause") {
        //If it is stuck in a corner, it looks for the only possible path and follows it.
        let pos = this.getPositionAsTile();
        if (this.isValidPoint([pos[0] - 1, pos[1]]) && this.dir != "down") {
          //it is not worth going back the way you came
          this.dir = "up";
          this.mode = "loop";
        } else if (
          this.isValidPoint([pos[0] + 1, pos[1]]) &&
          this.dir != "up"
        ) {
          this.dir = "down";
          this.mode = "loop";
        } else if (
          this.isValidPoint([pos[0], pos[1] - 1]) &&
          this.dir != "right"
        ) {
          this.dir = "left";
          this.mode = "loop";
        } else if (
          this.isValidPoint([pos[0], pos[1] + 1]) &&
          this.dir != "left"
        ) {
          this.dir = "right";
          this.mode = "loop";
        }
      }
    }
  }

  /*
  Choose the address randomly
  Returns up, down, left or right;
  */
  getRandomDir() {
    let pos = this.getPositionAsTile();
    let random_index = Math.floor(Math.random() * 2);
    let dirs = [];
    if (this.isValidPoint([pos[0] - 1, pos[1]]) && this.dir != "down")
      dirs.push("up");
    if (this.isValidPoint([pos[0] + 1, pos[1]]) && this.dir != "up")
      dirs.push("down");
    if (this.isValidPoint([pos[0], pos[1] - 1]) && this.dir != "right")
      dirs.push("left");
    if (this.isValidPoint([pos[0], pos[1] + 1]) && this.dir != "left")
      dirs.push("right");
    //here we will have selected two addresses
    return dirs[random_index];
  }

  /*
  Calculate which way to go at an intersection, choosing the
  shortest way in a straight line.
  Returns up, down, left or right.
  */

  getShortestStrightPath() {

    /*
    Among the valid adjacencies (which are path) we choose the one that provides the shortest straight line to the target.
    We return a tile object */

    let distances = [];

    let pos = this.getPositionAsTile();

    if (this.isSpecialPoint(pos)) {
      //forbidden to go up in these tiles, according to original game
      if (this.dir == "left") return "left";
      else if (this.dir == "right") return "right";
    }

    //it is not worth going back the way you came
    if (this.isValidPoint([pos[0] - 1, pos[1]]) && this.dir != "down")
      distances.push({ dir: "up", value: this.distanceFromAdjacentTile("up") });
    if (this.isValidPoint([pos[0] + 1, pos[1]]) && this.dir != "up")
      distances.push({
        dir: "down",
        value: this.distanceFromAdjacentTile("down"),
      });
    if (this.isValidPoint([pos[0], pos[1] - 1]) && this.dir != "right")
      distances.push({
        dir: "left",
        value: this.distanceFromAdjacentTile("left"),
      });
    if (this.isValidPoint([pos[0], pos[1] + 1]) && this.dir != "left")
      distances.push({
        dir: "right",
        value: this.distanceFromAdjacentTile("right"),
      });

    distances.sort((a, b) => {
      if (a.value == b.value) {
        //at equal distance it is chosen in the following order: up> left> down
        if (a.dir == "right")
          //we don't want the right to be the first option
          return 1;
        else if (a.dir == "up" && b.dir == "left") return -1;
        else if (a.dir == "left" && b.dir == "down") return -1;
        else return 1;
      } else return a.value - b.value;
    });

    return distances[0].dir;
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

  /* Check if current position is a decision point */
  inDecisionPoint() {
    let tile = this.getPositionAsTile();
    if (
      this.logical_map[tile[0] * NCOLS + tile[1]] == 2 ||
      this.logical_map[tile[0] * NCOLS + tile[1]] == 3
    )
      return true;
    return false;
  }

  /*
  Distance in a straight line from an adjacent tile ("up", "down", "left" or "right")
  from the current position to the targetTile.
  */
  distanceFromAdjacentTile(adj) {
    let pos = this.getPositionAsTile();
    switch (adj) {
      case "up":
        pos[0]--;
        break;
      case "down":
        pos[0]++;
        break;
      case "left":
        pos[1]--;
        break;
      case "right":
        pos[1]++;
        break;
    }
    return this.distanceFromTile2Tile(pos, this.targetTile);
  }

  /* Distance in px from tile A to another tile B. Using Pythagoras theorem. */
  distanceFromTile2Tile = (a, b) => Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));

  /**
  Make a change to the opposite direction.
  We use it in behavior mode change.
  */
  reverseDir() {
    //we send it where it came from
    let pos = this.getPositionAsTile();
    if (this.isValidPoint([pos[0] - 1, pos[1]]) && this.dir == "down")
      this.dir = "up";
    else if (this.isValidPoint([pos[0] + 1, pos[1]]) && this.dir == "up")
      this.dir = "down";
    else if (this.isValidPoint([pos[0], pos[1] - 1]) && this.dir == "right")
      this.dir = "left";
    else if (this.isValidPoint([pos[0], pos[1] + 1]) && this.dir == "left")
      this.dir = "right";
  }
}
