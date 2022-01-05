/*
Class that is responsible for drawing each element of the game in the auxiliary buffer (not displayed on the screen) and
when we call render dump it to the final canvas that we do see on the screen.
It also manages the size and proportion of the canvas.
*/
class Display {
  constructor(canvas) {
    this.context = canvas.getContext("2d");
    this.buffer = document.createElement("canvas").getContext("2d");
    this.buffer.canvas.width = SCREEN_WIDTH;
    this.buffer.canvas.height = SCREEN_HEIGHT;
  }

  render() {
    this.context.drawImage(
      this.buffer.canvas,
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height,
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  fill(color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(
      0,
      0,
      this.buffer.canvas.width,
      this.buffer.canvas.height
    );
  }

  resize(width, height, ratio) {
    if (width / height > ratio) {
      this.context.canvas.height = height;
      this.context.canvas.width = height * ratio;
    } else {
      this.context.canvas.height = width / ratio;
      this.context.canvas.width = width;
    }

    this.render();
  }

  drawObject(
    image,
    source_x,
    source_y,
    destination_x,
    destination_y,
    width,
    height
  ) {
    this.buffer.drawImage(
      image,
      source_x,
      source_y,
      width,
      height,
      Math.round(destination_x),
      Math.round(destination_y),
      width,
      height
    );
  }

  drawMap = function (image, game) {
    for (let i = 0; i < game.world.graphic_map.length; i++) {
      let frame;
      frame = game.tile_set.frames[game.world.graphic_map[i]];
      let source_x = frame.x;
      let source_y = frame.y;
      let destination_x = (i % NCOLS) * TILE_SIZE;
      let destination_y = Math.floor(i / NCOLS) * TILE_SIZE;
      this.buffer.drawImage(
        image,
        source_x,
        source_y,
        TILE_SIZE,
        TILE_SIZE,
        destination_x,
        destination_y,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  };

  drawBalls(image, game) {
    for (let i = 0; i < game.world.balls.matrix.length; i++) {
      let frame;

      if (game.world.balls.matrix[i] == 1) {
        frame = game.tile_set.frames[77]; //normal ball
      } else if (game.world.balls.matrix[i] === 2) {
        frame =
          game.tile_set.frames[
            game.world.balls.special_ball_animator.frame_value //flashing ball
          ];
      }

      if (frame) {
        let source_x = frame.x;
        let source_y = frame.y;

        let destination_x = (i % NCOLS) * TILE_SIZE;
        let destination_y = Math.floor(i / NCOLS) * TILE_SIZE;

        this.buffer.drawImage(
          image,
          source_x,
          source_y,
          TILE_SIZE,
          TILE_SIZE,
          destination_x,
          destination_y,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }
  }
}
