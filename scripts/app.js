let zombieSpawnInterval;

class Survivor {
  constructor(image, x = 0, y = 0, vx, vy) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.health = 40;
    this.weapon = {
      type: 'pistol',
      image: "",
      damage: ""
    };
  }

  setImage(image) {
    this.image = image;
  }
  
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Bullet {
  constructor(image, x, y, vx, vy) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}

class Zombie {
  constructor(image, x, y, vx, vy, element) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = 3;
    this.element = element;
  }
}

class Game {
  constructor() {
    this.survivor = new Survivor();
    this.zombies = [];
    for(let i = 0; i < 1; i++) {
      this.zombies.push(new Zombie());
    }
    this.documentHeight = $(document).height();
    this.documentWidth = $(document).width();
  }

  startGame() {
    window.addEventListener('keydown', (event) => {
      let x = game.survivor.x;
      let y = game.survivor.y;
      if(event.key === 'ArrowDown' || event.key === 's') {
        y += 5;
        playerElement.style.top = y + 'px';
      } else if (event.key === "ArrowUp" || event.key === 'w') {
        y -= 5;
        playerElement.style.top = y + 'px';
      } else if (event.key === "ArrowLeft" || event.key === 'a') {
        x -= 5;
        playerElement.style.left = x + 'px';
      } else if (event.key === "ArrowRight" || event.key === 'd') {
        x += 5;
        playerElement.style.left = x + 'px';
      }
      game.survivor.updatePosition(x, y);
    });
    
    window.addEventListener('mousedown', (event) => {
    
      // const bulletTemplate = `<div id="bullet"></div>`;
      
      const mouseClickedX = event.clientX;
      const mouseClickedY = event.clientY;
    
      console.log(mouseClickedX);
      console.log(mouseClickedY);
    
      let bulletX = game.survivor.x + 10;
      let bulletY = game.survivor.y + 10;
      
      const bulletElement = document.createElement('div');
      bulletElement.setAttribute("class", "bullet");
      bulletElement.style.left = bulletX + 'px';
      bulletElement.style.top = bulletY + 'px';
    
      mainElement.insertAdjacentElement('afterbegin', bulletElement);
    
      /* Bullet should move until the it's reached the end of its trajectory */
      /* remove bullet when it reaches the end */
      const windowLimitX = game.documentWidth;
      const windowLimitY = game.documentHeight;
    
      const currentBullet = document.querySelector('.bullet');
    
      const angle = calculateAngle(mouseClickedX - game.survivor.x, game.survivor.y - mouseClickedY);
      console.log(angle);
    
      const radians = calculateRadians(mouseClickedX - game.survivor.x, game.survivor.y - mouseClickedY);
      console.log(radians);
    
    
      if(angle <= 90) {
        while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
          console.log("hello");
          // $(currentBullet).css({"left": bulletX, "top": bulletY});
          bulletX += Math.abs(1 * Math.cos(angle));
          bulletY -= Math.abs(1 * Math.sin(angle));
          currentBullet.style.left = bulletX + 'px';
          currentBullet.style.top = bulletY + 'px';
        }
      } else if(angle <= 180) {
          while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
            console.log("hello");
            bulletX -= Math.abs(1 * Math.cos(angle));
            bulletY -= Math.abs(1 * Math.sin(angle));
            currentBullet.style.left = bulletX + 'px';
            currentBullet.style.top = bulletY + 'px';
          }  
      } else if(angle <= 270) {
          while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
            console.log("hello");
            bulletX -= Math.abs(1 * Math.cos(angle));
            bulletY += Math.abs(1 * Math.sin(angle));
            currentBullet.style.left = bulletX + 'px';
            currentBullet.style.top = bulletY + 'px';
          } 
      } else if(angle <= 360) {
          while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
            console.log("hello");
            bulletX += Math.abs(1 * Math.cos(angle));
            bulletY += Math.abs(1 * Math.sin(angle));
            currentBullet.style.left = bulletX + 'px';
            currentBullet.style.top = bulletY + 'px';
          } 
      } 
    });

    // zombieSpawnInterval = setInterval(() => {this.createZombie()}, 5000);
  }

  createZombie() {
    // this.zombies = this.zombies.map((zombie) => {
    //   const zombieElement = document.createElement('img');
    //   zombieElement.setAttribute("class", "zombie");
    //   // spawnPoints contains all possible spawn points (x, y);
    //   const spawnPoints = [
    //     // top left
    //     {
    //       'x': 0,
    //       'y': 0
    //     },
    //     // top right
    //     {
    //       'x': $(document).width(),
    //       'y': 0
    //     },
    //     // bottom left
    //     {
    //       'x': 0,
    //       'y': $(document).height()
    //     },
    //     // bottom right
    //     {
    //       'x': $(document).width(),
    //       'y': $(document).height()
    //     },
    //     // // middle top
    //     // {
    //     //   'x': $(document).width() / 2,
    //     //   'y': 0
    //     // },
    //     // // middle bottom
    //     // {
    //     //   'x': $(document).width() / 2,
    //     //   'y': $(document).height()
    //     // },
    //     // // middle left
    //     // {
    //     //   'x': 0,
    //     //   'y': $(document).height() / 2
    //     // },
    //     // // middle right
    //     // {
    //     //   'x': $(document).width(),
    //     //   'y': $(document).height() / 2
    //     // }
    //   ];
    //   const random = Math.floor(Math.random() * spawnPoints.length);
    //   const x = spawnPoints[0].x;
    //   const y = spawnPoints[0].y;
    //   zombieElement.style.left = x  + 'px';
    //   zombieElement.style.top =  y + 'px';
    //   zombie.element = zombieElement;
    //   zombie.x = x;
    //   zombie.y = y;
    //   mainElement.insertAdjacentElement('beforeend', zombie.element);
    //   this.moveZombieToPlayer(zombie);
    // });

    const zombieElement = document.createElement('img');
    zombieElement.setAttribute("class", "zombie");
    // spawnPoints contains all possible spawn points (x, y);
    const spawnPoints = [
      // top left
      {
        'x': 0,
        'y': 0
      },
      // top right
      {
        'x': $(document).width(),
        'y': 0
      },
      // bottom left
      {
        'x': 0,
        'y': $(document).height()
      },
      // bottom right
      {
        'x': $(document).width(),
        'y': $(document).height()
      },
      // // middle top
      // {
      //   'x': $(document).width() / 2,
      //   'y': 0
      // },
      // // middle bottom
      // {
      //   'x': $(document).width() / 2,
      //   'y': $(document).height()
      // },
      // // middle left
      // {
      //   'x': 0,
      //   'y': $(document).height() / 2
      // },
      // // middle right
      // {
      //   'x': $(document).width(),
      //   'y': $(document).height() / 2
      // }
    ];
    
    const random = Math.floor(Math.random() * spawnPoints.length);
    const x = spawnPoints[0].x;
    const y = spawnPoints[0].y;
    zombieElement.style.left = x  + 'px';
    zombieElement.style.top =  y + 'px';
    mainElement.insertAdjacentElement('beforeend', zombieElement);
    this.moveZombieToPlayer(zombieElement);

    // const zombieElement = document.createElement('img');
    // zombieElement.setAttribute("class", "zombie");
    // const random = Math.floor(Math.random() * (300 - 50 + 1) + 50);
    // zombieElement.style.left =  + 'px';
    // game.zombie[0].element = zombieElement;
    // moveZombieToPlayer(game.zombie[0]);
  }

  moveZombieToPlayer(zombie) {
    // zombieMoveInterval = setInterval(() => {
    // let moveInterval = setInterval(() => {
    //   // get x of our zombie
    //   // get y of our zombie
    //   // calculate angle between zombie and survivor

      let x = parseInt(window.getComputedStyle(zombie).getPropertyValue('left'));
      let y = parseInt(window.getComputedStyle(zombie).getPropertyValue('top'));

      let angle = calculateAngle(game.survivor.x - x, y - game.survivor.y);

      console.log(angle);

    //   if(angle <= 90) {
    //       x += Math.abs(1 * Math.cos(angle));
    //       y -= Math.abs(1 * Math.sin(angle));
    //       zombie.style.left = x + 'px';
    //       zombie.style.top = y + 'px';
    //       if(this.checkZombieSurvivorCollision(zombie, playerElement)) {
    //         clearInterval(zombieSpawnInterval);
    //       }
    //   } else if(angle <= 180) {
    //         x -= Math.abs(1 * Math.cos(angle));
    //         y -= Math.abs(1 * Math.sin(angle));
    //         zombie.style.left = x + 'px';
    //         zombie.style.top = y + 'px';
    //         if(this.checkZombieSurvivorCollision(zombie, playerElement)) {
    //           clearInterval(zombieSpawnInterval);
    //         }
    //   } else if(angle <= 270) {
    //         console.log("hello");
    //         x += Math.abs(1 * Math.cos(angle));
    //         y -= Math.abs(1 * Math.sin(angle));
    //         zombie.style.left = x + 'px';
    //         zombie.style.top = y + 'px';
    //         if(this.checkZombieSurvivorCollision(zombie, playerElement)) {
    //           clearInterval(zombieSpawnInterval);
    //         }
    //   } else if(angle <= 360) {
    //     console.log("hello");
    //       x += Math.abs(1 * Math.cos(angle));
    //       y += Math.abs(1 * Math.sin(angle));
    //       zombie.style.left = x + 'px';
    //       zombie.style.top = y + 'px';
    //       if(this.checkZombieSurvivorCollision(zombie, playerElement)) {
    //         clearInterval(zombieSpawnInterval);
    //       }
    //   }
    //   console.log(x);
    //   console.log(y);
    // }, 5000);

      if(angle <= 90) {
        while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
          console.log("hello");
          angle = calculateAngle(game.survivor.x - x, y - game.survivor.y);
          x += Math.abs(1 * Math.cos(angle));
          y += Math.abs(1 * Math.sin(angle));
          zombie.style.left = x + 'px';
          zombie.style.top = y + 'px';
        }
      } else if(angle <= 180) {
          while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
            console.log("hello");
            angle = calculateAngle(game.survivor.x - x, y - game.survivor.y);
            x += Math.abs(1 * Math.cos(angle));
            y += Math.abs(1 * Math.sin(angle));
            zombie.style.left = x + 'px';
            zombie.style.top = y + 'px';
          }
      } else if(angle <= 270) {
          while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
            console.log("hello");
            angle = calculateAngle(game.survivor.x - x, y - game.survivor.y);
            x += Math.abs(1 * Math.cos(angle));
            y += Math.abs(1 * Math.sin(angle));
            zombie.style.left = x + 'px';
            zombie.style.top = y + 'px';
          }
      } else if(angle <= 360) {
        while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
          console.log("hello");
          angle = calculateAngle(game.survivor.x - x, y - game.survivor.y);
          x += Math.abs(1 * Math.cos(angle));
          y += Math.abs(1 * Math.sin(angle));
          zombie.style.left = x + 'px';
          zombie.style.top = y + 'px';
        }
      } 

      // if(angle <= 90) {
      //   while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
      //     console.log("hello");
      //     zombie.x += Math.abs(1 * Math.cos(angle));
      //     zombie.y -= Math.abs(1 * Math.sin(angle));
      //     zombie.element.style.left = zombie.x + 'px';
      //     zombie.element.style.top = zombie.y + 'px';
      //   }
      // } else if(angle <= 180) {
      //     while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
      //       console.log("hello");
      //       zombie.x -= Math.abs(1 * Math.cos(angle));
      //       zombie.y -= Math.abs(1 * Math.sin(angle));
      //       zombie.element.style.left = zombie.x + 'px';
      //       zombie.element.style.top = zombie.y + 'px';
      //     }
      // } else if(angle <= 270) {
      //     while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
      //       console.log("hello");
      //       zombie.x += Math.abs(1 * Math.cos(angle));
      //       zombie.y -= Math.abs(1 * Math.sin(angle));
      //       zombie.element.style.left = zombie.x + 'px';
      //       zombie.element.style.top = zombie.y + 'px';
      //     }
      // } else if(angle <= 360) {
      //   while(!this.checkZombieSurvivorCollision(zombie, game.survivor)) {
      //     console.log("hello");
      //     zombie.x += Math.abs(1 * Math.cos(angle));
      //     zombie.y += Math.abs(1 * Math.sin(angle));
      //     zombie.element.style.left = zombie.x + 'px';
      //     zombie.element.style.top = zombie.y + 'px';
      //   }
      // } 

    // }, 1000);
  }

  checkZombieSurvivorCollision(zombie, survivor) {
    const zombieLeft = parseInt(zombie.style.left);
    const zombieTop = parseInt(zombie.style.top);
    const zombieBottom = zombieTop - 80;
    const zombieRight = zombieLeft + 41;

    const survivorLeft = survivor.x;
    const survivorTop = survivor.y;
    const survivorRight = survivorLeft + 51;
    const survivorBottom = survivorTop - 48;

    console.log(survivorLeft);
    console.log(survivorTop);

    if(zombieRight <= survivorLeft || zombieLeft >= survivorRight) {
      if(zombieTop >= survivorTop && zombieTop >= survivorBottom) {
        console.log("Collides");
        return true;
      }
      console.log("Does not collide");
      return false;
    }
    console.log("Does not collide");
    return false;
  }

  gameOver() {
    clearInterval(zombieMoveInterval);
    alert('Game over. you ded');
  }
}

