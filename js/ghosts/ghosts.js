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

    if (this.inHomeEntrance() && this.behaviour == "returning") {
      this.dir = "left";
      this.behaviour = "";
    }

    this.changeDir();
    this.move();

    this.in_home
      ? this.behaviour === "waiting"
        ? this.rebound()
        : this.getOutHome()
      : this.think();
  }

  /**
Change the mode of the ghosts according to the wave that corresponds to the elapsed time
*/
  applyBehaviourWaves(game) {
    if (game.currentLevel === 1) {
      //wave 1
      if (game.frames_rendered >= 1 && game.frames_rendered <= 7 * FPS)
        this.inScatterMode(game.pacman);
      else if (
        game.frames_rendered > 7 * FPS &&
        game.frames_rendered < 27 * FPS
      )
        this.inChaseMode(game.pacman);
      //wave 2
      else if (
        game.frames_rendered >= 27 * FPS &&
        game.frames_rendered < 32 * FPS
      )
        this.inScatterMode(game.pacman);
      else if (
        game.frames_rendered > 32 * FPS &&
        game.frames_rendered < 52 * FPS
      )
        this.inChaseMode(game.pacman);
      //wave 3
      else if (
        game.frames_rendered >= 52 * FPS &&
        game.frames_rendered < 58 * FPS
      )
        this.inScatterMode(game.pacman);
      else if (
        game.frames_rendered > 58 * FPS &&
        game.frames_rendered < 78 * FPS
      )
        this.inChaseMode(game.pacman);
      //wave 4
      else if (
        game.frames_rendered >= 78 * FPS &&
        game.frames_rendered < 84 * FPS
      )
        this.inScatterMode(game.pacman);
      else if (game.frames_rendered > 84 * FPS) this.inChaseMode(game.pacman);

      // LEVEL 2 //
    } else if (game.currentLevel === 2) {
      FRIGHTENED_DURATION = 4;
      if (game.frames_rendered >= 1 && game.frames_rendered <= 7 * FPS)
        this.inScatterMode(game.pacman);
      else if (
        game.frames_rendered > 7 * FPS &&
        game.frames_rendered < 27 * FPS
      )
        this.inChaseMode(game.pacman);
      //wave 2
      else if (
        game.frames_rendered >= 27 * FPS &&
        game.frames_rendered < 32 * FPS
      )
        this.inScatterMode(game.pacman);
      else if (
        game.frames_rendered > 32 * FPS &&
        game.frames_rendered < 52 * FPS
      )
        this.inChaseMode(game.pacman);
      //wave 3
      else if (game.frames_rendered >= 52 * FPS) this.inChaseMode(game.pacman);
        // LEVEL 3
    } else if (game.currentLevel === 3) {
      FRIGHTENED_DURATION = 0;
      //wave 1
      if (game.frames_rendered >= 1 && game.frames_rendered <= 7 * FPS)
        this.inScatterMode(game.pacman);
      else if (
        game.frames_rendered > 7 * FPS &&
        game.frames_rendered < 27 * FPS
      )
        this.inChaseMode(game.pacman);
      //wave 2
      else if (
        game.frames_rendered >= 27 * FPS &&
        game.frames_rendered < 32 * FPS
      )
        this.inScatterMode(game.pacman);
      else if (game.frames_rendered > 32 * FPS) this.inChaseMode(game.pacman);
    } else {
      //end the game
        game.game_over_notification = true;
        game.paused = true;
    }
  }

  /**
Performs the movement based on its current established direction
*/
  move() {
    if (this.dir == "left") this.moveLeft();
    else if (this.dir == "right") this.moveRight();
    else if (this.dir == "up") this.moveUp();
    else if (this.dir == "down") this.moveDown();
  }

  /*
Think about where you want to go based on the position of pacman

*/
  think() {
    if (this.inDecisionPoint() && !this.has_decided) {
      if (this.behaviour == "frightened") {
        // in this mode it chooses the addresses randomly.
        this.next_dir = this.getRandomDir();
        this.has_decided = true;
      } else {
        this.next_dir = this.getShortestStrightPath();
      }
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

  /**
Function that changes direction between up and down continuously each time it collides
inside home. While you wait.
*/
  rebound() {
    let can_up = this.checkNextPosition("up");
    let can_down = this.checkNextPosition("down");
    if (can_up && this.dir != "down") {
      this.dir = "up";
    } else if (can_up && this.dir == "up") {
      this.dir = "up";
    } else if (can_down && this.dir == "down") this.dir = "down";
    else if (!can_up) {
      this.dir = "down";
    } else if (!can_down) {
      this.dir = "up";
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
    return dirs[random_index];
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

  /*

Check if current position is a decision point
*/
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
Check if the current position is the entrance to home plate
*/
  inHomeEntrance() {
    if (this.x == POS_CONSIDERED_OUT_HOME[0] && this.y >= 126 && this.y <= 157)
      return true;
    return false;
  }

  /**

  It performs the sequence of direction changes indicated as an array of strings.
  ex: ["left", "up", "left"]
  */
  makeSequence(sequence) {
    if (this.current_sequence.length == 0)
      this.current_sequence = [...sequence]; //if it is the first invocation we load the sequence in the ghost
    if (this.next_dir == "" || this.mode == "pause") {
      let dir = this.current_sequence.shift();
      this.next_dir = dir;
    }
  }

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
  getShortestStrightPath() {
    /*Among the valid adjacencies (which are path) we choose the one that provides the shortest straight line to the target.
    We return a tile object*/
    let distances = [];

    let pos = this.getPositionAsTile();

    if (this.isSpecialPoint(pos)) {
      //forbidden to go up in these tiles, according to original game
      if (this.dir == "left") return "left";
      else if (this.dir == "right") return "right";
    }

    //it is not worth going back the way you came
    if (this.isValidPoint([pos[0] - 1, pos[1]]) && this.dir != "down")
      distances.push({ dir: "up", value: this.distanceFromAdjacentTile("up") }); //mathi bata ko shortest distance
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

  /*
Distance in px from tile A to another tile B. Using Pythagoras theorem.
*/
  distanceFromTile2Tile = (a, b) =>
    Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));

  valueInRange(value, min, max) {
    return value >= min && value <= max;
  }

  collides(pacmanX, pacmanY) {
    let xOverlap =
      this.valueInRange(pacmanX + 20, this.x + 20, this.x + 35) ||
      this.valueInRange(this.x + 20, pacmanX + 20, pacmanX + 35);

    let yOverlap =
      this.valueInRange(pacmanY + 20, this.y + 20, this.y + 35) ||
      this.valueInRange(this.y + 20, pacmanY + 20, pacmanY + 35);

    return xOverlap && yOverlap;
  }
}
