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
  constructor(image, x, y, vx, vy) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = 3;
  }
}

class Game {
  constructor() {
    this.survivor = new Survivor();
    this.zombies = [];
    for(let i = 0; i < 10; i++) {
      this.zombies.push(new Zombie());
    }
    this.documentHeight = $(document).height();
    this.documentWidth = $(document).width();
  }

  startGame() {

  }
}

/* constants */
const playerElement = document.getElementById('player');
playerElement.style.left = "50%";
playerElement.style.top = "50%";
console.log(playerElement.offsetTop);
console.log(playerElement.offsetLeft);

const bodyElement = document.querySelector('body');

const mainElement = document.querySelector('main');

const game = new Game();
game.startGame();

game.survivor.x = playerElement.offsetLeft;
game.survivor.y = playerElement.offsetTop;

/* --------- FUNCTIONS ------------ */


// function calculateAngle(x, y, mouseClickedX, mouseClickedY) {
//   // let angle = Math.atan(mouseClickedY - y, mouseClickedX - x) * 180 / Math.PI;
//   let self = Math.sqrt(x ** 2 + y ** 2);
//   // console.log(self);
//   let mouse = Math.sqrt(mouseClickedX ** 2 + mouseClickedY ** 2);
//   // console.log(mouse);
//   let vectorProduct = x * mouseClickedX + y * mouseClickedY;
//   // console.log(vectorProduct);
//   let radians = Math.acos(vectorProduct/(self * mouse));

//   return radians * (180/Math.PI);
// }

function calculateAngle(x, y, mouseClickedX, mouseClickedY) {
  let angle =  Math.atan2(y, x) * 180 / Math.PI;

  angle = (angle + 360) % 360;
  // angle = 360 - angle;

  return angle;
}

/* --------EVENT LISTENERS ------- */
document.addEventListener('keydown', (event) => {
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

document.addEventListener('mousedown', (event) => {

  // const bulletTemplate = `<div id="bullet"></div>`;
  
  const mouseClickedX = event.clientX;
  const mouseClickedY = event.clientY;

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
  // console.log(currentBullet);

  const angle = calculateAngle(mouseClickedX - game.survivor.x, game.survivor.y - mouseClickedY);
  console.log(angle);
  
});