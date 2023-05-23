const window_height = 150;
const window_width = 400;
const paddle_height = 50;
const paddle_width = 20;
const paddle_speed = 2.5;
const ball_diameter = 15;
const ball_speed_initial = 2;
const ai_error_initial = 32;
const ai_error_tweak = 3.65;

let ball_speed = ball_speed_initial;
let ball_x = window_width/2;
let ball_y = window_height/2;
let ball_x_dir = 'right';
let ball_y_dir = 'up'
let ball_move = false;
let ai_find_ball_y = window_height/2;


let left_paddle_x = window_width/5;
let left_paddle_y = window_height/2;
let right_paddle_x = 4*window_width/5;
let right_paddle_y = window_height/2;

// max difficulty = ai_errror_initial / ai_error_tweak
let difficulty = 1;


function setup() {
  createCanvas(window_width, window_height);
  /*radio = createRadio();
  radio.option('easy');
  radio.option('medium');
  radio.option('difficult');
  radio.style('width', '60px');
  radio.style('color', 'white');*/
  //let user_options = text(radio.value(), 40, 40);
}

function start_game() {
  resetBallPos();
  ai_find_ball_y = ai_calculate_ball_y();
  ball_move = true;
  ball_speed = ball_speed_initial;
  
}
// on mouse press, start the game of pong!
function mousePressed() {
   start_game();
}


// puts the ball back to the center of the screen
// and stops the ball 
function resetBallPos() {
  ball_x = window_width/2;
  ball_y = window_height/2;
  ball_move = false;
}

function moveBall() {
  if (!ball_move) return;
  // move in the appropriate direction
  ball_x_dir == 'right'? ball_x += ball_speed : ball_x -= ball_speed;
  ball_y_dir == 'up'? ball_y -= ball_speed : ball_y += ball_speed;
  // bounce the ball off the top and bottom of the canvas
  if (ball_y > window_height - ball_diameter/2) {
    ball_y_dir = 'up';
  }
  if (ball_y < 0) {
    ball_y_dir = 'down';
  }
  // ball left the window on left or right side
  if (ball_x > window_width || ball_x < 0){
    // add to score
    resetBallPos(); 
  } 
}


function move_player() {
  // on keypress W move left paddle UP
  if (keyIsDown(87) && left_paddle_y > paddle_height/2) {
    left_paddle_y -= paddle_speed;
  }
  // on keypress S move left paddle DOWN
  if (keyIsDown(83) && left_paddle_y < window_height - paddle_height/2) {
    left_paddle_y += paddle_speed;
  }
  if (keyIsDown(32)) {
      start_game();
  }
}

function move_ai_paddle (to_this_y) {
  // padding used to prevent the paddle from moving back and forth
  // once it has reached the area it is supposed to be in.
  let padding = 3;
  if (right_paddle_y < to_this_y - padding && right_paddle_y < window_height - paddle_height/2) {
    right_paddle_y += paddle_speed;
  }
  else if (right_paddle_y > to_this_y + padding && right_paddle_y > paddle_height/2) {
    right_paddle_y -= paddle_speed;
  }
}

// the ai should be able to determine where the ball 
// will intersect the paddle once it returns to this side 
function ai_calculate_ball_y() {
  // check if the ball is moving left or up
  // we can assume it is headed toward the AI paddle (right)
  let predict_x = ball_x;
  let predict_y = ball_y;
  let current_ball_dir = ball_y_dir;
  
  // subtract the amount from x and y until we reach the top
  while (predict_x < right_paddle_x) {
    while (current_ball_dir == 'up' && predict_y >= 0 && predict_x < right_paddle_x) {
      predict_x += 1;
      predict_y -= 1;
    }
    while (current_ball_dir == 'down' && predict_y <= window_height && predict_x < right_paddle_x) {
      predict_x += 1;
      predict_y += 1;
    }
    if (predict_y <= 0) {
      current_ball_dir = 'down';
    }
    if (predict_y >= window_height) {
      current_ball_dir ='up';
    }
  }
  
  // before returning the actual value, it would be fun
  // to alter this just a bit depending on the difficulty.
  let offset = getRandomInt(ai_error_initial-difficulty * ai_error_tweak + ball_speed * ai_error_tweak);
  print (offset);
  // decide whether to subtract or add the offset
  getRandomInt(2) == 1 ? predict_y += offset: predict_y -= offset;
  return predict_y;
}

function move_ai() {
  // if the ball is moving left, go back to center
  if (ball_x_dir == 'left') {
    move_ai_paddle(window_height/2);
    return;
  }
  move_ai_paddle(ai_find_ball_y);
}

function check_collision() {

  // collision with right paddle
  if (ball_y > right_paddle_y - paddle_height/2 &&
      ball_y < right_paddle_y + paddle_height/2 && 
      ball_x > right_paddle_x - paddle_width/2 &&
      ball_x < right_paddle_x + paddle_width/2)
    {
        ball_x_dir = 'left';
        ball_speed += 0.25;
    }
  
   // collision with left paddle
  if (ball_y > left_paddle_y - paddle_height/2 &&
      ball_y < left_paddle_y + paddle_height/2 && 
      ball_x > left_paddle_x - paddle_width/2 &&
      ball_x < left_paddle_x + paddle_width/2)
    {
        // we only want to calculate the ai move once
        ai_find_ball_y = ai_calculate_ball_y();
        ball_x_dir = 'right';
        ball_speed += 0.25;
    }

}

function draw() {
  background(0); 
  color(255);
  rectMode(CENTER);
  moveBall();
  check_collision();
  move_player();
  move_ai();
  let left_paddle = rect(left_paddle_x, left_paddle_y, paddle_width, paddle_height);
  let right_paddle = rect(right_paddle_x, right_paddle_y, paddle_width, paddle_height);
  let ball = circle(ball_x, ball_y, ball_diameter);
  //let user_options = text(radio.value(), 40, 40);
}



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}