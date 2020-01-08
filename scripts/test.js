/* ---------- constants ----------- */

const player = document.getElementById('player');
player.style.left = "50%";
player.style.top = "50%";

const main = document.querySelector('main');

const scoreDisplay = document.querySelector('span');

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

const zombieSpawnPoints = [
  {'x':0,'y':0},
  {'x':windowLimitX-100,'y':0},
  {'x':0,'y':windowLimitY-100},
  {'x':windowLimitX-100,'y':windowLimitY-100},
  {'x':windowLimitX/2,'y':0},
  {'x':0,'y':windowLimitY/2},
  {'x':windowLimitX/2,'y':windowLimitY},
  {'x':windowLimitX, 'y': windowLimitY/2}
];

let zombieSpawnInterval;
let zombieSpeed = 10;
let zombieCount = 10;

const lootBox = [
  null,
  null,
  null,
  null,
  'loot-ftw',
  'loot-nuke'
];

const startBtn = document.querySelector('button');

/* ----------- functions ----------- */

function movePlayer(event) {
  let x = parseInt(player.offsetLeft);
  let y = parseInt(player.offsetTop);

  if(event.key === 'ArrowDown' || event.key === 's') {
    y += 5;
    player.style.top = y + 'px';
    player.style.background = 'url(./images/AH-People1.png) -46px 0';
  } else if (event.key === "ArrowUp" || event.key === 'w') {
    y -= 5;
    player.style.top = y + 'px';
    player.style.background = 'url(./images/AH-People1.png) -46px -144px';
  } else if (event.key === "ArrowLeft" || event.key === 'a') {
    x -= 5;
    player.style.left = x + 'px';
    player.style.background = 'url(./images/AH-People1.png) -46px -48px'
  } else if (event.key === "ArrowRight" || event.key === 'd') {
    x += 5;
    player.style.left = x + 'px';
    player.style.background = 'url(./images/AH-People1.png) -46px -96px';
  }
}

function createBulletElement() {
  const x = parseInt(player.offsetLeft) + (51 / 2);
  const y = parseInt(player.offsetTop) + (48 / 2);

  let bulletElement = document.createElement('div');
  bulletElement.classList.add('bullet');
  bulletElement.style.left = `${x}px`;
  bulletElement.style.top = `${y}px`;
  
  return bulletElement;
}

function fireBullet(event) {
  const x = parseInt(player.offsetLeft) + (48 / 2);
  const y = parseInt(player.offsetTop) + (51 / 2);

  const mouseClickedX = event.clientX;
  const mouseClickedY = event.clientY;

  const angle = calculateAngle(mouseClickedX - x, y - mouseClickedY);
  console.log(angle);

  const bullet = createBulletElement();
  main.insertAdjacentElement('beforeend', bullet);

  const speed = 100;
  const dx = speed * Math.abs(Math.cos(angle));
  const dy = speed * Math.abs(Math.sin(angle));
  moveBullet(bullet, angle, dx, dy);
}

function moveBullet(bullet, angle, dx, dy) {
  let bulletMoveInterval = setInterval(() => {
    let bulletX = parseInt(bullet.style.left);
    let bulletY = parseInt(bullet.style.top);
    console.log("hi");

    /* check for collision with zombies */
    let zombies = document.querySelectorAll('.zombie');
    zombies.forEach((zombie) => {
      if(checkBulletCollision(zombie, bullet)) {
        zombie.remove();
        bullet.remove();
        clearInterval(bulletMoveInterval);
      }
    });

    /* test just go straight across */
    // if (bulletX === windowLimitX) {
    //   bullet.remove();
    // } else {
    //   bullet.style.left = `${bulletX + dx}px`;
    // }
    if(angle <= 45) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX + (dx/2)}px`;
        bullet.style.top = `${bulletY - (dy/2)}px`;
      }
    } else if(angle < 90) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX + dx}px`;
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if (angle <= 110) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if(angle < 135) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - (dx/2)}px`;
        bullet.style.top = `${bulletY - (dy/2)}px`;
      }
    } else if (angle < 180) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - dx}px`;
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if(angle <= 200) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - dx}px`;
      }
    } else if (angle < 225) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - (dx/2)}px`;
        bullet.style.top = `${bulletY + (dy/2)}px`;
      }
    } else if (angle < 270) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - dx}px`;
        bullet.style.top = `${bulletY + dy}px`;
      }
    } else if (angle <= 290) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.top = `${bulletY + dy}px`;
      }
    } else if (angle <= 360) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX + dx}px`;
        bullet.style.top = `${bulletY + dy}px`;
      }
    }
  }, 60);
}

