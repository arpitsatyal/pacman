/* Class to manage all the assets */

class AssetsManager {
  constructor() {
    this.tile_set_image;
    this.path_image;
    this.game_over;
    this.ready;
    this.checkerboard;
    this.count = 0;
    this._all_loaded = new Event("all_loaded");
  }

  getEvent = () => this._all_loaded;

  loadImages(callback) {
    this.tile_set_image = new Image();
    this.path_image = new Image();

    this.checkerboard = new Image();
    this.ready = new Image();
    this.game_over = new Image();

    this.tile_set_image.src = ASSETS_SPRITES;
    this.path_image.src = ASSETS_PATH;
    this.checkerboard.src = ASSETS_CHECKERBOARD;
    this.ready.src = ASSETS_READY;
    this.game_over.src = ASSETS_GAMEOVER;

    const count = (event) => {
      this.count++;
      if (this.count == 5) dispatchEvent(event);
    };

    this.tile_set_image.addEventListener("load", count(this.getEvent()));

    this.path_image.addEventListener("load", count(this.getEvent()));

    this.checkerboard.addEventListener(
      "load",
      count.bind(this, this.getEvent())
    );

    this.ready.addEventListener("load", count(this.getEvent()));

    this.game_over.addEventListener("load", count(this.getEvent()));

    addEventListener("all_loaded", () => callback());
  }
}
