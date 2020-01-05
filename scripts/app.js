class Survivor {
  constructor(image, x, y, vx, vy) {
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

const bodyElement = document.querySelector('body');

const mainElement = document.querySelector('main');

const game = new Game();
game.startGame();

/* --------- FUNCTIONS ------------ */


/* --------EVENT LISTENERS ------- */

let x = 0;
let y = 0;
document.addEventListener('keydown', (event) => {
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
  
  const mouseClickedX = event.screenX;
  const mouseClickedY = event.screenY;
  
  const bulletElement = document.createElement('div');
  bulletElement.setAttribute("id", "bullet");
  bulletElement.style.left = 10 + 'px';
  bulletElement.style.top = 10 + 'px';

  mainElement.insertAdjacentElement('afterbegin', bulletElement);

  
});