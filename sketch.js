var walls, w1, w2, w3, w4, w5, w;
var player, playC, allPlayer;
var breaks, b1, b2, b3, b4;
var db, gameState = 0;
var form, game;

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-20);

  db = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playC == 4 && gameState !== 2)
  {
    game.update(1);
  }
  if(gameState == 1)
  {
    clear();
    game.play();
  }
  if(gameState ==2)
  {
    game.end();
  }
}