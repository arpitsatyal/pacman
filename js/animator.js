// Class to carry the animation made with several sprites.

function Animator(frame_set) {
  // a frameset is an array of sprite indices in Game.tileset.frames. Therefore a frameset determines an animation
  this.frame_set = frame_set;
  this.frame_value = frame_set[0];
  this.mode = "pause";

  this.changeFrameSet = function (frame_set, mode) {
    if (this.frame_set === frame_set) {
      return;
    }

    this.frame_set = frame_set;
    this.frame_value = frame_set[0];
    this.mode = mode;
  };
}
