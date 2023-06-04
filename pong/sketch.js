// WINDOW CONST
const WINDOW_HEIGHT = 150; 
const WINDOW_WIDTH = 380;
// PADDLE CONST
const PADDLE_HEIGHT = 17;
const PADDLE_WIDTH = 20;
const PADDLE_SPEED = 3;
// BALL CONST
const BALL_DIAMETER = 15;
const BALL_SPEED_INITIAL = 2;
const BALL_SPEED_MAX = 8;
// AI CONST
const AI_ERROR_INITIAL = 32;
const AI_ERROR_TWEAK = 1.88;


// BALL VAR
let ball = {
    x: WINDOW_WIDTH/2,
    y: WINDOW_HEIGHT/2,
    x_dir: 'right',
    y_dir: 'up',
    moving: false,
    speed: BALL_SPEED_INITIAL,
}
// AI VAR
// max difficulty = ai_errror_initial / ai_error_tweak
let difficulty = 1;
let left_ai_find_ball_y = WINDOW_HEIGHT/2;
let right_ai_find_ball_y = WINDOW_HEIGHT/2;

// PADDLE VAR
let left_paddle = {
    x: WINDOW_WIDTH/5,
    y: WINDOW_HEIGHT/2,
}

let right_paddle = {
    x: 4*WINDOW_WIDTH/5,
    y: WINDOW_HEIGHT/2, 
}

// GUI 
let gui; // creates the gui that holds GUI elements
let touch_slider; // allow user input on a GUI slider
// GAME 
let player_score = 0;
let ai_score = 0;
let start_text = "Click on the game area to start";
let game_started = false;
// OPTIONS
let draw_background = true;
let perfect_ai = true;
let ui_slider = false;
let ai_warfare = true;


// called once when the sketch starts
function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
  createGui(gui); // needed to use GUI elements
  // creates a vertical slider of size 20x125, with max value 150 and min 0
  touch_slider = createSliderV("SliderV", 10, 10, 20, 125, 150, 0);

  // get a reference to the canvas
  let canvasElement = document.querySelector("#defaultCanvas0");
  // add an event listener preventing the scrolling on mobile devices
  canvasElement.addEventListener("touchstart", function(event) {
    event.preventDefault();
  });
  start_game();
}

// called every frame 
function draw() {
  // draw the pong paddles and game text
  draw_game_objects_and_text();
  // use the ball's x-dir and y-dir to determine the new position
  moveBall();
  // check for collision between ball and left or right paddle
  check_collision();
  // move the player with either keyboard keys, AI, or slider GUI.
  move_player();
  // use the calculated position to move the paddle accordingly.
  move_right_ai();
}

function draw_game_objects_and_text() {
  if (draw_background) {
    background(0); 
  }
  // set the draw color to white
  color(255);
  // draw the objects center at the point specified
  rectMode(CENTER);
  // draw the shapes to the screen
  let draw_left_paddle = rect(left_paddle.x, left_paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  let draw_right_paddle = rect(right_paddle.x, right_paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  let draw_ball = circle(ball.x, ball.y, BALL_DIAMETER);
  // center the text on the position provided
  textAlign(CENTER, CENTER);
  fill(255); // white text color
  // draw the text
  text(start_text, WINDOW_WIDTH/2, WINDOW_HEIGHT/5);
  text(player_score, WINDOW_WIDTH/10, WINDOW_HEIGHT/5);
  text(ai_score, 9*WINDOW_WIDTH/10, WINDOW_HEIGHT/5);
  //let user_options = text(radio.value(), 40, 40);
  if (ui_slider) {
    drawGui();
  }
}