function calculateAngle(x, y) {
  let angle =  Math.atan2(y, x) * 180 / Math.PI;

  angle = (angle + 360) % 360;
  // angle = 360 - angle;

  return angle;
}

function createZombie() {
  const zombie = document.createElement('img');
  zombie.classList.add('zombie');
  const random = Math.floor(Math.random() * zombieSpawnPoints.length);

  // testing for now
  // zombie.style.left = `${windowLimitX - 100}px`;
  // zombie.style.top = `${windowLimitY - 100}px`;

  zombie.style.left = `${zombieSpawnPoints[random].x}px`;
  zombie.style.top = `${zombieSpawnPoints[random].y}px`;

  main.insertAdjacentElement('beforeend', zombie);

  moveZombie(zombie);
}

function moveZombie(zombie) {
  let zombieMoveInterval = setInterval(() => {
    const zombieX = parseInt(zombie.style.left);
    const zombieY = parseInt(zombie.style.top);

    const playerX = parseInt(player.offsetLeft);
    const playerY = parseInt(player.offsetTop);

    const angle = calculateAngle(playerX - zombieX, zombieY - playerY);
    console.log(angle);

    // const speed = 10;
    const speed = 30;
    const dx = speed * Math.abs(Math.cos(angle));
    const dy = speed * Math.abs(Math.sin(angle));

    console.log('zmove');

    if(checkZombiePlayerCollision(zombie)) {
      alert("Game Over");
    }

    let bullets = document.querySelectorAll('.bullet');
    bullets.forEach((bullet) => {
      if(checkBulletCollision(zombie, bullet)){
        bullet.remove();
        zombie.remove();
        zombie.classList.remove('zombie');
        zombie.classList.add('dead');
        clearInterval(zombieMoveInterval);
      }
    });

    /* test just go straight across */
    // if (zombieX === windowLimitX) {
    //   zombie.remove();
    //   clearInterval(zombieMoveInterval);
    // } else {
    //   zombie.style.left = `${zombieX + dx}px`;
    // }

    /* Reminder spawn points for zombies are the edges of the map */
    if(angle <= 90) {
      if(zombieX === windowLimitX || zombieY === windowLimitY ) {
        zombie.remove();
      } else {
        zombie.style.left = `${zombieX + dx}px`;
        zombie.style.top = `${zombieY - dy}px`;
      }
    } else if (angle <= 180) {
      if( zombieX === windowLimitX || zombieY === windowLimitY ) {
        zombie.remove();
      } else {
        zombie.style.left = `${zombieX - dx}px`;
        zombie.style.top = `${zombieY - dy}px`;
      }
    } else if (angle <= 270) {
      if(zombieX === windowLimitX || zombieY === windowLimitY ) {
        zombie.remove();
      } else {
        zombie.style.left = `${zombieX - dx}px`;
        zombie.style.top = `${zombieY + dy}px`;
      }
    } else if (angle <= 360) {
      if(zombieX === windowLimitX || zombieY === windowLimitY ) {
        zombie.remove();
      } else {
        zombie.style.left = `${zombieX + dx}px`;
        zombie.style.top = `${zombieY + dy}px`;
      }
    }
  }, 500);
}

