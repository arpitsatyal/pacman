//ENGINE
const CANVAS_MARGIN_VERTICAL = 200;
const CANVAS_MARGIN_HORIZONTAL = 20;
const FPS = 120;
const TIME_DELTA = 1000 / FPS;
const SCREEN_WIDTH = 336;
const SCREEN_HEIGHT = 372;
const BACKGROUND_COLOR = "rgba(0,0,0,1)";
const TILE_SIZE = 12;
const SPRITE_SIZE = 24;
const NCOLS = SCREEN_WIDTH / TILE_SIZE;
const NROWS = SCREEN_HEIGHT / TILE_SIZE;
const PATH_COLOR_R = 0;
const PATH_COLOR_G = 252;
const PATH_COLOR_B = 30;

//INITIAL POSITIONS
const PACMAN_INIT_POS = [156, 270];
const BLINKY_INIT_POS = [156, 126];
const INKY_INIT_POS = [132, 167];
const PINKY_INIT_POS = [156, 159];
const CLYDE_INIT_POS = [180, 163];

//SPRITES
const ASSETS_SPRITES = "assets/spritemap.png";
const ASSETS_PATH = "assets/path.png";
const ASSETS_CHECKERBOARD = "assets/checkerboard.png";
const ASSETS_READY = "assets/ready.png";
const ASSETS_GAMEOVER = "assets/game_over.png";

const READY_WIDTH = 47;
const READY_HEIGHT = 7;
const READY_X = 145;
const READY_Y = 206;
