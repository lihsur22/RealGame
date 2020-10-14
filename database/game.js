class Game{
	constructor(){}

	async start() {
		if (gameState == "") {
			player = new Player();
			var playerCountRef = await db.ref('playC').once("value");
			if (playerCountRef.exists()) {
				playCount = playerCountRef.val();
				player.getCount();
			}
			form = new Form()
			this.check();
			if(sign == 1)
			{
				form.display();
			}
		}
		if (gameState == "win") {
			var playerCountRef = await db.ref('playC').once("value");
			if (playerCountRef.exists()) {
				playCount = playerCountRef.val();
				player.getCount();
			}
		}
	}

	async check() {
		player.getCount();
		for(var i = 1; i < (playCount + 1); i++){
			var playerInfoRef = await db.ref('players' + '/' + 'player' + i + '/name');
			playerInfoRef.on("value", (data) => {
				playerNames.push(data.val());
			});
		}
		for(var i = 1; i < (playCount + 1); i++){
			var playerInfoRef = await db.ref('players' + '/' + 'player' + i + '/passw');
			playerInfoRef.on("value", (data) => {
				playerPassws.push(data.val());
			});
		}
	}

	async a() {
		var player = new Player;
		var playerCountRef = await db.ref('playC').once("value");
		if (playerCountRef.exists()) {
			playCount = playerCountRef.val();
			player.getCount();
		}
	}
};