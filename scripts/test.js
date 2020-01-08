/* ---------- constants ----------- */

const player = document.getElementById('player');
player.style.left = "50%";
player.style.top = "50%";

const main = document.querySelector('main');

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

const zombieSpawnPoints = [{'x':0,'y':0},{'x':windowLimitX-100,'y':0},{'x':0,'y':windowLimitY-100},{'x':windowLimitX-100,'y':windowLimitY-100}];

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
  }, 1000);
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
  zombie.style.left = `${0}px`;
  zombie.style.top = `${windowLimitY - 100}px`;

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

    const speed = 10;
    const dx = speed * Math.abs(Math.cos(angle));
    const dy = speed * Math.abs(Math.sin(angle));

    console.log('zmove');

    if(checkZombiePlayerCollision(zombie)) {
      alert("Game Over");
    }

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
  const zombieLeft = parseInt(zombie.style.left);
  const zombieTop = parseInt(zombie.style.top);
  const zombieBottom = zombieTop + 80;
  const zombieRight = zombieLeft + 41;

  const playerLeft = parseInt(player.offsetLeft);
  const playerTop = parseInt(player.offsetTop);
  const playerBottom = playerTop + 48;
  const playerRight = playerLeft + 51;
  
  if (playerLeft <= zombieRight && zombieRight <= playerRight) {
    if(playerTop <= zombieBottom && zombieBottom <= playerBottom){
      return true;
    } else if(playerTop <= zombieTop && zombieTop <= playerBottom) {
      return true;
    }
    return true;
  }

  if(playerLeft <= zombieLeft && zombieLeft <= playerRight) {
    if(playerTop <= zombieBottom && zombieBottom <= playerBottom) {
      return true;
    } else if(playerTop <= zombieTop &&zombieTop <= playerBottom) {
      return true;
    }
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
    return true;
  }

  if(bulletLeft <= zombieLeft && zombieLeft <= bulletRight) {
    if(bulletTop <= zombieBottom && zombieBottom <= bulletBottom) {
      return true;
    } else if(bulletTop <= zombieTop &&zombieTop <= bulletBottom) {
      return true;
    }
    return true;
  }
  return false;
}

/* ------ event listeners ----- */

window.addEventListener("mousedown", () => fireBullet(event));

window.addEventListener('keydown', () => movePlayer(event));

