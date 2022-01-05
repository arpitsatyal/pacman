/*
Game Object, which controls the main draw and draw loop
the logic of the game, in addition to containing all the objects of elements of the game (pacman, ghosts, walls, etc)
*/

function Game(path_image) {
  this.world = new World(path_image);
  this.pacman = new Pacman(this.world);
  this.pinky = new Pinky(this);
  this.clyde = new Clyde(this);
  this.blinky = new Blinky(this);
  this.inky = new Inky(this);
  this.tile_set = new TileSet();

  this.paused = true;
  this.ready_notification = false;

  this.time = 0; //elapsed game time in seconds
  this.frames_rendered = 0; //game cycles executed
  this.home_door = "close"; 

  this.initialize = () => {
    this.wait(3);
    this.closeHome();
    this.showReadyNotification(3);
  };

  /* The game loop */
  this.start = (updateCallback, renderCallback) => {
    setInterval(() => {
      this.update(updateCallback, renderCallback);
    }, TIME_DELTA);
  };

  this.update = function (updateCallback, renderCallback) {
    if (!this.paused) this.frames_rendered++;
    if (this.frames_rendered % FPS == 0 && !this.paused) {
      this.time++;
    }
    updateCallback();
    renderCallback();
  };

  /* Wait seconds */
  this.wait = (seconds) => {
    this.paused = true;
    setTimeout(() => {
      this.paused = false;
    }, seconds * 1000);
  };

  /* Show ready sign for x seconds. */
  this.showReadyNotification = (seconds) => {
    this.ready_notification = true;
    if (seconds == -1) return;
    setTimeout(() => {
      this.ready_notification = false;
    }, seconds * 1000);
  };
  this.closeHome = function () {
    this.world.path.fillStyle = "#000000";
    this.world.path.fillRect(180, 127, 1, 30); // close out
    this.home_door = "close";
  };
}