/* constants */
const playerElement = document.getElementById('player');
playerElement.style.left = "50%";
playerElement.style.top = "50%";
console.log(playerElement.offsetTop);
console.log(playerElement.offsetLeft);

const zombieElement = document.querySelector('zombie');

const bodyElement = document.querySelector('body');

const mainElement = document.querySelector('main');

const game = new Game();
game.startGame();

game.survivor.x = playerElement.offsetLeft;
game.survivor.y = playerElement.offsetTop;

// game.zombies[0].x = zombieElement.offsetLeft;
// game.zombies[0].y = zombieElement.offsetTop;


/* --------- FUNCTIONS ------------ */

// spawn zombieInRandomLocation but give a minimum distance of 50px away from player                                                                                                                                                 

function calculateAngle(x, y, mouseClickedX, mouseClickedY) {
  let angle =  Math.atan2(y, x) * 180 / Math.PI;

  angle = (angle + 360) % 360;
  // angle = 360 - angle;

  return angle;
}

function calculateRadians(x, y, mouseClickedX, mouseClickedY) {
  let radians =  Math.atan2(y, x);
  return radians;
}

/* --------EVENT LISTENERS ------- */
// window.addEventListener('keydown', (event) => {
//   let x = game.survivor.x;
//   let y = game.survivor.y;
//   if(event.key === 'ArrowDown' || event.key === 's') {
//     y += 5;
//     playerElement.style.top = y + 'px';
//   } else if (event.key === "ArrowUp" || event.key === 'w') {
//     y -= 5;
//     playerElement.style.top = y + 'px';
//   } else if (event.key === "ArrowLeft" || event.key === 'a') {
//     x -= 5;
//     playerElement.style.left = x + 'px';
//   } else if (event.key === "ArrowRight" || event.key === 'd') {
//     x += 5;
//     playerElement.style.left = x + 'px';
//   }
//   game.survivor.updatePosition(x, y);
// });

