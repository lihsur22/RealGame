var dog, dogImg, hapDogImg, foodS, lastFed, fedTime;
var db, foodStock;
var happyTimer = 0;
var feed, addFood, bedImg, gardenImg, washImg;
var foodObj, currentTime;
var gameState, gsChange, gsRead;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  hapDogImg = loadImage("images/Happy.png");
  bedImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washImg = loadImage("images/Wash Room.png");
}

function setup() {
	createCanvas(700, 500);

  db = firebase.database();

  foodObj = new Food();

  foodStock = db.ref('food');
  foodStock.on("value",readDB);

  gsRead = db.ref('gameState');
  gsRead.on("value",function(data){
    gameState = data.val();
  });

  dog = createSprite(625,280,10,10);
  dog.addImage("normal",dogImg);
  dog.scale = 0.1;

  feed = createButton("Feed Doge");
  feed.position(400,195);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(500,195);
  addFood.mousePressed(addF);
}


function draw() {
  background(46,139,87);

  fedTime = db.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  if(happyTimer > 0)
  {
    happyTimer = happyTimer - 1;
  }

  drawSprites();

  stroke(3);
  fill(255);
  textSize(20);
  textAlign(CENTER);

  currentTime = hour();
  if(currentTime == (lastFed + 1))
  {
    gsUpdate("Play");
    foodObj.garden();
    fill(46,139,87);
    text("The Doge be playing now, come back later!",350,100);
  } else if(currentTime == (lastFed + 2))
  {
    gsUpdate("Bath");
    foodObj.washroom();
    fill(46,139,87);
    text("The Doge be bathing now, come back later!",350,100);
  } else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4))
  {
    gsUpdate("Sleep");
    foodObj.bedroom();
    fill(46,139,87);
    text("Look at the thing sleeping; come back later to feed it!",350,100);
  } else
  {
    gsUpdate("Hungry");
    foodObj.display();
  }
  
  if(lastFed >= 12)
  {
   text("Last Feed : " + lastFed % 12 + " PM", 150, 30)
  } else if(lastFed == 0)
  {
    text("Last Feed : 12 AM",150,30);
  } else
  {
    text("Last Feed : " + lastFed + " AM", 150, 30);
  }

  if(gameState != "Hungry")
  {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else
  {
    feed.show();
    addFood.show();
    if(happyTimer == 0)
    {
      dog.addImage(dogImg);
    }
    text(Math.round(happyTimer / 30) + " Till Doge Digests",550,30)
  }
}



function feedDog(){
  if(happyTimer == 0){
    dog.addImage(hapDogImg);
    happyTimer = 500;

    foodObj.updateFoodS(foodObj.getFuudS() - 1);
    db.ref('/').update({
      food : foodObj.getFuudS(),
      feedTime : hour()
    });
  }
}

function addF(){
  foodS++
  db.ref('/').update({
    food:foodS
  });
}

function readDB(data){
  foodS = data.val();
  foodObj.updateFoodS(foodS)
}

function gsUpdate(state){
  db.ref('/').update({
    gameState : state
  })
}