
function start_game() { 
  resetBallPos();
  left_ai_find_ball_y = left_ai_calculate_ball_y();
  right_ai_find_ball_y = right_ai_calculate_ball_y();
  ball_move = true;
  ball_speed = ball_speed_initial;
  start_text="";
  
}
// on mouse press, start the game of pong!
function mousePressed() {
   if (!ball_move)
     start_game();
}
function touchStarted() {
  mousePressed();
}


// puts the ball back to the center of the screen
// and stops the ball 
function resetBallPos() {
  ball_x = window_width/2;
  ball_y = window_height/2;
  ball_move = false;
}

function check_win() {
  if (player_score == 3) {
   start_text = "Congratulations, you win!"
    player_score = ai_score = 0;
    game_started = false;
  }
  if (ai_score == 3) {
    start_text = "Sorry, but the AI overlords crushed you."
    player_score = ai_score = 0;
    game_started = false;
  }
  
}

// the ai should be able to determine where the ball 
// will intersect the paddle once it returns to this side 
function left_ai_calculate_ball_y() {
  // check if the ball is moving left or up
  // we can assume it is headed toward the AI paddle (right)
  let predict_x = ball_x;
  let predict_y = ball_y;
  let current_ball_dir = ball_y_dir;
  
  // subtract the amount from x and y until we reach the top
  while (predict_x > left_paddle_x) {
    while (current_ball_dir == 'up' && predict_y >= 0 && predict_x > left_paddle_x) {
      predict_x -= 1;
      predict_y -= 1;
    }
    while (current_ball_dir == 'down' && predict_y <= window_height && predict_x > left_paddle_x) {
      predict_x -= 1;
      predict_y += 1;
    }
    if (predict_y <= 0) {
      current_ball_dir = 'down';
      predict_y = 1;
      predict_x -= 1;
    }
    if (predict_y >= window_height) {
      current_ball_dir ='up';
      predict_y = window_height-1;
      predict_x -=1;
    }
  }
  
  // before returning the actual value, it would be fun
  // to alter this just a bit depending on the difficulty.
  let offset = getRandomInt(ai_error_initial-difficulty * ai_error_tweak + ball_speed * ai_error_tweak);
  //print (offset);
  // decide whether to subtract or add the offset
  if (!perfect_ai) {
    // randomly add or take away some y value
    getRandomInt(2) == 1 ? predict_y += offset: predict_y -= offset;
  }
  return predict_y;
}



// the ai should be able to determine where the ball 
// will intersect the paddle once it returns to this side 
function right_ai_calculate_ball_y() {
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
      predict_y = 1;
      predict_x += 1;
    }
    if (predict_y >= window_height) {
      current_ball_dir ='up';
      predict_y = window_height-1;
      predict_x +=1;
    }
  }
  
  // before returning the actual value, it would be fun
  // to alter this just a bit depending on the difficulty.
  let offset = getRandomInt(ai_error_initial-difficulty * ai_error_tweak + ball_speed * ai_error_tweak);
  //print (offset);
  // decide whether to subtract or add the offset
  if (!perfect_ai) {
    // randomly add or take away some y value
    getRandomInt(2) == 1 ? predict_y += offset: predict_y -= offset;
  }
  print("right ai calculates: " + right_ai_find_ball_y);
  return predict_y;
}


function check_collision() {

  // collision with right paddle
  if (ball_y > right_paddle_y - paddle_height/2 &&
      ball_y < right_paddle_y + paddle_height/2 && 
      ball_x > right_paddle_x - paddle_width/2 &&
      ball_x < right_paddle_x + paddle_width/2)
    {
        left_ai_find_ball_y = left_ai_calculate_ball_y();
        ball_x_dir = 'left';
        if (ball_speed < MAX_BALL_SPEED){
          ball_speed += 0.25;
        }
    }
  
   // collision with left paddle
  if (ball_y > left_paddle_y - paddle_height/2 &&
      ball_y < left_paddle_y + paddle_height/2 && 
      ball_x > left_paddle_x - paddle_width/2 &&
      ball_x < left_paddle_x + paddle_width/2)
    {
        // we only want to calculate the ai move once
        if (ball_x_dir != 'right') {
          // collide
          right_ai_find_ball_y = right_ai_calculate_ball_y();
          ball_x_dir = 'right';
          if (ball_speed < MAX_BALL_SPEED){
            ball_speed += 0.25;
          }
        }
    }

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// stop from scolling down on spacebar press
window.addEventListener("keydown", function(event) {
  if (event.key === " ") {
    event.preventDefault();
  }
});

function setBackgroundDrawing(checked) {
  draw_background = checked;
}

function setPerfectAI(checked) {
  perfect_ai = checked;
}

function setUISlider(checked) {
  ui_slider = checked;
}


function setAIWarfare(checked) {
  ai_warfare = checked;
}