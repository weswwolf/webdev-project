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
    if (ball_x > window_width) {
      // human score
      player_score +=1;
    } else { ai_score += 1;}
    check_win();
    resetBallPos();
    
  } 
}

function move_player() {

    if (ai_warfare) {
    if (ball_x_dir == 'right') {
        move_left_ai_paddle(window_height/2);
        return;
    }
    move_left_ai_paddle(left_ai_find_ball_y);
    return;
    }
    if (ui_slider) {
        // check for slider value to move paddle
        if (left_paddle_y > touch_slider.val && left_paddle_y > paddle_height/2) {
            left_paddle_y -= paddle_speed;
        }
        // check for slider value to move paddle
        if (left_paddle_y < touch_slider.val && left_paddle_y < window_height - paddle_height/2) {
            left_paddle_y += paddle_speed;
        }
    }
    else {
        // on keypress W move left paddle UP
        if (keyIsDown(87) && left_paddle_y > paddle_height/2) {
            left_paddle_y -= paddle_speed;
        }
        // on keypress S move left paddle DOWN
        if (keyIsDown(83) && left_paddle_y < window_height - paddle_height/2) {
            left_paddle_y += paddle_speed;
        }

    }
    // space bar to play game for convenience
    if (keyIsDown(32)) {
        mousePressed();
    }

}

function move_left_ai_paddle (to_this_y) {
  // padding used to prevent the paddle from moving back and forth
  // once it has reached the area it is supposed to be in.
  let padding = 1;
  if (left_paddle_y < to_this_y - padding && left_paddle_y < window_height - paddle_height/2) {
    left_paddle_y += paddle_speed;
  }
  else if (left_paddle_y > to_this_y + padding && left_paddle_y > paddle_height/2) {
    left_paddle_y -= paddle_speed;
  }
}

function move_right_ai_paddle (to_this_y) {
  // padding used to prevent the paddle from moving back and forth
  // once it has reached the area it is supposed to be in.
  let padding = 1;
  if (right_paddle_y < to_this_y - padding && right_paddle_y < window_height - paddle_height/2) {
    right_paddle_y += paddle_speed;
  }
  else if (right_paddle_y > to_this_y + padding && right_paddle_y > paddle_height/2) {
    right_paddle_y -= paddle_speed;
  }
}

function move_right_ai() {
  // if the ball is moving left, go back to center
  if (ball_x_dir == 'left') {
    move_right_ai_paddle(window_height/2);
    return;
  }
  move_right_ai_paddle(right_ai_find_ball_y);
}