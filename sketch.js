var player, fightObj, itemObj, checkObj, turnStart = 1;
var maxHp, hp, def, dext, crit, attk, critChance, xp = 0, lvl;
var statsP = [hp, def, dext, crit, attk];
var gameState = "", enemyState = "", turn = "";
var monster, sign = 1;
var maxHpM, hpM, defM, dextM, critM, attkM, critChanceM, xpM, critMS = 0;
var statsM = [maxHpM, hpM, defM, dextM, critM, attkM];
var turnTaken, hideStats, hideTime, hideMiss, hideMissM;
var missSprite, monsterDes, hurtTime;

var eventDelay, monsTime, monsTran;

var db, form, player, playCount = 0, allPlayer, playerNames = [], names = 0;


function setup(){
  canvas = createCanvas(800,800);
  db = firebase.database();
  game = new Game();
  game.start();
}




function draw(){
  if(sign == 0)
  {
    if(hurtTime !== 0)
    {
      background(0);
    }
    if(hurtTime > 0)
    {
      background(255,0,0,hurtTime)
      hurtTime = hurtTime - 5;
    }
    if(hurtTime === 0)
    {
      hurtTime = null;
      turn = "player";
      turnStart = 1;
    }

    if(hurtTime == 250)
    {
      if(critMS == 0)
      {
        if(def !== 0)
        {
          hp = hp - (Math.round(attkM / def));
        }
        if(def === 0)
        {
          hp = hp - attkM;
        }
      }
      if(critMS == 1)
      {
        if(def !== 0)
        {
          hp = hp - Math.round(attkM + (critM * random(5,13) / def));
        }
        if(def === 0)
        {
          hp = hp - Math.round(attkM + (critM * random(8,17))); 
        }
        console.log("critted");
        critMS = 0;
      }
    }


    //================== FIGHTING MONSTER / BOSS ======================
    if(gameState == "rest")
    {
      textAlign(CENTER);
      textSize(40);
      fill("white");
      text("Press 'S' to summon monster", 400, 400);

      if(keyCode === 83)
      {
        keyCode = 0;
        var ran = Math.round(random(0,3));
        monster = new Monster(ran);
        gameState = "active";
        enemyState = "normal";
        fightObj = new Fight;
        itemObj = new Item;
        checkObj = new Check;
        if(lvl == undefined)
        {
          maxHp = 30;
          hp = 30;
          def = 0;
          attk = 5;
          crit = 10;
          dext = 5;
          critChance = 10;
        }
        turn = "player";
        turnTaken = 0;
      }
    }
    //================== FIGHTING MONSTER / BOSS ======================


    if(gameState == "active" || gameState == "taking_turn" || gameState == "win" || gameState == "lose")
    {
      //================== CHOOSING ATTACK / ITEM / ACT ======================
      if(turn == "player")
      {
        if(turnStart == 1)
        {
          fightObj.chosen = 1;
        }
      }
      //================== CHOOSING ATTACK / ITEM ======================

      //================== PLAYER STATS ======================
      textAlign(CENTER);
      textSize(20);
      fill("white");
      text("HP : " + hp + " / " + maxHp + "     DEF : " + def, 400, 660);
      //================== PLAYER STATS ======================

      if(enemyState == "normal" && turn == "player")
      {
        //================== CHECKING ======================
        if(checkObj.chosen == 1 && keyCode === ENTER)
        {
          keyCode = 0;
          checkObj.selected();
          gameState = "taking_turn";
        }
        if(keyCode === ESCAPE && turnTaken == 1 && checkObj.chosen == 1)
        {
          keyCode = 0;
          turn = "enemy";
          gameState = "active";
          hideTime = 0;
        }
        //================== CHECKING ======================

        //================== Fighting ======================
        if(fightObj.chosen == 1 && keyCode === ENTER)
        {
          keyCode = 0;
          fightObj.chosen = 0;
          fightObj.selected();
          if(hpM > 0)
          {
            turn = "enemy";
          }
        }
        //================== Fighting ======================
      }

      if(hideStats === 1)
      {
        hideStats = null;
        hideTime = 100
      }
      if(hideMiss === 1)
      {
        hideMiss = null;
        hideTime = 20;
        missSprite = createSprite(monster.body.x, monster.body.y);
        missSprite.velocityY = -7;
        missSprite.lifetime = 10;
        missSprite.visible = false;
      }


      if(turn == "enemy")
      {
        fightObj.chosen = 0;
        itemObj.chosen = 0;
        checkObj.chosen = 0;
        enemyState = "attack";
        turn = "enemy2";     
      }

      if(turn == "enemy2")
      {
        keyCode = 0;
        if(enemyState == "attack")
        {
          enemyState = "wait";
          monsterDes = 70;
        }

        if(enemyState == "wait")
        { 
          if(monsterDes > 0)
          {
            monsterDes = monsterDes - 1;
          }
          if(monsterDes === 0)
          {
            monster.attack();
            enemyState = "normal";
          }
        }
      }

      if(hpM <= 0)
      {
        gameState = "win"
      }

      if(gameState == "win")
      {
        monsTime = 0;
        monsTran = 255;
        gameState = "win2";
        game.start();
        xp = xp + xpM;
        console.log(xp);
        player.xp = xp;

        console.log(player.xp);

        player.update();
      }




      fightObj.display();
      itemObj.display();
      checkObj.display();

      drawSprites();

      if(hideTime > 0)
      {
        console.log(hideTime);
        hideTime = hideTime - 1;
        if(hideStats === null)
        {
          showMonstStats();
          if(hideTime == 0)
          {
            turn = "enemy";
            gameState = "active";
          }
        }
        if(hideMiss === null)
        {
          textSize(40);
          textAlign(CENTER);
          fill("red");
          stroke("white");
          strokeWeight(3);
          text("MISS",missSprite.x,missSprite.y);
          if(hideTime == 15)
          {
            missSprite.velocityY = 0;
          }
          if(hideTime <= 14)
          {
            missSprite.y = missSprite.y + 6;
          }
          if(hideTime == 0)
          {
            turn = "enemy";
          }
        }
      }



    }

    if(gameState == "win2")
    {
      if(monsTime < 2000)
      {
        if(monsTime <= 50)
        {
          monster.body.shapeColor = rgb(135,135,135,monsTran);
          monsTran = monsTran - 6;
          console.log(monsTran);
        }
        if(monsTime >= 100)
        {
          monster.body.destroy();
          textAlign(CENTER);
          textSize(40);
          strokeWeight(3);
          stroke("red");
          fill("red");
          text("YOU WIN! YOU GAINED " + xpM + " XP!", 400,400);
          textSize(25);
          strokeWeight(2);
          fill(255,0,0,70);
          text("PRESS W TO RESET", 400,440);
        }
        if(keyIsDown(87))
        {
          reset();
        }
        drawSprites();
        monsTime = monsTime + 1;
      }
    }

    if(keyCode == 75)
    {
      keyCode = 0;
      hpM = 0;
    }
  }
}





