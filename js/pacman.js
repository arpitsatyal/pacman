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
    Animator.call(this, this.frame_sets["right"]);
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
Consume a ball if it exists in your position.
*/
  eatBall(game) {
    if(game.world.balls.remaining === 0) {
      game.game_over_notification = true;
      game.paused = true;
    };
    let eated_ball = game.world.balls.setBall(this.x, this.y);
    if(eated_ball === 1){ 
    if(game.sound) game.sounds["eat_ball"].play();   
      game.incScore(BALL_1_SCORE);
      game.world.balls.remaining--;
    
  } else if (eated_ball === 2) {
    if(game.sound) game.sounds["eat_ball"].play();   
    game.incScore(BALL_2_SCORE);
    game.world.balls.remaining--;
      this.frightenedMode(game);
    }
  }

  frightenedMode(game) {
    const ghosts = ['blinky', 'pinky', 'inky', 'clyde'];
    ghosts.forEach(ghost => {
      if (game[ghost].behaviour != "waiting" && game[ghost].behaviour != "returning") {
        game[ghost].behaviour = "frightened";
        if(game.sound) game.sounds["frightened"].play();
        game[ghost].changeFrameSet(game[ghost].frame_sets["frightened"], "loop");
        if (!game[ghost].timeout)
          game[ghost].timeout = setTimeout(() => {
            if (game[ghost].behaviour == "frightened") {
              game[ghost].behaviour = "";
              game.sounds["frightened"].pause();
            }
          }, FRIGHTENED_DURATION * 1000);
        else {
          clearTimeout(game[ghost].timeout);
          game[ghost].timeout = setTimeout(() => {
            if(game[ghost].behaviour == "frightened"){
                game[ghost].behaviour = "";
                game.sounds["frightened"].pause();
            }
        },FRIGHTENED_DURATION*1000);
        }
      }
    })
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
    if(game.sound) game.sounds["die"].play();
  }
}
