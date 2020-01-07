/* ---------- constants ----------- */

const player = document.getElementById('player');

const main = document.querySelector('main');

const windowLimitX = $(document).width();
const windowLimitY = $(document).height();

/* ----------- functions ----------- */

function createBulletElement() {
  const x = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  const y = parseInt(window.getComputedStyle(player).getPropertyValue('top'));

  let bulletElement = document.createElement('div');
  bulletElement.classList.add('bullet');
  bulletElement.style.left = `${x + 10}px`;
  bulletElement.style.top = `${y + 10}px`;
  
  return bulletElement;
}

function fireBullet(event) {
  const x = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  const y = parseInt(window.getComputedStyle(player).getPropertyValue('top'));

  const mouseClickedX = event.clientX;
  const mouseClickedY = event.clientY;

  const angle = calculateAngle(mouseClickedX - x, y - mouseClickedY);
  console.log(angle);

  const bullet = createBulletElement();
  main.insertAdjacentElement('beforeend', bullet);

  const speed = 50;
  const dx = speed * Math.abs(Math.cos(angle));
  const dy = speed * Math.abs(Math.sin(angle));
  moveBullet(bullet, dx, dy);
}

function moveBullet(bullet, dx, dy) {
  // let moveBulletInterval = setInterval(() => {
  //   let bulletX = parseInt(bullet.style.left);
  //   let bulletY = parseInt(bullet.style.top);

  //   console.log(bulletX);
  //   if(angle <= 90) {
  //     if(bulletX < windowLimitX && windowLimitY > bulletY && bulletX > 0 && bulletY > 0) {
  //       console.log('update');
  //       bullet.style.left = `${bulletX + (Math.abs(1 * Math.cos(angle)))}px`;
  //       bullet.style.top = `${bulletY - (Math.abs(1 * Math.sin(angle)))}px`;
  //     } else {
  //       bullet.remove();
  //     }
  //   } else if (angle <= 180) {

  //   } else if (angle <= 270) {

  //   } else if( angle <= 360) {
  //     console.log()
  //     // if(bulletX < windowLimitX && windowLimitY > bulletY && bulletX > 0 && bulletY > 0) {
  //     //   bullet.style.left = `${bulletX + (Math.abs(1 * Math.cos(angle)))}px`;
  //     //   bullet.style.top = `${bulletY + (Math.abs(1 * Math.sin(angle)))}px`;
  //     // }
  //     if(bulletX === windowLimitX) {
  //       bullet.remove();
  //     }
  //     bullet.style.left = `${bulletX + (Math.abs(1 * Math.cos(angle)))}px`;
  //     bullet.style.top = `${bulletY + (Math.abs(1 * Math.sin(angle)))}px`;
  //   }
  // }, 10);
  
  // test just go straight across
  let bulletMoveInterval = setInterval(() => {
    let bulletX = parseInt(bullet.style.left);
    console.log(dx);
    if (bulletX === windowLimitX) {
      bullet.remove();
    } else {
      bullet.style.left = `${bulletX + dx}px`;
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