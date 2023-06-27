let player;
let enemies = [];
let bullets = [];
let enemyBullets = [];
let wave = 1;
let waveStarted = true;
let gameState = "menu";
let pressed = false;
let storeOpen = false;
let score = 0;
let storeButton;
let bulletBoostCost = 50;
let bulletBoostCount = 1;
let startButton;
let optionsButton;


function setup() {

  createCanvas(windowWidth, windowHeight);

  player = new Player();

  createWave();

  storeButton = createButton('Store');
  storeButton.position(10, 10);
  storeButton.mousePressed(toggleStore);
  storeButton.addClass('myButton');
}

function toggleStore() {
  storeOpen = !storeOpen;
  if (storeOpen) {
    bulletBoostButton = createButton('Bullet Boost: ' + bulletBoostCost);
    bulletBoostButton.position(width / 4 + 20, height / 4 + 20);
    bulletBoostButton.mousePressed(buyBulletBoost);
  } else {
    bulletBoostButton.remove();
  }
}

function draw() {
  background(220);

  if (gameState === "menu") {
    startMenu();
  } else if (gameState === "playing") {
    player.show();
    player.move();

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].show();
      bullets[i].move();

      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
        continue;
      }

      for (let j = enemies.length - 1; j >= 0; j--) {
        if (bullets[i].hits(enemies[j])) {
          if (enemies[j].health === 0) {
            score += enemies[j].type;
            enemies.splice(j,1);
          }
          if (bullets.includes(bullets[i])) {
            bullets.splice(i,1);
          }
          break;
        }
      }
    }

  

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].show();
      enemyBullets[i].move();

      if (player.hits(enemyBullets[i])) {
        console.log('Game Over');
        noLoop();
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].show();
      enemies[i].move();

      if (player.hits(enemies[i])) {
        console.log('Game Over');
        noLoop();
      }

      if (random(1) < 0.01) {
        for (let j = 0; j < enemies[i].type; j++) {
          let enemyBullet = new EnemyBullet(enemies[i].x,enemies[i].y);
          enemyBullets.push(enemyBullet);
        }
      }
    }

    if (enemies.length === 0 && gameState === "playing") {
      textSize(32);
      fill(0);
      text("Press Enter", width/2 - 85, height/2);
      text("to start next wave", width/2 -130, height/2+40);

      gameState = "waiting";
      noLoop();
    }
  }
  
  fill(255);
  rect(-10, -10, -10, -10);
  
  fill(0);
  textSize(16);
  text("Score: " + score, width - 100, 32);
  
  if (storeOpen) {
    fill(255);
    rect(width / 4 - 20, height / 4, width / 2, height / 2);

   

  }
}
  function keyPressed() {

    if (keyCode === ENTER && gameState === "menu") {
      gameState = "playing";
      loop();
    }

      if (keyCode === LEFT_ARROW) {

        player.setDir(-1);

      } else if (keyCode === RIGHT_ARROW) {

        player.setDir(1);
        
      } else if (key === ' ') {
        for (let i = 0; i < bulletBoostCount; i++) {
          let offset = (i - (bulletBoostCount - 1) / 2) * 20;
          let bullet = new Bullet(player.x + offset, player.y);
          bullets.push(bullet);
        }
        
      } else if (keyCode === ENTER && gameState === "waiting") {
        wave++;
        createWave();
        gameState = "playing";
        loop();
      }

      if (key === 'f') {

        let fs = fullscreen();
        fullscreen(!fs);

      }

  }

function mouseClicked() {
  if (mouseX > 10 && mouseX < 90 && mouseY > 10 && mouseY < 40) {
    storeOpen = !storeOpen;
  }
}

function buyBulletBoost() {
  if (score >= bulletBoostCost) {
    score -= bulletBoostCost;
    bulletBoostCount++;
    bulletBoostCost *= 2;
  }
}

function keyReleased() {
  player.setDir(0);
}

function createWave() {
  for(let i = 0; i < wave; i++){
    for(let j = 0; j < 10; j++){
      let x = 50 + j * 75;
      let y = 50 + i * 50;
      let type;
      if (wave < 2) {
        type = 1;
      } else if (wave < 3) {
        type = random([1,2]);
      } else {
        type = random([1,2,3]);
      }
      let enemy = new Enemy(x,y,type);
      enemies.push(enemy);
    }
  }
}



function startMenu() {
  fill(255);  
  rect(width / 4 - 20, height / 4, width / 2, height / 2);
  fill(0);
  textSize(32);
  text("Game Title", width / 2 - 85, height / 2 - 40);

  startButton = createButton('Start');
  startButton.position(width / 2 - startButton.width / 2, height / 2);
  startButton.mousePressed(startGame);
  
  optionsButton = createButton('Options');
  optionsButton.position(width / 2 - optionsButton.width / 2, height / 2 + startButton.height + 10);

  startButton.addClass('menu-button');
optionsButton.addClass('menu-button');
}

function startGame() {
    gameState = "playing";
    loop();
    startButton.remove();
    optionsButton.remove();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}