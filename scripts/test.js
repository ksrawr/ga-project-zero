/* ---------- constants ----------- */

const player = document.getElementById('player');
player.style.left = "50%";
player.style.top = "50%";

const playerX = player.offsetLeft;
const playerY = player.offsetTop;

const main = document.querySelector('main');

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

/* ----------- functions ----------- */

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
  // const x = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  // const y = parseInt(window.getComputedStyle(player).getPropertyValue('top'));

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

    /* test just go straight across */
    // if (bulletX === windowLimitX) {
    //   bullet.remove();
    // } else {
    //   bullet.style.left = `${bulletX + dx}px`;
    // }

    if(angle <= 90) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
      } else {
        bullet.style.left = `${bulletX + dx}px`;
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if (angle <= 180) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
      } else {
        bullet.style.left = `${bulletX - dx}px`;
        bullet.style.top = `${bulletY - dy}px`;
      }
    } else if (angle <= 270) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
      } else {
        bullet.style.left = `${bulletX - dx}px`;
        bullet.style.top = `${bulletY + dy}px`;
      }
    } else if (angle <= 360) {
      if(bulletX === 0 || bulletX === windowLimitX || bulletY === 0 || bulletY === windowLimitY ) {
        bullet.remove();
      } else {
        bullet.style.left = `${bulletX + dx}px`;
        bullet.style.top = `${bulletY + dy}px`;
      }
    }
  }, 60);
}

function calculateAngle(x, y, mouseClickedX, mouseClickedY) {
  let angle =  Math.atan2(y, x) * 180 / Math.PI;

  angle = (angle + 360) % 360;
  // angle = 360 - angle;

  return angle;
}

/* ------ event listeners ----- */

window.addEventListener("mousedown", () => fireBullet(event));