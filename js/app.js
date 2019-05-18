// Set starting level 1, win at 0
var level = 1;
var wins = 0;

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started
      this.x = x;
      this.y = y;
      this.speed = speed
      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
      this.x += this.speed * dt;

      //Set enemy back to left side of box when it reachs far right
      if (this.x > 450) {
        this.x = -80 ;
        this.speed = Math.floor((Math.random() * level) + 100) ;
      }

      // Collision Scenario
      if ((this.x > player.x - 80 && this.x < player.x + 80 )
      &&(this.y > player.y - 50 && this.y < player.y + 50 )) {

        //Set enemy back to starting position
        this.x = -100 ;
        //console.log(this.y, player.y);

        //player returns to original spot
        player.x = 202;
        player.y = 405;

        //Return to level 1 (reset speed)
        level = 1;

        //Return wins to 0
        wins = 0;
        document.querySelector('.wincount').innerHTML=wins;
      }
    };

    // Draw the enemy on the screen, required method for game
    render(){
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;
    this.sprite = 'images/char-pink-girl.png';
  };

  update() {
    //PLayers will not be able to step outside of the box
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > 400) {
      this.x = 400;
    }
    if (this.y > 380) {
      this.y = 380;
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput(arrowKeyPressed) {
    //The switch statement executes a block of code depending on different cases.
    switch (arrowKeyPressed) {
      case 'left':
        this.x -= this.movement + 50;
        break;
      case 'right':
        this.x += this.movement + 50;
        break;
      case 'up':
        this.y -= this.movement + 30;
        if(this.y < 0) {
          this.x = 202;
          this.y = 405;
          //Update level on scoreboard
          wins ++;
          document.querySelector('.wincount').innerHTML=wins;
        }
        level++;
        break;
      case 'down':
        this.y += this.movement + 30;
        break;
    }
  };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyLocation = [50, 135, 220];
let player = new Player(202,405,50);
//instantiate enemy and fill in array
enemyLocation.forEach((enemyLocationCoordinate) => {
  let enemy = new Enemy(0, enemyLocationCoordinate, 100 + Math.floor(Math.random() * 200));
  allEnemies.push(enemy);
	//console.log(allEnemies);
});

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
