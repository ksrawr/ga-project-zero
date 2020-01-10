/* ---------- constants ----------- */

const audio = document.getElementById('my_audio');

const player = document.getElementById('player');

const main = document.querySelector('main');

const scoreDisplay = document.querySelector('.score');
// player score
let score = 0;

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

scoreDisplay.style.left = `${windowLimitX - 200}px`;
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
  null,
  null,
  'loot-right-leg',
  'loot-left-shoulder',
  'loot-head',
  'loot-nuke'
];

let time = 25;
let backgroundChangeTime = 7;

const backgroundElem = document.getElementById('area-backdrop');

let gameRunning = false;

const startBtn = document.querySelector('.start');

/* ----------- functions ----------- */

function movePlayer(event) {
  let x = parseInt(player.offsetLeft);
  let y = parseInt(player.offsetTop);

  if(event.key === 'ArrowDown' || event.key === 's') {
    y += 5;
    player.style.top = y + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px 0';
  } else if (event.key === "ArrowUp" || event.key === 'w') {
    y -= 5;
    player.style.top = y + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px -144px';
  } else if (event.key === "ArrowLeft" || event.key === 'a') {
    x -= 5;
    player.style.left = x + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px -48px'
  } else if (event.key === "ArrowRight" || event.key === 'd') {
    x += 5;
    player.style.left = x + 'px';
    player.style.background = 'url(./images/AH-People12.png) -46px -96px';
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

  const bulletSound = new Audio('./sounds/Gun+1.wav');
  bulletSound.play();

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

    if(angle < 90) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX + dx}px`;
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
  return angle;
}

function createZombie() {
  const zombie = document.createElement('div');
  zombie.classList.add('zombie');
  const random = Math.floor(Math.random() * zombieSpawnPoints.length);

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
        clearInterval(zombieMoveInterval);
      }
    });

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

function checkCollision(a, b) {
  const aLeft = parseInt(a.style.left);
  const aTop = parseInt(a.style.top);
  const aBottom = aTop + parseInt(a.offsetHeight);
  const aRight = aLeft + parseInt(a.offsetWidth);

  const bLeft = parseInt(b.style.left);
  const bTop = parseInt(b.style.top);
  const bBottom = bTop + parseInt(b.offsetHeight);
  const bRight = bLeft + parseInt(b.offsetWidth);

  if (aLeft <= bLeft && bLeft <= aRight && aRight <= bRight) {
    if( aTop <= bTop && bTop <= aBottom && aBottom <= bBottom){
      return true;
    } else if(bTop <= aTop && aTop <= bBottom && bBottom <= aBottom) {
      return true;
    } else if(bTop <= aBottom && aBottom <= bBottom) {
      return true;
    }
  }

  if(bLeft <= aLeft && aLeft <= bRight && aRight) {
    if(bTop <= aBottom && aBottom <= bBottom) {
      return true;
    } else if(bTop <= aTop &&aTop <= bBottom) {
      return true;
    } else if(aTop <= bTop && bTop <= aBottom && aBottom <= bBottom) {
      return true;
    }
  }

  if(bLeft <= aRight && aRight <= bRight && bTop <= aBottom && aBottom <= bBottom) {
    return true;
  } else if (bLeft <= aRight && aRight <= bRight && bTop <= aTop && aTop <= bBottom) {
    return true;
  } else if (bLeft <= aLeft && aLeft <= bRight && bTop <= aBottom && aBottom <= bBottom) {
    return true;
  } else if (bLeft <= aLeft && aLeft <= bRight && bTop <= aTop &&aTop <= bBottom) {
    return true;
  }

  if(bTop <= aTop && aTop <= bBottom && bBottom <= aBottom) {
    if(aLeft <= bLeft && bRight <= aRight) {
      return true;
    }
  } else if (aTop <= bTop && bTop <= aBottom && aBottom <= bBottom) {
    if(aLeft <= bLeft && bRight <= aRight) {
      return true;
    }
  }
  return false;
}

function checkZombiePlayerCollision(zombie) {
  if(zombie.classList.contains('dead')) {
    return false;
  }
  if(checkCollision(player, zombie)) {
    return true;
  }
  return false;
}

function checkBulletCollision(bullet, zombie) {
  if(checkCollision(bullet, zombie)) {
    return true;
  }
  return false;
}

function createLoot(x, y) {
  const random = Math.floor(Math.random() * lootBox.length);
  const className = lootBox[random];
  if(className !== null || className !== 'loot-ftw') {
    const loot = document.createElement('div');
    loot.classList.add(className);
    loot.style.left = `${x}px`;
    loot.style.top = `${y}px`;
    return loot;
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
      if(checkCollision(player, nuke)) {
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
      if(zombie !== undefined ) {
        zombie.remove();
      }
      time = 25;
      clearInterval(timer);
      if(time >= 0) setTimer();
    }
    time--;
  }, 1000);
}

function startGame() {
  audio.play();
  console.log('game running');
  gameRunning = true;

  /* Remove Title Screen and Show Game Screen */
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

    if(backgroundChangeTime <= 0) {
      const screamAudio = new Audio('./sounds/scream.mp3');
      screamAudio.play();

      backgroundChangeTime = 7;
    }

    backgroundChangeTime--;
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

  const endDisplaySelection = document.getElementById('end-screen');
  endDisplaySelection.style.backgroundColor = 'black';
  endDisplaySelection.style.height = '100vh';
  endDisplaySelection.style.width = '100vw';
  endDisplaySelection.insertAdjacentElement('beforeend', scoreEnd);

  const h1Selection = document.getElementById('end-score');
  h1Selection.textContent = `GAME OVER. SCORE: ${score}`;

  gameRunning = false;
}

/* ------ event listeners ----- */

startBtn.addEventListener('click', startGame);

// const playAudio = () => {
//   console.log('playing', event)
//   audio.muted = false;
//   audio.play();
// }
// // audio.play()

// document.getElementsByTagName('body')[0].addEventListener('mouseover',playAudio);


