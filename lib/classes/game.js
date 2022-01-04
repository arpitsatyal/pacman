/*
Game Object, which controls the main draw and draw loop
the logic of the game, in addition to containing all the objects of elements of the game (pacman, ghosts, walls, etc)
*/

function Game(path_image) {
  this.world = new World(path_image);
  this.pacman = new Pacman(this.world);

  this.tile_set = new TileSet();
  this.paused = true;
  this.ready_notification = false;

  this.initialize = function () {
    this.wait(3);
    this.showReadyNotification(3);
  };

  /* The game loop */
  this.start = function (updateCallback, renderCallback) {
    setInterval(() => {
      updateCallback();
      renderCallback();
    }, TIME_DELTA);
  };

  /* Wait seconds */
  this.wait = (seconds) => {
    this.paused = true;
    setTimeout(() => {
      this.paused = false;
    }, seconds * 1000)
  };

  /* Show ready sign for x seconds. */
  this.showReadyNotification =(seconds) => {
    this.ready_notification = true;
    if (seconds == -1) return;
    setTimeout(() => {
      this.ready_notification = false;
    }, seconds * 1000)
  };
}