function showMonstStats() {
  fill(135,135,135);
  strokeWeight(2);
  stroke(135, 135 ,135);
  rectMode(CENTER);
  rect(600, 200, 250, 150, 5, 5, 5, 5);
  textAlign(CENTER);
  textSize(20);
  fill("white");
  text("HP : " + hpM + " / " + maxHpM, 600, 150);
  text("DEF : " + defM, 600, 189);
  text("DEXT : " + dextM, 600, 228);
  text("ATTK : " + attkM, 600, 266);
}

















function keyPressed(){
  if(gameState == "active")
  {
    if(gameState !== "taking_turn")
    {
      if(keyCode === LEFT_ARROW)
      {
        if(fightObj.chosen == 1 && eventDelay == 0)
        {
          fightObj.chosen = 0;
          itemObj.chosen = 1;
          eventDelay = 1;
        }
        if(itemObj.chosen == 1 && eventDelay == 0)
        {
          checkObj.chosen = 1;
          itemObj.chosen = 0;
          eventDelay = 1;
        }
        if(checkObj.chosen == 1 && eventDelay == 0)
        {
          fightObj.chosen = 1;
          checkObj.chosen = 0;
          eventDelay = 1;
        }
        turnStart = 0;
      }
      if(keyCode === RIGHT_ARROW)
      {
        if(fightObj.chosen == 1 && eventDelay == 0)
        {
          fightObj.chosen = 0;
          checkObj.chosen = 1;
          eventDelay = 1;
        }
        if(checkObj.chosen == 1 && eventDelay == 0)
        {
          checkObj.chosen = 0;
          itemObj.chosen = 1;
          eventDelay = 1;
        }
        if(itemObj.chosen == 1 && eventDelay == 0)
        {
          fightObj.chosen = 1;
          itemObj.chosen = 0;
          eventDelay = 1;
        }
        turnStart = 0;
      }
    }
  }
}

function keyReleased(){
  eventDelay = 0;
}

function reset(){
  itemObj.chosen = 0;
  checkObj.chosen = 0;
  fightObj.chosen = 0;
  turnStart = 1;
  gameState = "rest";
}