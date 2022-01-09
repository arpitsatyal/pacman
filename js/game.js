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

    this.sound = true;
    this.sounds = [];
  }

  initialize() {
    this.play();
    this.pause();
    this.highestScore();
    this.closeHome();
  }

  play() {
    const btn = document.getElementById("play");
    btn.onclick = () => {
      this.paused = false;
      if(this.world.balls.remaining >= 258) {
      this.preloadAudios().then((data) => data["music"].play());
        this.wait(4);
        this.showReadyNotification(3);
      }
    };
  }

  pause() {
    const btn = document.getElementById("pause");
    btn.onclick = () => {
      this.paused = true;
      this.sounds["eat_ball"].pause();
      this.sounds["eat_ghost"].pause();
      this.sounds["frightened"].pause();
      this.sounds["music"].pause();
      this.sounds["returning"].pause();
      this.sounds["die"].pause();
    }
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

  manageGhostSounds() {
    if (
      this.pinky.behaviour != "frightened" &&
      this.clyde.behaviour != "frightened" &&
      this.blinky.behaviour != "frightened" &&
      this.inky.behaviour != "frightened" &&
      !this.sounds["frightened"].paused
    ) {
      this.sounds["frightened"].pause();
    }

    if (
      this.pinky.behaviour != "returning" &&
      this.clyde.behaviour != "returning" &&
      this.blinky.behaviour != "returning" &&
      this.inky.behaviour != "returning" &&
      !this.sounds["returning"].paused
    ) {
      this.sounds["returning"].pause();
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
        if (this.sound) {
          this.sounds["eat_ghost"].play();
          this.sounds["returning"].play();
        }
        this.incScore(this.points_per_ghost);
        ghost.behaviour = "returning";
        ghost.targetTile = [...HOME_ENTRANCE_TILE];
      }
    }
  }

  incScore(value) {
    this.score += value;
    const elem = document.getElementById("curScore");
    if (this.score > this.highScore)
      localStorage.setItem("highestScore", this.score);
    elem.innerHTML = this.score;
  }

  highestScore() {
    localStorage.getItem("highestScore")
      ? (this.highScore = localStorage.getItem("highestScore"))
      : (this.highScore = 0);
    const elem = document.getElementById("highest");
    elem.innerHTML = this.highScore;
  }

  preloadAudios() {
    return new Promise((resolve) => {
      this.sounds["music"] = this.createAudioTag("music", false);
      this.sounds["eat_ball"] = this.createAudioTag("eat_ball", false);
      this.sounds["eat_ghost"] = this.createAudioTag("eat_ghost", false);
      this.sounds["frightened"] = this.createAudioTag("frightened", false);
      this.sounds["returning"] = this.createAudioTag("returning", true);
      this.sounds["die"] = this.createAudioTag("die", false);
      resolve(this.sounds);
    });
  }

  createAudioTag(sound, loop) {
    let audio = document.createElement("AUDIO");
    audio.controls = false;
    audio.autoplay = false;
    audio.loop = loop;
    audio.setAttribute("src", "assets/sounds/" + sound + ".mp3");
    return audio;
  }

  toggleSound = () => {
    let sound_button = document.getElementById("volume");
    if(this.sound){
        this.sound = false;
        sound_button.style.backgroundImage = "url('assets/sound_off.png')";
        this.sounds["eat_ball"].pause();
        this.sounds["eat_ghost"].pause();
        this.sounds["frightened"].pause();
        this.sounds["music"].pause();
        this.sounds["returning"].pause();
        this.sounds["die"].pause();
    }
        
    else{
        this.sound = true;
        sound_button.style.backgroundImage = "url('assets/sound_on.png')";
    }
        
}
}
