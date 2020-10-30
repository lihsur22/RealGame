var player, fightObj, itemObj, checkObj, turnStart = 1;
var maxHp, hp, def, dext, crit, attk, critChance, xp = 0, lvl = 1, xpNeeded = 0, bravery = 0, state = "";
var statsP = [];
var gameState = "", enemyState = "", turn = "";
var monster, sign = 1;
var maxHpM, hpM, defM, dextM, critM, attkM, critChanceM, xpM, critMS = 0, name, ability, bossMons = 0;
var statsM = [];
var turnTaken, hideStats, hideTime, hideMiss, hideMissM, showDmg;
var shine = 0, missSprite, monsterDes, hurtTime = 0, poisonTime = 0, poisonedFor = 0;

var eventDelay, monsTime, monsTran, loseTime = 0, loseTran = 0, loseTran2 = 0;

var db, form, player, playCount = 0, allPlayer, playerNames = [], playerPassws = [];
var dmgDealt;

var dmgSnd, lvlupSnd, battleSong, winSnd, healSnd, menuSong, boss1Song;
var song1Tim = 0, menuSongTim = 0, boss1SongTim = 0;

var monsts = [];

//var a = 0, lim = 100000000, j = 2;

function preload(){
  soundFormats('ogg');
  dmgSnd = loadSound("assets/sounds/snd_damage");
  lvlupSnd = loadSound("assets/sounds/snd_levelup");
  winSnd = loadSound("assets/sounds/snd_win");
  healSnd = loadSound("assets/sounds/snd_save1")

  battleSong = loadSound("assets/sounds/battle");
  menuSong = loadSound("assets/sounds/mus_wind");
  boss1Song = loadSound("assets/sounds/checkers")
}