function checkZombiePlayerCollision(zombie) {
  if(zombie.classList.contains('dead')) {
    return false;
  }
  const zombieLeft = parseInt(zombie.style.left);
  const zombieTop = parseInt(zombie.style.top);
  const zombieBottom = zombieTop + 80;
  const zombieRight = zombieLeft + 41;

  const playerLeft = parseInt(player.offsetLeft);
  const playerTop = parseInt(player.offsetTop);
  const playerBottom = playerTop + 48;
  const playerRight = playerLeft + 51;
  
  // if (playerLeft <= zombieRight && zombieRight <= playerRight) {
  //   if(playerTop <= zombieBottom && zombieBottom <= playerBottom){
  //     return true;
  //   } else if(playerTop <= zombieTop && zombieTop <= playerBottom) {
  //     return true;
  //   }
  //   return true;
  // }

  // if(playerLeft <= zombieLeft && zombieLeft <= playerRight) {
  //   if(playerTop <= zombieBottom && zombieBottom <= playerBottom) {
  //     return true;
  //   } else if(playerTop <= zombieTop &&zombieTop <= playerBottom) {
  //     return true;
  //   }
  //   return true;
  // }

  if(playerLeft <= zombieRight && zombieRight <= playerRight && playerTop <= zombieBottom && zombieBottom <= playerBottom) {
    return true;
  } 
  if (playerLeft <= zombieRight && zombieRight <= playerRight && playerTop <= zombieTop && zombieTop <= playerBottom) {
    return true;
  } 
  if (playerLeft <= zombieLeft && zombieLeft <= playerRight && playerTop <= zombieBottom && zombieBottom <= playerBottom) {
    return true;
  }
  if (playerLeft <= zombieLeft && zombieLeft <= playerRight && playerTop <= zombieTop &&zombieTop <= playerBottom) {
    return true;
  }
  return false;
}

function checkBulletCollision(bullet, zombie) {
  const zombieLeft = parseInt(zombie.style.left);
  const zombieTop = parseInt(zombie.style.top);
  const zombieBottom = zombieTop + 80;
  const zombieRight = zombieLeft + 41;

  const bulletLeft = parseInt(bullet.style.left);
  const bulletTop = parseInt(bullet.style.top);
  const bulletBottom = bulletTop + 20;
  const bulletRight = bulletLeft + 20;

  if (bulletLeft <= zombieRight && zombieRight <= bulletRight) {
    if(bulletTop <= zombieBottom && zombieBottom <= bulletBottom){
      return true;
    } else if(bulletTop <= zombieTop && zombieTop <= bulletBottom) {
      return true;
    }
  }

  if(bulletLeft <= zombieLeft && zombieLeft <= bulletRight) {
    if(bulletTop <= zombieBottom && zombieBottom <= bulletBottom) {
      return true;
    } else if(bulletTop <= zombieTop &&zombieTop <= bulletBottom) {
      return true;
    }
  }

  if(bulletLeft <= zombieRight && zombieRight <= bulletRight && bulletTop <= zombieBottom && zombieBottom <= bulletBottom) {
    return true;
  } else if (bulletLeft <= zombieRight && zombieRight <= bulletRight && bulletTop <= zombieTop && zombieTop <= bulletBottom) {
    return true;
  } else if (bulletLeft <= zombieLeft && zombieLeft <= bulletRight && bulletTop <= zombieBottom && zombieBottom <= bulletBottom) {
    return true;
  } else if (bulletLeft <= zombieLeft && zombieLeft <= bulletRight && bulletTop <= zombieTop &&zombieTop <= bulletBottom) {
    return true;
  }
  return false;
}

function createLoot(x, y) {
  const random = Math.floor(Math.random() * lootBox);
  const className = lootBox[random];
  if(className !== null) {
    const loot = document.createElement('img');
    loot.classList.add('loot');
    loot.style.left = `${x}px`;
    loot.style.top = `${y}px`;

    return loot;
  }
  return;
}

function checkLastZombie() {
  let zombieLength = document.querySelectorAll('.zombie');
  if(zombieLength.length <= 1) {
    return true;
  }
}

function increaseZombieCount() {
  zombieCount = zombieCount * 2;
}

function startGame() {
  const header = document.querySelector('section');
  header.style.display = 'none';

  window.addEventListener("mousedown", () => fireBullet(event));

  window.addEventListener('keydown', () => movePlayer(event));

  for(let i = 0; i < 2; i++) {
    createZombie();
  }
  let zombieSpawnInterval = setInterval(() => {
    if(checkLastZombie()) {
      increaseZombieCount();
      for(let i = 0; i <= zombieCount; i++) {
        createZombie();
      }
    }
  }, 5000);
}

/* ------ event listeners ----- */

// window.addEventListener("mousedown", () => fireBullet(event));

// window.addEventListener('keydown', () => movePlayer(event));

startBtn.addEventListener('click', startGame);
// startGame();