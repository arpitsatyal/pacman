/*
Game Object, which controls the main draw and draw loop
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
  }

  initialize(){
    this.wait(3);
    this.closeHome();
    this.showReadyNotification(3);
  };

  /* The game loop */
  start(updateCallback, renderCallback){
    setInterval(() => {
      this.update(updateCallback, renderCallback);
    }, TIME_DELTA);
  };

  update(updateCallback, renderCallback){
    if (!this.paused) this.frames_rendered++;
    updateCallback();
    renderCallback();
  };

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

  openHome(){
    this.home_door = "open";
    this.world.path.fillStyle = "#00fc1e";
    this.world.path.fillRect(180, 127, 1, 30);
  };

  closeHome(){
    this.world.path.fillStyle = "#000000";
    this.world.path.fillRect(180, 127, 1, 30);
    this.home_door = "close";
  };

  /*

controls the output of different ghosts
*/
  manageGhostDeparture(){
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
  };

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

  checkPacmanGhostsCollision(){
    if (this.blinky.collides(this.pacman.x, this.pacman.y)) {
      if (
        this.blinky.behaviour != "frightened" &&
        this.blinky.behaviour != "returning"
      ) {
        this.pacman.die(this);
        if (!this.is_reseting) {
          this.is_reseting = true;
          setTimeout(this.reset, 1600);
        }
      } else {
        if (his.blinky.behaviour != "returning") {
          this.paused = true;
        }
        this.blinky.behaviour = "returning";
        this.blinky.targetTile = [...HOME_ENTRANCE_TILE];
      }
    }
    if (this.inky.collides(this.pacman.x, this.pacman.y)) {
      if (
        this.inky.behaviour != "frightened" &&
        this.inky.behaviour != "returning"
      ) {
        this.pacman.die(this);
        if (!this.is_reseting) {
          this.is_reseting = true;
          setTimeout(this.reset, 1600);
        }
      } else {
        if (this.sound) {
          this.sounds["eat_ghost"].play();
          this.sounds["returning"].play();
        }
        if (this.inky.behaviour != "returning") {
          this.paused = true;
        }
        this.inky.behaviour = "returning";
        this.inky.targetTile = [...HOME_ENTRANCE_TILE];
      }
    }
    if (this.clyde.collides(this.pacman.x, this.pacman.y)) {
      if (
        this.clyde.behaviour != "frightened" &&
        this.clyde.behaviour != "returning"
      ) {
        this.pacman.die(this);
        if (!this.is_reseting) {
          this.is_reseting = true;
          setTimeout(this.reset, 1600);
        }
      } else {
        if (this.clyde.behaviour != "returning") {
          this.paused = true;
        }
        this.clyde.behaviour = "returning";
        this.clyde.speed_divisor = 1;
        this.clyde.targetTile = [...HOME_ENTRANCE_TILE];
      }
    }
    if (this.pinky.collides(this.pacman.x, this.pacman.y)) {
      if (
        this.pinky.behaviour != "frightened" &&
        this.pinky.behaviour != "returning"
      ) {
        this.pacman.die(this);
        if (!this.is_reseting) {
          this.is_reseting = true;
          setTimeout(this.reset, 1600);
        }
      } else {
        if (this.pinky.behaviour != "returning") {
          this.paused = true;
        }
        this.pinky.behaviour = "returning";
        this.pinky.speed_divisor = 1;
        this.pinky.targetTile = [...HOME_ENTRANCE_TILE];
      }
    }
  };
}
