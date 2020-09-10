var dog, dogImg, hapDogImg, fuudS, dogDB;
var db, dbFuudYield;
var happyTimer = 0;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  hapDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);

  db = firebase.database();
  dbFuudYield = db.ref("Dog");
  dbFuudYield.on("value",readDB, showErr);

  dog = createSprite(250,280,10,10);
  dog.addImage("normal",dogImg);
  dog.scale = 0.15;
}


function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeS(fuudS);
    console.log(fuudS);
    dog.addImage(hapDogImg);
    dog.scale = 0.15;
    happyTimer = 80;
  }

  console.log(happyTimer);
  if(happyTimer > 0)
  {
    happyTimer = happyTimer - 1;
    if(happyTimer == 0) {
      dog.addImage(dogImg);
    }
  }

  if(keyWentDown(DOWN_ARROW))
  {
    writeRef(fuudS);
  }


  drawSprites();

  textSize(20);
  fill("white");
  stroke("black");
  strokeWeight(2);
  textAlign(CENTER);
  text("Food Remaining : " + fuudS,250,220);
  textSize(14);
  text("Press 'up arrow' to feed The Doge",250,20);
  text("Press 'down arrow' to refill food supplies",250,490);
}



function writeS(a){
  if(a <= 0)
  {
    a = 0;
  } else
  {
    a = a - 1;
  }
  db.ref("Dog").set({
    Fuud:a
  });
}

function writeRef(a){
  if(a == 0)
  {
    db.ref("Dog").set({
      Fuud:20
    });
  }
}

function readDB(data){
  dogDB = data.val();
  fuudS = dogDB.Fuud;
}


function showErr() {
  console.log("errorr");
}