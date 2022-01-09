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
const COLLISION_SIZE = 15;
const NCOLS = SCREEN_WIDTH / TILE_SIZE; //(28)
const NROWS = SCREEN_HEIGHT / TILE_SIZE; //(31)
const PATH_COLOR_R = 0;
const PATH_COLOR_G = 252;
const PATH_COLOR_B = 30;
const FRIGHTENED_DURATION = 7; 

//POSITIONS
const PACMAN_INIT_POS = [156, 270];
const BLINKY_INIT_POS = [156, 126];
const INKY_INIT_POS = [132, 167];
const PINKY_INIT_POS = [156, 159];
const CLYDE_INIT_POS = [180, 163];

const BLINKY_SCATTER_MODE_TARGET = [0,23];
const INKY_SCATTER_MODE_TARGET = [30,27];
const PINKY_SCATTER_MODE_TARGET = [0,4];
const CLYDE_SCATTER_MODE_TARGET = [30,0];

const POS_CONSIDERED_OUT_HOME = [156,126];
const POS_CONSIDERED_IN_HOME = [156,157];
const HOME_ENTRANCE_TILE= [11,13];

const BALL_1_SCORE = 5;
const BALL_2_SCORE = 10;

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

const GAMEOVER_WIDTH = 79;
const GAMEOVER_HEIGHT =  7;
const GAMEOVER_X = 128;
const GAMEOVER_Y = 206;

// SOUNDS
const SOUND_EAT_BALL = "assets/sounds/eat_ball.mp3";
const SOUND_EAT_GHOST = "assets/sounds/eat_ghost.mp3";
const SOUND_FRIGHTENED = "assets/sounds/frightened.mp3";
const SOUND_MUSIC = "assets/sounds/music.mp3";
const SOUND_RETURNING = "assets/sounds/returning.mp3";
