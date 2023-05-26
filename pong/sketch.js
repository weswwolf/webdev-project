// WINDOW CONST
const WINDOW_HEIGHT = 150; 
const WINDOW_WIDTH = 400;
// PADDLE CONST
const PADDLE_HEIGHT = 17;
const PADDLE_WIDTH = 20;
const PADDLE_SPEED = 3;
// BALL CONST
const BALL_DIAMETER = 15;
const BALL_SPEED_INITIAL = 7;
const BALL_SPEED_MAX = 8;
// AI CONST
const AI_ERROR_INITIAL = 32;
const AI_ERROR_TWEAK = 1.88;

// BALL VAR
let ball_speed = BALL_SPEED_INITIAL;
let ball_x = WINDOW_WIDTH/2;
let ball_y = WINDOW_HEIGHT/2;
let ball_x_dir = 'right';
let ball_y_dir = 'up'
let ball_move = false;
// AI VAR
// max difficulty = ai_errror_initial / ai_error_tweak
let difficulty = 1;
let left_ai_find_ball_y = WINDOW_HEIGHT/2;
let right_ai_find_ball_y = WINDOW_HEIGHT/2;
let ai_score = 0;

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
  if (draw_background) {
    background(0); 
  }
  color(255);
  rectMode(CENTER);
  moveBall();
  check_collision();
  move_player();
  move_right_ai();
  let draw_left_paddle = rect(left_paddle.x, left_paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  let draw_right_paddle = rect(right_paddle.x, right_paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  let draw_ball = circle(ball_x, ball_y, BALL_DIAMETER);
  textAlign(CENTER, CENTER);
  fill(255);
  text(start_text, WINDOW_WIDTH/2, WINDOW_HEIGHT/5);
  text(player_score, WINDOW_WIDTH/10, WINDOW_HEIGHT/5);
  text(ai_score, 9*WINDOW_WIDTH/10, WINDOW_HEIGHT/5);
  //let user_options = text(radio.value(), 40, 40);
  if (ui_slider) {
    drawGui();
  }
  if (touch_slider.isChanged) {
    print("slider value: " + touch_slider.val);
  }
}