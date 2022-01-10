window.onload = function () {
  /*
    render all the elements before drawing the canvas,
    such as the pacman, the ghost, the walls, the balls, etc.
    */
  function render() {
    let frame;
    //draw background
    display.fill(game.world.background_color);

    display.drawMap(assets_manager.tile_set_image, game);

    display.drawBalls(assets_manager.tile_set_image, game);

    //draw pacman
    //take the frame that the pacman object currently has
    frame = game.tile_set.frames[game.pacman.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.pacman.x + 1,
      game.pacman.y + 1,
      frame.width,
      frame.height
    );

    // //blinky
    frame = game.tile_set.frames[game.blinky.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.blinky.x + 1,
      game.blinky.y + 1,
      frame.width,
      frame.height
    );

    //inky
    frame = game.tile_set.frames[game.inky.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.inky.x + 1,
      game.inky.y + 1,
      frame.width,
      frame.height
    );

    //clyde
    frame = game.tile_set.frames[game.clyde.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.clyde.x + 1,
      game.clyde.y + 1,
      frame.width,
      frame.height
    );

    //pinky
    frame = game.tile_set.frames[game.pinky.frame_value];
    display.drawObject(
      assets_manager.tile_set_image,
      frame.x,
      frame.y,
      game.pinky.x + 1,
      game.pinky.y + 1,
      frame.width,
      frame.height
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

    //game over
    if (game.game_over_notification) {
      display.drawObject(
        assets_manager.game_over,
        0,
        0,
        GAMEOVER_X,
        GAMEOVER_Y,
        GAMEOVER_WIDTH,
        GAMEOVER_HEIGHT
      );
    }

    display.render();
    //dump the buffer to the final canvas
  }

  function update() {
    if (!game.paused) {
      game.highestScore();
      game.pacman.live(game, controller);
      game.blinky.live(game);
      game.pinky.live(game);
      game.inky.live(game);
      game.clyde.live(game);
      game.manageGhostDeparture();
      game.checkPacmanGhostsCollision();
      game.manageGhostSounds();
    }

    if (game.currentLevel > 3) {
      game.world.balls.matrix = game.world.balls.matrix.map(ball => ball !==0 ? ball = 0 : '');
      document.getElementById("curLevel").innerHTML = 3;
      game.ready_notification = false;
      game.game_over_notification = true;
      game.paused = true;
      game.setPause();
      document.getElementById("play").style.display = "none";
    }

    if (game.world.balls.remaining === 0) {
      if (!game.is_reseting_level) {
        game.wait(4);
        game.is_reseting = true;
        game.is_reseting_level = true;
        game.reset();
        game.resetLevel();
        game.currentLevel++;
        document.getElementById("curLevel").innerHTML = game.currentLevel;
      }
    }
  }

  function resize() {
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
  window.addEventListener("keydown", controller.keyPressed);
  window.addEventListener("keyup", controller.keyPressed);

  assets_manager.loadImages(() => {
    game = new Game(assets_manager.path_image);
    let sound_button = document.getElementById("volume");
    sound_button.addEventListener("click", game.toggleSound);
    resize();
    game.initialize();
    game.start(update, render);
  });
};
