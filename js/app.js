let score = 1;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Setting the Enemy initial location
    this.x = Math.floor((Math.random() * 504) + -90);
    const rand = Math.floor(Math.random() * 3);
    if(rand == 0){
      this.y = 204;
    } else if(rand == 1){
      this.y = 121
    }else{
      this.y = 38;
    }
    //Setting the Enemy speed
    this.speed = Math.floor((Math.random() * 30) + 10) * score;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    //Updates the Enemy location
    if(this.x > 504){ //reach max
      this.x = -90;
      const rand = Math.floor(Math.random() * 3);
      if(rand == 0){
        this.y = 204;
      } else if(rand == 1){
        this.y = 121
      }else{
        this.y = 38;
      }
      this.speed = Math.floor((Math.random() * 30) + 10) * (score/2);
    }
    //Handles collision with the Player
    if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {
      player.x = 202;
      player.y = 370;

      allEnemies.forEach(function(enemy) {
        enemy.x = Math.floor((Math.random() * 504) + -90);
        const rand = Math.floor(Math.random() * 3);
        if(rand == 0){
          enemy.y = 204;
        } else if(rand == 1){
          enemy.y = 121
        }else{
          enemy.y = 38;
        }
      });

      score = 1;
    }

    document.querySelector('.score span').innerHTML = score-1;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // The image/sprite for our player, this uses
  this.sprite = 'images/char-boy.png';

  //Setting the Player initial location
  this.x = 202;
  this.y = 370;
};

Player.prototype.update = function(dt) { //I updated the position of player in Enemy.prototype.update function
  //The update method for the Player (can be similar to the one for the Enemy)

};

Player.prototype.render = function() {
  //The render method for the Player (use the code from the render method for the Enemy)
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress){
  if(keyPress == "right"){
    if(this.x < 404){
      this.x = this.x + 101;
    }
  }else if(keyPress == "left"){
    if(this.x > 0 ){
      this.x = this.x - 101;
    }
  }else if(keyPress == "up"){
    this.y = this.y - 83;
    if(this.y < 0){ //score++;
      this.x = 202;
      this.y = 370;
      score = score + 1;
    }
  }else{ //keyPress == "down"
    if(this.y < 370){
      this.y = this.y + 83;
    }
  }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
