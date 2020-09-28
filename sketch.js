var form, game, player;

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-20);

  form = new Form();
  player = new Player();
}

function draw(){
  form.display();
}