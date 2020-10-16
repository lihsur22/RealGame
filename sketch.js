var player, fightObj, itemObj, checkObj, turnStart = 1;
var maxHp, hp, def, dext, crit, attk, critChance, xp = 0, lvl = 1, xpNeeded;
var statsP = [];
var gameState = "", enemyState = "", turn = "";
var monster, sign = 1;
var maxHpM, hpM, defM, dextM, critM, attkM, critChanceM, xpM, critMS = 0;
var statsM = [];
var turnTaken, hideStats, hideTime, hideMiss, hideMissM, showDmg;
var missSprite, monsterDes, hurtTime;

var eventDelay, monsTime, monsTran, loseTime = 0, loseTran = 0, loseTran2 = 0;

var db, form, player, playCount = 0, allPlayer, playerNames = [], playerPassws = [];
var dmgDealt;


function setup(){
  canvas = createCanvas(800,800);
  db = firebase.database();
  game = new Game();
  game.start();
}




function draw(){
  if(sign == 1)
  {
    game.a();
    background(0);
  }
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
          hp = hp - Math.round(attkM + (critM * random(1,2.5) / def));
        }
        if(def === 0)
        {
          hp = hp - Math.round(attkM + (critM * random(1,2.5))); 
        }
        console.log("critted");
        critMS = 0;
      }
    }

    //================== LOGGING IN ==================
    if(gameState == "logging_in")
    {
      xp = player.xp;
      lvl = player.lvl;
      textAlign(CENTER);
      fill("white");
      textSize(15);
      text("Logged In Sucessfully!",400,60);
    }
    //================== LOGGING IN ==================



    //================== FIGHTING MONSTER / BOSS ======================
    if(gameState == "rest" || gameState == "logging_in")
    {
      textAlign(CENTER);
      textSize(40);
      fill("white");
      text("Press 'S' to summon monster", 400, 400);
      textSize(15);
      text("Use " + "\"" + player.name + "\"" + " as Name and " + "\"" + player.passw + "\"" + " as Password for when you log back in",400,30);
      textSize(20);
			text("XP : " + player.xp + "                  " + "LVL : " + player.lvl, 400, 430);
			
			if(xp == xpNeeded)
			{
        game.start();
				xp = xp - xpNeeded;
				player.xp = xp;
				lvl += 1;
				player.lvl = lvl;
				player.update();
			}
			if(lvl == 1)
			{
				maxHp = 30;
				def = 0;
				attk = 5;
				crit = 6;
				dext = 5;
				critChance = 10;
				xpNeeded = 60;
			}
			if(lvl == 2)
			{
				maxHp = 35;
				def = 2;
				attk = 5;
				crit = 7;
				dext = 8;
				critChance = 15;
				xpNeeded = 140;
			}

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
				
				hp = maxHp;
        statsP = [maxHp, def, dext, crit, attk];
        statsM = [maxHpM, defM, dextM, critM, attkM];
        if(statsM >= statsP)
        {
          console.log("TOO STRONG");
        } else
        {
          console.log("CAN FIGHT");
        }
        turn = "player";
        turnTaken = 0;
      }
    }
    //================== FIGHTING MONSTER / BOSS ======================


    if(gameState == "active" || gameState == "taking_turn" || gameState == "win" || gameState == "lose")
    {
      //================== CHOOSING ATTACK / HEAL / ACT ======================
      if(turn == "player")
      {
        if(turnStart == 1)
        {
          fightObj.chosen = 1;
        }
      }
      //================== CHOOSING ATTACK / HEAL / ACT ======================

      //================== PLAYER STATS ======================
      if(gameState !== "lose")
      {
        textAlign(CENTER);
        textSize(20);
        fill("white");
        text("HP : " + hp + " / " + maxHp + "     DEF : " + def + "     LVL : " + lvl + "     DEXT : " + dext, 400, 660);
      }
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

        //================== HEALING =======================
        if(itemObj.chosen == 1 && keyCode === ENTER)
        {
          keyCode = 0;
          if(hp !== maxHp)
          {
            itemObj.chosen = 0;
            itemObj.selected();
            turn = "enemy";
          }
        }
        //================== HEALING =======================
      }

      if(hp > maxHp)
      {
        hp = maxHp;
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
			if(showDmg === 1)
      {
        showDmg = null;
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
        gameState = "win";
      }
      if(hp <= 0)
      {
        gameState = "lose";
      }

      //==================== WIN ====================
      if(gameState == "win")
      {
        monsTime = 0;
        monsTran = 0;
				gameState = "win2";
				missSprite.destroy();
        game.start();
        xp = xp + xpM;
        player.xp = xp;
        //console.log(gameState);
        player.update();
      }
      //==================== WIN ====================



      //==================== LOSE ====================
      if(gameState == "lose")
      {
				missSprite.destroy();
        if(loseTime < 10000)
        {
          if(loseTime >= 50)
          {
            background(loseTran2, 0, 0);
            if(loseTran2 < 165)
            {
              loseTran2 += 5
            }
          }
          if(loseTime >= 100)
          {
            monster.body.destroy();
            textAlign(CENTER);
            textSize(40);
            strokeWeight(3);
            stroke(255,0,0,loseTran);
            fill(255,0,0,loseTran);
            text("YOU DIED", 400,400);
            textSize(25);
            strokeWeight(2);
            text("PRESS W TO RESET", 400,440);
            if(loseTran < 255)
            {
              loseTran = loseTran + 5;
            }
          }
          loseTime = loseTime + 1
        }
        if(keyIsDown(87))
        {
          reset();
        }
      }
      //==================== LOSE ====================


      if(gameState !== "lose")
      {
        fightObj.display();
        itemObj.display();
        checkObj.display();
      }

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
            hideStats = undefined;
          }
        }
        if(hideMiss === null || showDmg === null)
        {
          textSize(40);
          textAlign(CENTER);
          fill("red");
          stroke("white");
					strokeWeight(3);
					if(hideMiss === null && showDmg === undefined)
					{
						text("MISS",missSprite.x,missSprite.y);
					}
					if(showDmg === null && hideMiss === undefined)
					{
						text("- " + dmgDealt,missSprite.x,missSprite.y);
					}
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
						hideMiss = undefined;
						showDmg = undefined;
          }
        }
      }
    }

    if(gameState == "win2")
      {
        if(monsTime < 10000)
        {
          if(monsTime >= 100)
          {
            monster.body.destroy();
            textAlign(CENTER);
            textSize(40);
            strokeWeight(3);
            stroke(255,0,0,monsTran);
            fill(255,0,0,monsTran);
            text("YOU WIN! YOU GAINED " + xpM + " XP!", 400,400);
            textSize(25);
            strokeWeight(2);
            text("PRESS W TO RESET", 400,440);
            if(monsTran < 255)
            {
              monsTran = monsTran + 5;
            }
          }
          drawSprites();
          monsTime = monsTime + 1;
        }
        if(keyIsDown(87))
        {
        	reset();
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
  loseTime = 0;
  loseTran = 0;
  loseTran2 = 0;
}