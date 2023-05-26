// WINDOW CONST
const window_height = 150; 
const window_width = 400;
// PADDLE CONST
const paddle_height = 50;
const paddle_width = 20;
const paddle_speed = 2.5;
// BALL CONST
const ball_diameter = 15;
const ball_speed_initial = 3;
const MAX_BALL_SPEED = 13.5;
// AI CONST
const ai_error_initial = 32;
const ai_error_tweak = 1.88;

// BALL VAR
let ball_speed = ball_speed_initial;
let ball_x = window_width/2;
let ball_y = window_height/2;
let ball_x_dir = 'right';
let ball_y_dir = 'up'
let ball_move = false;
// AI VAR
// max difficulty = ai_errror_initial / ai_error_tweak
let difficulty = 1;
let left_ai_find_ball_y = window_height/2;
let right_ai_find_ball_y = window_height/2;
let ai_score = 0;
// PADDLE VAR
let left_paddle_x = window_width/5;
let left_paddle_y = window_height/2;
let right_paddle_x = 4*window_width/5;
let right_paddle_y = window_height/2;
// GUI 
let gui; // creates the gui that holds GUI elements
let touch_slider; // allow user input on a GUI slider
// GAME 
let player_score = 0;
let start_text = "Click on the game area to start";
let game_started = false;
// OPTIONS
let draw_background = true;
let perfect_ai = false;
let ui_slider = false;

// called once when the sketch starts
function setup() {
  createCanvas(window_width, window_height);
  createGui(gui); // needed to use GUI elements
  // creates a vertical slider of size 20x125, with max value 150 and min 0
  touch_slider = createSliderV("SliderV", 10, 10, 20, 125, 150, 0);

  // get a reference to the canvas
  let canvasElement = document.querySelector("#defaultCanvas0");
  // add an event listener preventing the scrolling on mobile devices
  canvasElement.addEventListener("touchstart", function(event) {
    event.preventDefault();
  });
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
  let left_paddle = rect(left_paddle_x, left_paddle_y, paddle_width, paddle_height);
  let right_paddle = rect(right_paddle_x, right_paddle_y, paddle_width, paddle_height);
  let ball = circle(ball_x, ball_y, ball_diameter);
  textAlign(CENTER, CENTER);
  fill(255);
  text(start_text, window_width/2, window_height/5);
  text(player_score, window_width/10, window_height/5);
  text(ai_score, 9*window_width/10, window_height/5);
  //let user_options = text(radio.value(), 40, 40);
  if (ui_slider) {
    drawGui();
  }
  if (touch_slider.isChanged) {
    print("slider value: " + touch_slider.val);
  }
}