/* ---------- constants ----------- */

const player = document.getElementById('player');

const main = document.querySelector('main');

const scoreDisplay = document.querySelector('.score');
// player score
let score = 0;

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

console.log(windowLimitX);
console.log(windowLimitY);

scoreDisplay.style.left = `${windowLimitX - 100}px`;
scoreDisplay.style.top = `0px`;
scoreDisplay.style.display = 'none';

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
let zombieCount = 3;

const lootBox = [
  // null,
  // null,
  // null,
  // null,
  // 'loot-ftw',
  'loot-nuke'
];

let time = 15;

let gameRunning = false;

const startBtn = document.querySelector('button');

/* ----------- functions ----------- */

function movePlayer(event) {
  let x = parseInt(player.offsetLeft);
  let y = parseInt(player.offsetTop);

  if(checkNukeCollision()) {
    nukeZombies();
  }

  if(event.key === 'ArrowDown' || event.key === 's') {
    y += 5;
    player.style.top = y + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px 0';
    if(checkNukeCollision()) {
      nukeZombies();
    }
  } else if (event.key === "ArrowUp" || event.key === 'w') {
    y -= 5;
    player.style.top = y + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px -144px';
    if(checkNukeCollision()) {
      nukeZombies();
    }
  } else if (event.key === "ArrowLeft" || event.key === 'a') {
    x -= 5;
    player.style.left = x + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px -48px'
    if(checkNukeCollision()) {
      nukeZombies();
    }
  } else if (event.key === "ArrowRight" || event.key === 'd') {
    x += 5;
    player.style.left = x + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px -96px';
    if(checkNukeCollision()) {
      nukeZombies();
    }
  }
  if(checkNukeCollision()) {
    nukeZombies();
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

  const bullet = createBulletElement();
  main.insertAdjacentElement('beforeend', bullet);

  const speed = 50;
  const dx = speed * Math.abs(Math.cos(angle));
  const dy = speed * Math.abs(Math.sin(angle));
  moveBullet(bullet, angle, dx, dy);
}

function moveBullet(bullet, angle, dx, dy) {
  let bulletMoveInterval = setInterval(() => {
    let bulletX = parseInt(bullet.style.left);
    let bulletY = parseInt(bullet.style.top);

    /* check for collision with zombies */
    let zombies = document.querySelectorAll('.zombie');
    zombies.forEach((zombie) => {
      if(checkBulletCollision(zombie, bullet)) {
        zombie.classList.remove('zombie');
        zombie.classList.add('dead');
        
        // zombie.classList.add('loot-nuke');
        const lootX = parseInt(zombie.style.left);
        const lootY = parseInt(zombie.style.top);
        const loot = createLoot(lootX,lootY);
        main.insertAdjacentElement('beforeend', loot);

        score = score + 50;
        scoreDisplay.textContent = `SCORE: ${score}`;
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
  }, 50);
}

function calculateAngle(x, y) {
  let angle =  Math.atan2(y, x) * 180 / Math.PI;

  angle = (angle + 360) % 360;
  // angle = 360 - angle;

  return angle;
}

function createZombie() {
  const zombie = document.createElement('div');
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
    if(zombie.classList.contains('dead')) {
      zombie.remove();
    } else if(zombie.classList.contains('nuked')) {
      setTimer(zombie);
      return;
    }

    const zombieX = parseInt(zombie.style.left);
    const zombieY = parseInt(zombie.style.top);

    const playerX = parseInt(player.offsetLeft);
    const playerY = parseInt(player.offsetTop);

    const angle = calculateAngle(playerX - zombieX, zombieY - playerY);

    // const speed = 10;
    const speed = 30;
    const dx = speed * Math.abs(Math.cos(angle));
    const dy = speed * Math.abs(Math.sin(angle));

    if(checkZombiePlayerCollision(zombie)) {
      clearInterval(zombieMoveInterval);
      clearInterval(zombieSpawnInterval);
      zombie.classList.add('dead');
      endGame();
    }

    let bullets = document.querySelectorAll('.bullet');
    bullets.forEach((bullet) => {
      if(checkBulletCollision(zombie, bullet)){
        // bullet.remove();
        // zombie.remove();
        // zombie.classList.remove('zombie');
        // zombie.classList.add('dead');
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
        zombie.style.left = `${zombieX + dx}px`;
        zombie.style.top = `${zombieY - dy}px`;
    } else if (angle <= 180) {
        zombie.style.left = `${zombieX - dx}px`;
        zombie.style.top = `${zombieY - dy}px`;
    } else if (angle <= 270) {
        zombie.style.left = `${zombieX - dx}px`;
        zombie.style.top = `${zombieY + dy}px`;
    } else if (angle <= 360) {
        zombie.style.left = `${zombieX + dx}px`;
        zombie.style.top = `${zombieY + dy}px`;
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
  console.log("we working");
  const random = Math.floor(Math.random() * lootBox);
  // const className = lootBox[random];
  const className = lootBox[0];
  if(className !== null || className !== 'loot-ftw') {
    console.log("whattt");
    const loot = document.createElement('div');
    loot.classList.add('loot-nuke');
    loot.style.left = `${x}px`;
    loot.style.top = `${y}px`;
    return loot
  }
}

function checkNukeCollision() {
  let nukes = document.querySelectorAll('.loot-nuke');
  let nukeCollides = false;
  if(nukes.length > 0) {
    const playerLeft = parseInt(player.offsetLeft);
    const playerTop = parseInt(player.offsetTop);
    const playerRight = playerLeft + 48;
    const playerBottom = playerTop + 51;
    nukes.forEach((nuke) => {
      const nukeLeft = parseInt(nuke.style.left);
      const nukeTop = parseInt(nuke.style.top);
      const nukeRight = nukeLeft + 31;
      const nukeBottom = nukeTop + 31;
      
      if (playerLeft <= nukeLeft && nukeLeft <= playerRight && playerRight <= nukeRight) {
        if( playerTop <= nukeTop && nukeTop <= playerBottom && playerBottom <= nukeBottom){
          nuke.remove();
          nukeCollides = true;
        } else if(nukeTop <= playerTop && playerTop <= nukeBottom && nukeBottom <= playerBottom) {
          nuke.remove();
          nukeCollides = true;
        }
      }
    
      if(nukeLeft <= playerLeft && playerLeft <= nukeRight && playerRight) {
        if(nukeTop <= playerBottom && playerBottom <= nukeBottom) {
          nuke.remove();
          nukeCollides = true;
        } else if(nukeTop <= playerTop &&playerTop <= nukeBottom) {
          nuke.remove();
          nukeCollides = true;
        }
      }
    
      if(nukeLeft <= playerRight && playerRight <= nukeRight && nukeTop <= playerBottom && playerBottom <= nukeBottom) {
        nuke.remove();
        nukeCollides = true;
      } else if (nukeLeft <= playerRight && playerRight <= nukeRight && nukeTop <= playerTop && playerTop <= nukeBottom) {
        nuke.remove();
        nukeCollides = true;
      } else if (nukeLeft <= playerLeft && playerLeft <= nukeRight && nukeTop <= playerBottom && playerBottom <= nukeBottom) {
        nuke.remove();
        nukeCollides = true;
      } else if (nukeLeft <= playerLeft && playerLeft <= nukeRight && nukeTop <= playerTop &&playerTop <= nukeBottom) {
        nuke.remove();
        nukeCollides = true;
      }
    });
  }
  return nukeCollides;
}

function nukeZombies() {
  const kaboomSound = new Audio('./sounds/Kaboom.mp3');
  kaboomSound.play();
  const explosionSound = new Audio('./sounds/Explosion+9.wav');
  explosionSound.play();  let zombies = document.querySelectorAll('.zombie');
  zombies.forEach((zombie) => {
    zombie.classList.remove('zombie');
    // zombie.classList.add('dead');
    zombie.classList.add('nuked');
  });
  score = score + 400;
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

const setTimer = (zombie) => {
  // function to run, time to wait to call function
  const timer = setInterval(() => {
    // used to stop setInterval
    if(time <= 0) {
      zombie.remove();
      clearInterval(timer);
      if(time >= 0) setTimer();
    }
    time--;
  }, 1000);
}

function startGame() {
  gameRunning = true;
  const header = document.querySelector('section');
  header.style.display = 'none';

  main.style.display = 'block';

  player.style.left =  '50%';
  player.style.top =  '50%';

  scoreDisplay.style.display = '';

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
    score = score + 5;
    scoreDisplay.textContent = `SCORE: ${score}`;
  }, 5000);
}

function endGame() {
  if(!gameRunning) {
    return;
  }
  main.style.display = "none";
  
  const zombies = document.querySelectorAll('.zombie');
  zombies.forEach((zombie) => zombie.remove());

  const nukes = document.querySelectorAll('.nuked');
  nukes.forEach((nuke) => nuke.remove());

  player.remove();

  const scoreEnd = document.createElement('p');
  scoreEnd.setAttribute('id', 'end-score');
  // scoreEnd.style.textAlign = "center";

  const endDisplaySelection = document.getElementById('end-screen');
  endDisplaySelection.style.height = '100vh';
  endDisplaySelection.style.width = '100vw';
  endDisplaySelection.insertAdjacentElement('beforeend', scoreEnd);

  const h1Selection = document.getElementById('end-score');
  h1Selection.textContent = `GAME OVER. SCORE: ${score}`;

  gameRunning = false;
}

/* ------ event listeners ----- */

// window.addEventListener("mousedown", () => fireBullet(event));

// window.addEventListener('keydown', () => movePlayer(event));

startBtn.addEventListener('click', startGame);