function setup(){
  canvas = createCanvas(800,800);

  /*Aproximating PI for no reason
  for(var i = 1; i <= lim; i += 2)
  {
    a = a + (Math.pow(-1,j)/i);
    if(i == lim - 1)
    {
      console.log(a*4);
    }
    j = j + 1
  }
  */

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
    background(0);
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
      dmgSnd.play();
      if(critMS == 0)
      {
        if(def !== 0)
        {
          hp = hp - (Math.round(attkM / def));
        }
        if(def === 1)
        {
          hp = hp - (Math.round(attkM - (attkM / 10)));
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
      if(menuSongTim == 250)
      {
        menuSongTim = 0;
      }
      if(menuSongTim < 250)
      {
        if(menuSongTim == 1)
        {
          menuSong.play();
        }
        menuSongTim++;
      }

      textAlign(CENTER);
      textSize(40);
      fill("white");
      text("Press 'S' to summon monster", 400, 400);
      textSize(15);
      text("Use " + "\"" + player.name + "\"" + " as Name and " + "\"" + player.passw + "\"" + " as Password for when you log back in",400,30);
      textSize(20);
			text("XP : " + player.xp + "                  " + "LVL : " + player.lvl, 400, 430);
			
			if(xp >= xpNeeded && xpNeeded !== 0)
			{
        lvlupSnd.play();
        game.start();
				xp = xp - xpNeeded;
				player.xp = xp;
				lvl += 1;
				player.lvl = lvl;
				player.update();
      }

      if(lvl !== 1)
      {
        xpNeeded = ((10 * lvl * lvl) + (50 * lvl));
      }
      
      //================= LVL =================
			if(lvl == 1)
			{
				maxHp = 30;
				def = 0;
				attk = 5;
				crit = 6;
				dext = 5;
				critChance = 10;
				xpNeeded = 30;
			}
			if(lvl == 2)
			{
        
        maxHp = 35;
				def = 2;
				attk = 5;
				crit = 7;
				dext = 8;
        critChance = 15;
        /*
        maxHp = 5;
				def = 1;
				attk = 1;
				crit = 1;
				dext = 1;
        critChance = 15;
        */
      }
      if(lvl == 3)
			{
				maxHp = 40;
				def = 2;
				attk = 7;
				crit = 7;
				dext = 10;
				critChance = 20;
      }
      if(lvl == 4)
			{
				maxHp = 45;
				def = 3;
				attk = 8;
				crit = 8;
				dext = 11;
				critChance = 25;
      }
      if(lvl == 5)
			{
				maxHp = 50;
				def = 3;
				attk = 9;
				crit = 12;
				dext = 15;
				critChance = 35;
      }
      if(lvl == 6)
			{
				maxHp = 55;
				def = 3;
				attk = 10;
				crit = 12;
				dext = 18;
				critChance = 50;
      }
      if(lvl == 7)
			{
				maxHp = 60;
				def = 4;
				attk = 11;
				crit = 13;
				dext = 22;
				critChance = 55;
      }
      if(lvl == 8)
			{
				maxHp = 65;
				def = 6;
				attk = 14;
				crit = 13;
				dext = 25;
				critChance = 60;
      }
      if(lvl == 9)
			{
				maxHp = 70;
				def = 9;
				attk = 16;
				crit = 15;
				dext = 30;
				critChance = 75;
      }
      if(lvl == 10)
			{
				maxHp = 75;
        def = 11;
				attk = 18;
				crit = 16;
				dext = 37;
				critChance = 75;
      }
      //================= LVL =================

      if(keyCode === 83 && player.index != null)
      {
        menuSong.stop();
        keyCode = 0;
        //monster = new Monster(lvl);
        monsts.push(new Monster(lvl));
        gameState = "active";
        enemyState = "normal";
        fightObj = new Fight;
        itemObj = new Item;
        checkObj = new Check;
				
				hp = maxHp;
        statsP = [maxHp, def, dext, crit, attk];
        statsM = [maxHpM, defM, dextM, critM, attkM];
        for(var i = 0; i < 1; i++)
        {
          if(statsM[i] > statsP[i] && statsM[i + 2] > statsP[i + 2] && statsM[i + 3] > statsP[i + 3] && statsM[i + 4] > statsP[i + 4])
          {
            console.log("TOO STRONG");
            gameState = "fightFlight";
          } else
          {
            console.log("CAN FIGHT");
          }
        }
        turn = "player";
        turnTaken = 0;
        song1Tim = 0;
      }
    }
    //================== FIGHTING MONSTER / BOSS ======================

    if(gameState == "fightFlight")
    {
      turn = "";
      textAlign(CENTER);
      textSize(40);
      fill("white");
      text("This monster is stronger than you\nfor now", 400, 400);
      textSize(20);
      text("Press 'C' to continue anyway\nPress 'T' to flee\n\nOn continuing now, your gained \"xp\" shall be tripled!", 400, 490);
      if(keyCode === 67 && player.index != null)
      {
        bravery = 1;
        keyCode = 0;
        gameState = "active";
        turn = "player";
      }
    }

    if(gameState == "active" || gameState == "taking_turn" || gameState == "win" || gameState == "lose")
    {
      
      if(gameState != "win" && gameState != "lose" && bossMons == true)
      {
        if(boss1SongTim == 2550)
        {
          boss1SongTim = 0;
        }
        if(boss1SongTim < 2550)
        {
          if(boss1SongTim == 1)
          {
            boss1Song.play();
          }
          boss1SongTim++;
        }
      }
      if(gameState != "win" && gameState != "lose" && bossMons == false)
      {
        if(song1Tim == 2550)
        {
          song1Tim = 0;
        }
        if(song1Tim < 2550)
        {
          if(song1Tim == 1)
          {
            battleSong.play();
          }
          song1Tim++;
        }
      }

      if(poisonTime == 0 && hurtTime == null)
      {
        if(shine <= 0)
        {
          shine = 250;
        }
        if(shine > 0)
        {
          background(50, 50, 50, shine);
          shine = shine - 10;
        }
      }
      //================== CHOOSING ATTACK / HEAL / ACT ======================
      if(turn == "player")
      {
        for(var i = 0; i < monsts.length; i++)
        {
          monsts[i].display();
        }
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
        noStroke();
        text("HP : " + hp + " / " + maxHp + "     DEF : " + def + "     LVL : " + lvl + "     DEXT : " + dext, 400, 660);
      }
      //================== PLAYER STATS ======================

      if(gameState == "active" || gameState == "taking_turn")
      {
        if(state == "poisoned_1" && poisonedFor != 0)
        {
          if(poisonTime <= 0)
          {
            poisonTime = 250;
            hp = hp - 1;
            poisonedFor = poisonedFor - 1;
            console.log(poisonedFor);
          }
          if(poisonTime > 0)
          {
            background(2, 156, 14, poisonTime);
            poisonTime = poisonTime - 6;
          }
        }

        if(state == "poisoned_2" && poisonedFor != 0)
        {
          if(poisonTime <= 0)
          {
            poisonTime = 250;
            hp = hp - 2;
            poisonedFor = poisonedFor - 1;
            console.log(poisonedFor);
          }
          if(poisonTime > 0)
          {
            background(2, 156, 14, poisonTime);
            poisonTime = poisonTime - 8;
          }
        }

        if(state == "poisoned_3" && poisonedFor != 0)
        {
          if(poisonTime <= 0)
          {
            poisonTime = 250;
            hp = hp - 2;
            poisonedFor = poisonedFor - 1;
            console.log(poisonedFor);
          }
          if(poisonTime > 0)
          {
            background(2, 156, 14, poisonTime);
            poisonTime = poisonTime - 10;
          }
        }
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
        missSprite = createSprite(monsts[0].body.x, monsts[0].body.y);
        missSprite.velocityY = -7;
        missSprite.lifetime = 10;
        missSprite.visible = false;
			}
			if(showDmg === 1)
      {
        showDmg = null;
        hideTime = 20;
        missSprite = createSprite(monsts[0].body.x, monsts[0].body.y);
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
            monsts[0].attack();
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
        battleSong.stop();
        boss1Song.stop();
        monsTime = 0;
        monsTran = 0;
        gameState = "win2";
        if(missSprite != undefined)
        {
          missSprite.destroy();
        }
        game.start();
        if(bravery == 1)
        {
          xp = xp + (xpM * 3);
        } else
        {
          xp = xp + xpM;
        }
        player.xp = xp;
        //console.log(gameState);
        player.update();
      }
      //==================== WIN ====================



      //==================== LOSE ====================
      if(gameState == "lose")
      {
        battleSong.stop();
        boss1Song.stop();
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
          if(loseTime == 5)
          {
            player.xp = 0;
            player.update();
          }
          if(loseTime >= 100)
          {
            monsts[0].body.destroy();
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
						text(dmgDealt + " / " + maxHpM,missSprite.x,missSprite.y);
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
          if(monsTime == 100)
          {
            winSnd.play();
          }
          if(monsTime >= 100)
          {
            monsts[0].body.destroy();
            textAlign(CENTER);
            textSize(40);
            strokeWeight(3);
            stroke(255,0,0,monsTran);
            fill(255,0,0,monsTran);
            if(bravery == 1)
            {
              text("YOU WIN! YOU GAINED 3x" + xpM + " XP\nFOR YOUR COURAGE", 400,400);
              textSize(25);
              strokeWeight(2);
              text("PRESS W TO RESET", 400,440);
            } else 
            {
              text("YOU WIN! YOU GAINED " + xpM + " XP!", 400,400);
              textSize(25);
              strokeWeight(2);
              text("PRESS W TO RESET", 400,440);
            }
            
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
  state = "";
  itemObj.chosen = 0;
  checkObj.chosen = 0;
  fightObj.chosen = 0;
  turnStart = 1;
  gameState = "rest";
  loseTime = 0;
  loseTran = 0;
  loseTran2 = 0;
  if(missSprite != undefined)
  {
    missSprite.destroy();
  }
  showDmg = undefined;
  menuSongTim = 0;
}