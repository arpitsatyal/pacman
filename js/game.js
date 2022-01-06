/*
Game Object, which controls the main draw and draw loop
the logic of the game, in addition to containing all the objects of elements of the game (pacman, ghosts, walls, etc)
*/

function Game(path_image) {
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

  this.update = (updateCallback, renderCallback) => {
    if (!this.paused) this.frames_rendered++;
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

  this.openHome = () => {
    this.home_door = "open";
    this.world.path.fillStyle = "#00fc1e";
    this.world.path.fillRect(180, 127, 1, 30); 
}


  this.closeHome = () => {
    this.world.path.fillStyle = "#000000";
    this.world.path.fillRect(180, 127, 1, 30); 
    this.home_door = "close";
  };

  /*

controls the output of different ghosts
*/
this.manageGhostDeparture = () => {
  if(this.frames_rendered == 5*FPS && this.pinky.behaviour=="waiting")  //sale pinky
  {
      this.pinky.behaviour = "";
      this.openHome();
  }    
  if(this.frames_rendered == 10*FPS && this.inky.behaviour=="waiting")  //sale inky
  {
      this.inky.behaviour = "";
      this.openHome();
  }   
  if(this.frames_rendered == 15*FPS && this.clyde.behaviour=="waiting")  //sale clyde
  {
      this.clyde.behaviour = "";
      this.openHome();
  }    
}
}
