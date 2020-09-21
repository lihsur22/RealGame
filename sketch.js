var dog, dogImg, hapDogImg, foodS, lastFed, fedTime;
var db, foodStock, pseftikoPatoma;
var happyTimer = 0;
var feed, addFood;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  hapDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(700, 500);

  db = firebase.database();

  foodObj = new Food();

  foodStock = db.ref('food');
  foodStock.on("value",readDB);

  dog = createSprite(625,280,10,10);
  dog.addImage("normal",dogImg);
  dog.scale = 0.1;
  //pseftikoPatoma = createSprite(625,320,50,10);

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
  if(happyTimer == 0)
  {
    dog.addImage("normal",dogImg);
  }

  drawSprites();

  stroke(3);
  fill(255);
  textSize(20);
  textAlign(CENTER);
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
  text(Math.round(happyTimer / 30) + " Till Doge Digests",550,30)
  

  foodObj.display();
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