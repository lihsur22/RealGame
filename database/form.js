class Form{
	constructor(){
		this.nameInput = createInput('');
		this.name = createElement('h5');
		this.button = createButton('Play');
		this.title = createElement('h2');
		this.reset = createButton('Reset');
		this.passwInput = createInput('');
		this.passw = createElement('h5');
	}
  	hide() {
		this.button.hide();
		this.nameInput.hide();
		this.title.hide();
		this.name.hide();
		this.passwInput.hide();
		this.passw.hide();
  	}
  	display() {
		this.title.html("Kill The Monsters");
		this.title.position(220, 300);
		this.title.style('font-size', '60px');
		this.title.style('color', 'red');
		
		this.nameInput.position(425, 420);
		this.nameInput.style('width', '200px');
		this.nameInput.style('height', '20px');
		this.nameInput.style('background', '#ff5757');
		this.name.html("Enter Name : ");
		this.name.position(300,387);
		this.name.style('font-size', '20px');
		this.name.style('color', 'red');
		
		this.passwInput.position(435, 460);
		this.passwInput.style('width', '200px');
		this.passwInput.style('height', '20px');
		this.passwInput.style('background', '#ff5757');
		this.passw.html("Enter Password : ");
		this.passw.position(280,427);
		this.passw.style('font-size', '20px');
		this.passw.style('color', 'red');
		

		this.button.position(350, 550);
		this.button.style('width', '200px');
		this.button.style('height', '40px');
		this.button.style('background', '#ff5757');
		this.reset.position(400, 800);
		this.reset.style('width', '100px');
		this.reset.style('height', '30px');
		this.reset.style('background', '#ff5757');
		this.reset.hide();

		this.button.mousePressed(() => {
			if(this.passwInput.value() != "" && this.nameInput.value() != "")
			{
				game.check();
				playCount += 1;
				if((playCount > 0 && playerNames[0] !== undefined) || (playerNames.length == 0))
				{
					this.pressedPlay();
				}
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
		var logIn = 0;

		//console.log(playCount);
		for(var i = 0; i < playCount; i++){
			console.log(playerPassws[i], i);
			if(this.nameInput.value() == playerNames[i] && this.passwInput.value() == playerPassws[i])
			{
				occ = 1;
				logIn = i + 1;
			}
		}
		if(occ == 0)
		{
			player.name = this.nameInput.value();
			player.passw = this.passwInput.value();
			player.index = playCount;
			player.update();
			player.updateCount(playCount);
			gameState = "rest";
		}
		if(occ == 1)
		{
			playCount -= 1;
			player.updateCount(playCount);
			player.getPlayerInfo(logIn);
			gameState = "logging_in";
		}
		sign = 0;
		keyCode = 0;
	}
}