window.onload = function () {
  /*
    render all the elements before drawing the canvas,
    such as the pacman, the ghost, the walls, the balls, etc.
    */
  function render() {
    let frame_aux;
    //draw background
    display.fill(game.world.background_color);

    display.drawMap(assets_manager.tile_set_image, game);

    display.drawBalls(assets_manager.tile_set_image, game);

    //draw pacman
    //take the frame that the pacman object currently has
    frame_aux = game.tile_set.frames[game.pacman.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame_aux.x,
      frame_aux.y,
      game.pacman.x + frame_aux.offset_x,
      game.pacman.y + frame_aux.offset_y,
      frame_aux.width,
      frame_aux.height
    );

    //blinky
    frame_aux = game.tile_set.frames[game.blinky.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame_aux.x,
      frame_aux.y,
      game.blinky.x + frame_aux.offset_x,
      game.blinky.y + frame_aux.offset_y,
      frame_aux.width,
      frame_aux.height
    );

    //inky
    frame_aux = game.tile_set.frames[game.inky.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame_aux.x,
      frame_aux.y,
      game.inky.x + frame_aux.offset_x,
      game.inky.y + frame_aux.offset_y,
      frame_aux.width,
      frame_aux.height
    );

    //clyde
    frame_aux = game.tile_set.frames[game.clyde.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame_aux.x,
      frame_aux.y,
      game.clyde.x + frame_aux.offset_x,
      game.clyde.y + frame_aux.offset_y,
      frame_aux.width,
      frame_aux.height
    );

    //pinky
    frame_aux = game.tile_set.frames[game.pinky.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame_aux.x,
      frame_aux.y,
      game.pinky.x + frame_aux.offset_x,
      game.pinky.y + frame_aux.offset_y,
      frame_aux.width,
      frame_aux.height
    );

    //ready notification
    if (game.ready_notification) {
      display.drawObject(
        assets_manager.ready,
        0,
        0,
        READY_X,
        READY_Y,
        READY_WIDTH,
        READY_HEIGHT
      );
    }

    display.render();
    //dump the buffer to the final canvas
  }

  function update() {
    if (!game.paused) {
      game.pacman.live(game, controller);
      game.blinky.live(game);
    }
  }

  function resize() {
    //we subtract CANVAS_MARGIN_TOP so that the canvas leaves space for marker
    display.resize(
      document.documentElement.clientWidth - CANVAS_MARGIN_HORIZONTAL,
      document.documentElement.clientHeight - CANVAS_MARGIN_VERTICAL,
      game.world.width / game.world.height
    );
    display.render();
  }

  let assets_manager = new AssetsManager();
  let display = new Display(document.getElementById("canvas"));
  let controller = new Controller();
  let game;

  window.addEventListener("resize", resize);
  window.addEventListener(
    "keydown",
    controller.handleKeyDownUp.bind(controller)
  );
  
  window.addEventListener("keyup", controller.handleKeyDownUp.bind(controller));

  assets_manager.loadImages(() => {
    game = new Game(assets_manager.path_image);
    resize();
    game.initialize();
    game.start(update, render);
  });
};
