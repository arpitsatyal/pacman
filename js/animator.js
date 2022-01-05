// Class to carry the animation made with several sprites and with a possible delay between them.

function Animator(frame_set, delay) {
  this.count = 0; //main loop counter
  this.delay = Math.abs(delay);

  // a frameset is an array of sprite indices in Game.tileset.frames. Therefore a frameset determines an animation
  this.frame_set = frame_set; //[78, 76]
  this.frame_index = 0;
  this.frame_value = frame_set[0];
  this.mode = "pause"; //by default starts on pause

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

