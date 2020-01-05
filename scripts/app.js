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
  }

  startGame() {
    
  }
}

/* constants */
const playerElement = document.getElementById('player');

const bodyElement = document.querySelector('body');

const game = new Game();
game.startGame();

console.log(bodyElement);
/* --------EVENT LISTENERS ------- */

let x = 0;
let y = 0;
document.addEventListener('keydown', (event) => {
  if(event.key === 'ArrowDown') {
    y += 5;
    playerElement.style.top = y + 'px';
  } else if (event.key === "ArrowUp") {
    y -= 5;
    playerElement.style.top = y + 'px';
  } else if (event.key === "ArrowLeft") {
    x -= 5;
    playerElement.style.left = x + 'px';
  } else if (event.key === "ArrowRight") {
    x += 5;
    playerElement.style.left = x + 'px';
  }
});

document.addEventListener('mousedown', (event) => {

  const bulletTemplate = `<div id="bullet" style="top:${event.screenY}; left:${event.screenX};></div>`;
  
  bodyElement.insertAdjacentElement('afterbegin', bulletTemplate);
});