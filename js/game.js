/*
Game class, which controls the main draw and draw loop
the logic of the game, in addition to containing all the objects of elements of the game (pacman, ghosts, walls, etc)
*/

class Game {
  constructor(path_image) {
    this.world = new World(path_image);
    this.pacman = new Pacman(this.world);
    this.blinky = new Blinky(this);
    this.pinky = new Pinky(this);
    this.clyde = new Clyde(this);
    this.inky = new Inky(this);
    this.tile_set = new TileSet();

    this.paused = true;
    this.ready_notification = false;

    this.frames_rendered = 0; //game cycles executed
    this.home_door = "close";

    this.is_reseting = false;
    this.is_reseting_level = false;

    this.score = 0;
    this.highScore = 0;
    this.points_per_ghost = 20;
  }

  initialize() {
    this.highestScore();
    this.wait(3);
    this.closeHome();
    this.showReadyNotification(3);
  }

  /* The game loop */
  start(updateCallback, renderCallback) {
    setInterval(() => {
      this.update(updateCallback, renderCallback);
    }, TIME_DELTA);
  }

  update(updateCallback, renderCallback) {
    if (!this.paused) this.frames_rendered++;
    updateCallback();
    renderCallback();
  }

  /* Wait seconds */
  wait = (seconds) => {
    this.paused = true;
    setTimeout(() => {
      this.paused = false;
    }, seconds * 1000);
  };

  /* Show ready sign for x seconds. */
  showReadyNotification = (seconds) => {
    this.ready_notification = true;
    if (seconds == -1) return;
    setTimeout(() => {
      this.ready_notification = false;
    }, seconds * 1000);
  };

  openHome() {
    this.home_door = "open";
    this.world.path.fillStyle = "#00fc1e";
    this.world.path.fillRect(180, 127, 1, 30);
  }

  closeHome() {
    this.world.path.fillStyle = "#000000";
    this.world.path.fillRect(180, 127, 1, 30);
    this.home_door = "close";
  }

  /*

controls the output of different ghosts
*/
  manageGhostDeparture() {
    if (this.frames_rendered == 5 * FPS && this.pinky.behaviour == "waiting") {
      //sale pinky
      this.pinky.behaviour = "";
      this.openHome();
    }
    if (this.frames_rendered == 10 * FPS && this.inky.behaviour == "waiting") {
      //sale inky
      this.inky.behaviour = "";
      this.openHome();
    }
    if (this.frames_rendered == 15 * FPS && this.clyde.behaviour == "waiting") {
      //sale clyde
      this.clyde.behaviour = "";
      this.openHome();
    }
  }

  /*

relocate the ghosts and pacman
*/
  reset = () => {
    this.pacman.x = PACMAN_INIT_POS[0];
    this.pacman.y = PACMAN_INIT_POS[1];
    this.pacman.dir = "right";

    this.blinky.x = BLINKY_INIT_POS[0];
    this.blinky.y = BLINKY_INIT_POS[1];
    this.blinky.in_home = false;
    this.blinky.behaviour = "";
    this.blinky.mode = "loop";
    this.blinky.speed = 1;

    this.pacman.changeFrameSet(this.pacman.frame_sets["right"], "loop");
    this.blinky.changeFrameSet(this.blinky.frame_sets["right"], "loop");
    this.inky.changeFrameSet(this.inky.frame_sets["right"], "loop");
    this.clyde.changeFrameSet(this.clyde.frame_sets["right"], "loop");
    this.pacman.blocked = false;
    this.is_reseting = false;
  };

  checkPacmanGhostsCollision() {
    this.returnToHome(this.blinky);
    this.returnToHome(this.pinky);
    this.returnToHome(this.inky);
    this.returnToHome(this.clyde);
  }

  returnToHome(ghost) {
    if (ghost.collides(this.pacman.x, this.pacman.y)) {
      if (ghost.behaviour != "frightened" && ghost.behaviour != "returning") {
        this.pacman.die(this);
        if (!this.is_reseting) {
          this.is_reseting = true;
          setTimeout(this.reset, 1600);
        }
      } else {
        this.incScore(this.points_per_ghost);
        ghost.behaviour = "returning";
        ghost.targetTile = [...HOME_ENTRANCE_TILE];
      }
    }
  }

  incScore(value) {
    this.score += value;
    const elem = document.getElementById("curScore");
    if(this.score > this.highScore) localStorage.setItem('highestScore', this.score);
    elem.innerHTML = this.score;
  }

  highestScore() {
    localStorage.getItem('highestScore') ?
     this.highScore = localStorage.getItem('highestScore') :
     this.highScore = 0;
     const elem = document.getElementById('highest');
     elem.innerHTML = this.highScore;
  }
}
