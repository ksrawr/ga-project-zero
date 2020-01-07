/* ---------- constants ----------- */

const player = document.getElementById('player');
player.style.left = "50%";
player.style.top = "50%";

const main = document.querySelector('main');

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

const zombieSpawnPoints = [{'x':0,'y':0},{'x':windowLimitX,'y':0},{'x':0,'y':windowLimitY},{'x':windowLimitX,'y':windowLimitY}];

/* ----------- functions ----------- */

function movePlayer(event) {
  let x = parseInt(player.offsetLeft);
  let y = parseInt(player.offsetTop);

  if(event.key === 'ArrowDown' || event.key === 's') {
    y += 5;
    player.style.top = y + 'px';
  } else if (event.key === "ArrowUp" || event.key === 'w') {
    y -= 5;
    player.style.top = y + 'px';
  } else if (event.key === "ArrowLeft" || event.key === 'a') {
    x -= 5;
    player.style.left = x + 'px';
  } else if (event.key === "ArrowRight" || event.key === 'd') {
    x += 5;
    player.style.left = x + 'px';
  }
}

function createBulletElement() {
  const x = parseInt(player.offsetLeft);
  const y = parseInt(player.offsetTop);

  let bulletElement = document.createElement('div');
  bulletElement.classList.add('bullet');
  bulletElement.style.left = `${x + 10}px`;
  bulletElement.style.top = `${y + 10}px`;
  
  return bulletElement;
}

function fireBullet(event) {
  const x = parseInt(player.offsetLeft);
  const y = parseInt(player.offsetTop);

  const mouseClickedX = event.clientX;
  const mouseClickedY = event.clientY;

  const angle = calculateAngle(mouseClickedX - x, y - mouseClickedY);
  console.log(angle);

  const bullet = createBulletElement();
  main.insertAdjacentElement('beforeend', bullet);

  const speed = 0.5 / 2;
  const dx = speed * Math.abs(Math.cos(angle));
  const dy = speed * Math.abs(Math.sin(angle));
  moveBullet(bullet, angle, dx, dy);
}

function moveBullet(bullet, angle, dx, dy) {
  let bulletMoveInterval = setInterval(() => {
    let bulletX = parseInt(bullet.style.left);
    let bulletY = parseInt(bullet.style.top);
    console.log("hi");

    /* test just go straight across */
    // if (bulletX === windowLimitX) {
    //   bullet.remove();
    // } else {
    //   bullet.style.left = `${bulletX + dx}px`;
    // }

    if(angle <= 90) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX + dx}px`;
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if (angle <= 180) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - dx}px`;
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if (angle <= 270) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
        clearInterval(bulletMoveInterval);
      } else {
        bullet.style.left = `${bulletX - dx}px`;
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
  }, 100);
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
  zombie.style.left = `0px`;
  zombie.style.top = `0px`;

  main.insertAdjacentElement('beforeend', zombie);

  findZombieCoordinates(zombie);
}

function findZombieCoordinates(zombie) {
  const zombieX = parseInt(zombie.style.left);
  const zombieY = parseInt(zombie.style.top);

  const playerX = parseInt(player.offsetLeft);
  const playerY = parseInt(player.offsetTop);

  const angle = calculateAngle(playerX - zombieX, zombieY - playerY);
  console.log(angle);

  const speed = 100;
  const dx = speed * Math.abs(Math.cos(angle));
  const dy = speed * Math.abs(Math.sin(angle));

  moveZombie(zombie, angle, dx, dy);
}

function moveZombie(zombie, angle, dx, dy) {
  let zombieMoveInterval = setInterval(() => {
    const zombieX = parseInt(zombie.style.left);
    const zombieY = parseInt(zombie.style.top);

    console.log('zmove');

    /* test just go straight across */
    // if (zombieX === windowLimitX) {
    //   zombie.remove();
    //   clearInterval(zombieMoveInterval);
    // } else {
    //   zombie.style.left = `${zombieX + dx}px`;
    // }

    /* Reminder spawn points for zombies are the edges of the map */
    if(angle <= 90) {
      if(zombieX === 0 || zombieX === windowLimitX || zombieY === 0 || zombieY === windowLimitY ) {
        zombie.remove();
      } else {
        zombie.style.left = `${zombieX + dx}px`;
        zombie.style.top = `${zombieY - dy}px`;
      }
    } else if (angle <= 180) {
      if(zombieX === 0 || zombieX === windowLimitX || zombieY === 0 || zombieY === windowLimitY ) {
        zombie.remove();
      } else {
        zombie.style.left = `${zombieX - dx}px`;
        zombie.style.top = `${zombieY - dy}px`;
      }
    } else if (angle <= 270) {
      if(zombieX === 0 || zombieX === windowLimitX || zombieY === 0 || zombieY === windowLimitY ) {
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
  }, 1000);
}

/* ------ event listeners ----- */

window.addEventListener("mousedown", () => fireBullet(event));

window.addEventListener('keydown', () => movePlayer(event));

