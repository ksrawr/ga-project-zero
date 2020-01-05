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