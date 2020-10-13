class Form{
  constructor(){
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide() {
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
  display() {
    this.title.html("Kill The Monsters");
    this.title.position(230, 300);
    this.title.style('font-size', '60px');
    this.title.style('color', 'red');
    this.input.position(350, 420);
    this.input.style('width', '200px');
    this.input.style('height', '20px');
    this.input.style('background', '#ff5757');
    this.button.position(350, 500);
    this.button.style('width', '200px');
    this.button.style('height', '40px');
    this.button.style('background', '#ff5757');
    this.reset.position(400, 800);
    this.reset.style('width', '100px');
    this.reset.style('height', '30px');
    this.reset.style('background', '#ff5757');
    this.reset.hide();

    this.button.mousePressed(() => {
			//game.check();
			if(playCount > 0 || playerNames.length == 0)
			{
				this.pressedPlay();
			}
    });

		this.reset.mousePressed(() => {
      player.updateCount(0);
      game.update(0);
    });
	}

	pressedPlay(){
		this.hide();
		var occ = 0;
		for(var i = 0; i < (playCount + 1); i++){
			console.log(playerNames);
		}
		if(occ == 0)
		{
			player.name = this.input.value();
			playCount += 1;
			player.index = playCount;
			player.update();
			player.updateCount(playCount);
		}
		sign = 0;
		gameState = "rest";
	}
}