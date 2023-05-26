
function start_game() { 
  resetBallPos();
  left_ai_find_ball_y = left_ai_calculate_ball_y();
  right_ai_find_ball_y = right_ai_calculate_ball_y();
  ball.move = true;
  ball.speed = BALL_SPEED_INITIAL;
  start_text="";
  
}
// on mouse press, start the game of pong!
function mousePressed() {
   if (!ball.move)
     start_game();
}
function touchStarted() {
  mousePressed();
}


// puts the ball back to the center of the screen
// and stops the ball 
function resetBallPos() {
  ball.x = WINDOW_WIDTH/2;
  ball.y = WINDOW_HEIGHT/2;
  ball.move = false;
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
  let predict_x = ball.x;
  let predict_y = ball.y;
  let current_ball_dir = ball.y_dir;
  
  // subtract the amount from x and y until we reach the top
  while (predict_x > left_paddle.x) {
    while (current_ball_dir == 'up' && predict_y >= 0 && predict_x > left_paddle.x) {
      predict_x -= 1;
      predict_y -= 1;
    }
    while (current_ball_dir == 'down' && predict_y <= WINDOW_HEIGHT && predict_x > left_paddle.x) {
      predict_x -= 1;
      predict_y += 1;
    }
    if (predict_y <= 0) {
      current_ball_dir = 'down';
      predict_y = 1;
      predict_x -= 1;
    }
    if (predict_y >= WINDOW_HEIGHT) {
      current_ball_dir ='up';
      predict_y = WINDOW_HEIGHT-1;
      predict_x -=1;
    }
  }
  
  // before returning the actual value, it would be fun
  // to alter this just a bit depending on the difficulty.
  let offset = getRandomInt(AI_ERROR_INITIAL-difficulty * AI_ERROR_TWEAK + ball.speed * AI_ERROR_TWEAK);
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
  let predict_x = ball.x;
  let predict_y = ball.y;
  let current_ball_dir = ball.y_dir;
  
  // subtract the amount from x and y until we reach the top
  while (predict_x < right_paddle.x) {
    while (current_ball_dir == 'up' && predict_y >= 0 && predict_x < right_paddle.x) {
      predict_x += 1;
      predict_y -= 1;
    }
    while (current_ball_dir == 'down' && predict_y <= WINDOW_HEIGHT && predict_x < right_paddle.x) {
      predict_x += 1;
      predict_y += 1;
    }
    if (predict_y <= 0) {
      current_ball_dir = 'down';
      predict_y = 1;
      predict_x += 1;
    }
    if (predict_y >= WINDOW_HEIGHT) {
      current_ball_dir ='up';
      predict_y = WINDOW_HEIGHT-1;
      predict_x +=1;
    }
  }
  
  // before returning the actual value, it would be fun
  // to alter this just a bit depending on the difficulty.
  let offset = getRandomInt(AI_ERROR_INITIAL-difficulty * AI_ERROR_TWEAK + ball.speed * AI_ERROR_TWEAK);
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
  if (ball.y > right_paddle.y - PADDLE_HEIGHT/2 &&
      ball.y < right_paddle.y + PADDLE_HEIGHT/2 && 
      ball.x > right_paddle.x - PADDLE_WIDTH/2 &&
      ball.x < right_paddle.x + PADDLE_WIDTH/2)
    {
        left_ai_find_ball_y = left_ai_calculate_ball_y();
        ball.x_dir = 'left';
        if (ball.speed < BALL_SPEED_MAX){
          ball.speed += 0.25;
        }
    }
  
   // collision with left paddle
  if (ball.y > left_paddle.y - PADDLE_HEIGHT/2 &&
      ball.y < left_paddle.y + PADDLE_HEIGHT/2 && 
      ball.x > left_paddle.x - PADDLE_WIDTH/2 &&
      ball.x < left_paddle.x + PADDLE_WIDTH/2)
    {
        // we only want to calculate the ai move once
        if (ball.x_dir != 'right') {
          // collide
          right_ai_find_ball_y = right_ai_calculate_ball_y();
          ball.x_dir = 'right';
          if (ball.speed < BALL_SPEED_MAX){
            ball.speed += 0.25;
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