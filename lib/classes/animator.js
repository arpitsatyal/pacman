// Class to carry the animation made with several sprites and with a possible delay between them.

function Animator(frame_set, delay) {
  this.count = 0; //main loop counter
  this.delay = Math.abs(delay);

  // a frameset is an array of sprite indices in Game.tileset.frames. Therefore a frameset determines an animation
  this.frame_set = frame_set; //[78, 76]
  this.frame_index = 0;
  this.frame_value = frame_set[0];
  this.mode = "pause"; //by default starts on pause

this.loop = function () {
  this.count++;
  while (this.count > this.delay) {
    // it only enters to change the frame each time count accumulates more passes than delay indicates
    this.count -= this.delay;
    this.frame_index =
      this.frame_index < this.frame_set.length - 1 ? this.frame_index + 1 : 0;
    // we go to the next frame until we reach the end of the array, when we go back to the beginning
    this.frame_value = this.frame_set[this.frame_index]; //76
    //We take the index of the frame that we will use in the Game.tileset.frames array to select the frame that we want to draw
  }
};

this.animate = function () {
  switch (this.mode) {
    case "loop":
      this.loop();
      break;
    case "pause":
      break;
  }
};

this.changeFrameSet = function (
  frame_set,
  mode,
  delay = 10,
  frame_index = 0
) {
  if (this.frame_set === frame_set) {
    return;
  }

  this.count = 0;
  this.delay = delay;
  this.frame_set = frame_set;
  this.frame_index = frame_index;
  this.frame_value = frame_set[frame_index];
  this.mode = mode;
};
}

