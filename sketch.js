var player, fightObj, itemObj, actObj, turnStart = 1;
var maxHp, hp, def, dext, critChance, attk;
var statsP = [hp, def, dext, critChance, attk];
var gameState = "", enemyState = "", turn = "";
var monster;
var maxHpM, hpM, defM, dextM, critChanceM, attkM;
var statsM = [maxHpM, hpM, defM, dextM, critChanceM, attkM];

var eventDelay;

function setup(){
  canvas = createCanvas(800,800);

  fightObj = new Fight;
  itemObj = new Item;
  actObj = new Act;

  turn = "player"

  maxHp = 100;
  hp = 100;
  def = 0;

  gameState = "rest";
}

function draw(){
  background(0);

  //================== FIGHTING MONSTER / BOSS ======================
  if(gameState == "rest")
  {
    textAlign(CENTER);
    textSize(40);
    fill("white");
    text("Press 'S' to summon monster", 400, 400);

    if(keyCode === 83)
    {
      monster = createSprite(400,200,40,40);
      gameState = "active";
      enemyState = "normal";
    }
  }
  //================== FIGHTING MONSTER / BOSS ======================


  if(gameState == "active")
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

    if(enemyState == "normal")
      {
      //================== MONSTER STATS ======================
      if(mousePressedOver(monster))
      {
        showMonstStats();
      }
      //================== MONSTER STATS ======================
      }






    fightObj.display();
    itemObj.display();
    actObj.display();

    drawSprites();
  }
}





function showMonstStats() {
  fill(255, 255, 255, 100);
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
        actObj.chosen = 1;
        itemObj.chosen = 0;
        eventDelay = 1;
      }
      if(actObj.chosen == 1 && eventDelay == 0)
      {
        fightObj.chosen = 1;
        actObj.chosen = 0;
        eventDelay = 1;
      }
      turnStart = 0;
    }
    if(keyCode === RIGHT_ARROW)
    {
      if(fightObj.chosen == 1 && eventDelay == 0)
      {
        fightObj.chosen = 0;
        actObj.chosen = 1;
        eventDelay = 1;
      }
      if(actObj.chosen == 1 && eventDelay == 0)
      {
        actObj.chosen = 0;
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

function keyReleased(){
  eventDelay = 0;
}