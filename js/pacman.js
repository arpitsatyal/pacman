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
    if (controller.left && this.checkNextPosition("left")) this.dir = "left";
    else if (controller.left) {
      this.next_dir = "left";
    } else if (controller.right && this.checkNextPosition("right"))
      this.dir = "right";
    else if (controller.right) {
      this.next_dir = "right";
    } else if (controller.up && this.checkNextPosition("up")) this.dir = "up";
    else if (controller.up) {
      this.next_dir = "up";
    } else if (controller.down && this.checkNextPosition("down"))
      this.dir = "down";
    else if (controller.down) {
      this.next_dir = "down";
    }
  }

  /*
Consume una bola si existe en su posición y aumenta la puntuación en tal caso.
*/
  eatBall(game) {
    let eated_ball = game.world.balls.setBall(this.x, this.y, 0);

    if (eated_ball == 1) {
      game.world.balls.remaining--;
    } else if (eated_ball == 2) {
      game.world.balls.remaining--;
      if (
        game.blinky.behaviour != "waiting" &&
        game.blinky.behaviour != "returning"
      ) {
        game.blinky.behaviour = "frightened";
        game.blinky.changeFrameSet(
          game.blinky.frame_sets["frightened"],
          "loop"
        );
        if (!game.blinky.timeout)
          game.blinky.timeout = setTimeout(() => {
            if (game.blinky.behaviour == "frightened") {
              game.blinky.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        else {
          clearTimeout(game.blinky.timeout);
          game.blinky.timeout = setTimeout(() => {
            if (game.blinky.behaviour == "frightened") {
              game.blinky.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        }
      }
      if (
        game.inky.behaviour != "waiting" &&
        game.inky.behaviour != "returning"
      ) {
        game.inky.behaviour = "frightened";

        game.inky.changeFrameSet(game.inky.frame_sets["frightened"], "loop");
        if (!game.inky.timeout)
          game.inky.timeout = setTimeout(() => {
            if (game.inky.behaviour == "frightened") {
              game.inky.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        else {
          clearTimeout(game.inky.timeout);
          game.inky.timeout = setTimeout(() => {
            if (game.inky.behaviour == "frightened") {
              game.inky.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        }
      }

      if (
        game.clyde.behaviour != "waiting" &&
        game.clyde.behaviour != "returning"
      ) {
        game.clyde.behaviour = "frightened";

        game.clyde.changeFrameSet(game.clyde.frame_sets["frightened"], "loop");
        if (!game.clyde.timeout)
          game.clyde.timeout = setTimeout(() => {
            if (game.clyde.behaviour == "frightened") {
              game.clyde.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        else {
          clearTimeout(game.clyde.timeout);
          game.clyde.timeout = setTimeout(() => {
            if (game.clyde.behaviour == "frightened") {
              game.clyde.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        }
      }

      if (
        game.pinky.behaviour != "waiting" &&
        game.pinky.behaviour != "returning"
      ) {
        game.pinky.behaviour = "frightened";

        game.pinky.changeFrameSet(game.pinky.frame_sets["frightened"], "loop");
        if (!game.pinky.timeout)
          game.pinky.timeout = setTimeout(() => {
            if (game.pinky.behaviour == "frightened") {
              game.pinky.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        else {
          clearTimeout(game.pinky.timeout);
          game.pinky.timeout = setTimeout(() => {
            if (game.pinky.behaviour == "frightened") {
              game.pinky.behaviour = "";
            }
          }, FRIGHTENED_DURATION * 1000);
        }
      }
    }
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
  die(game) {
    //death animation
    this.dir = "";
    this.next_dir = "";
    this.changeFrameSet(this.frame_sets["die"], "loop");
    this.blocked = true;
  }
}