// window.addEventListener('mousedown', (event) => {

//   // const bulletTemplate = `<div id="bullet"></div>`;
  
//   const mouseClickedX = event.clientX;
//   const mouseClickedY = event.clientY;

//   console.log(mouseClickedX);
//   console.log(mouseClickedY);

//   let bulletX = game.survivor.x + 10;
//   let bulletY = game.survivor.y + 10;
  
//   const bulletElement = document.createElement('div');
//   bulletElement.setAttribute("class", "bullet");
//   bulletElement.style.left = bulletX + 'px';
//   bulletElement.style.top = bulletY + 'px';

//   mainElement.insertAdjacentElement('afterbegin', bulletElement);

//   /* Bullet should move until the it's reached the end of its trajectory */
//   /* remove bullet when it reaches the end */
//   const windowLimitX = game.documentWidth;
//   const windowLimitY = game.documentHeight;

//   const currentBullet = document.querySelector('.bullet');

//   const angle = calculateAngle(mouseClickedX - game.survivor.x, game.survivor.y - mouseClickedY);
//   console.log(angle);

//   const radians = calculateRadians(mouseClickedX - game.survivor.x, game.survivor.y - mouseClickedY);
//   console.log(radians);


//   console.log(bulletX);
//   // while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
//   //   console.log("hello");
//   //   bulletX += 5 * Math.cos(angle);
//   //   bulletY -= Math.abs(5 * Math.sin(angle));
//   //   currentBullet.style.left = bulletX + 'px';
//   //   currentBullet.style.top = bulletY + 'px';
//   // }
//   if(angle <= 90) {
//     while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
//       console.log("hello");
//       // $(currentBullet).css({"left": bulletX, "top": bulletY});
//       bulletX += Math.abs(2 * Math.cos(angle));
//       bulletY -= Math.abs(2 * Math.sin(angle));
//       currentBullet.style.left = bulletX + 'px';
//       currentBullet.style.top = bulletY + 'px';
//       location.reload();
//     }
//   } else if(angle <= 180) {
//       while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
//         console.log("hello");
//         bulletX -= Math.abs(2 * Math.cos(angle));
//         bulletY -= Math.abs(2 * Math.sin(angle));
//         currentBullet.style.left = bulletX + 'px';
//         currentBullet.style.top = bulletY + 'px';
//       }  
//   } else if(angle <= 270) {
//       while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
//         console.log("hello");
//         bulletX -= Math.abs(2 * Math.cos(angle));
//         bulletY += Math.abs(2 * Math.sin(angle));
//         currentBullet.style.left = bulletX + 'px';
//         currentBullet.style.top = bulletY + 'px';
//       } 
//   } else if(angle <= 360) {
//       while(bulletX > 0 && bulletX < windowLimitX && windowLimitY > bulletY && bulletY > 0) {
//         console.log("hello");
//         bulletX += Math.abs(2 * Math.cos(angle));
//         bulletY += Math.abs(2 * Math.sin(angle));
//         currentBullet.style.left = bulletX + 'px';
//         currentBullet.style.top = bulletY + 'px';
//       } 
//   } 
// });

