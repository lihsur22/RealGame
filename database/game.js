class Game {
    constructor(){}

    getState() {
        var gameRef = db.ref('gameState');
        gameRef.on("value",function(data){
            gameState = data.val();
        });
    }

    update(state) {
        db.ref('/').update(
            {
                gameState:state
            }
        )
    }

    async start() {
        if(gameState == 0)
        {
            player = new Player();
            var refCount = await db.ref('playC').once("value");
            if(refCount.exists()){
                playC = refCount.val();
                player.readCount();
            }
            form = new Form();
            form.display();
        }
        b1 = createSprite(200,200,40,40);
        b2 = createSprite(350,200,40,40);
        b3 = createSprite(500,200,40,40);
        b4 = createSprite(650,200,40,40);
        breaks = [b1,b2,b3,b4];
    }

    play() {
        form.hideAll();
        textSize(20);
        textAlign(CENTER);
        text(Math.round(player.waitTime / 30) + " Left Till Next Hit",displayWidth/2,displayHeight/2 - 400);

        Player.playerInfo();
        var index = 0;
        var wallTough = 3;

        if(allPlayer !== undefined)
        {
            for(var plr in allPlayer){
                index = index + 1;
                
                if(allPlayer[plr].break == wallTough)
                {
                    breaks[index - 1].y = 100;
                }
                if(allPlayer[plr].break == (2 * wallTough))
                {
                    breaks[index - 1].y = 0;
                }
                if(allPlayer[plr].break == (3 * wallTough))
                {
                    breaks[index - 1].y = -100;
                }
                if(allPlayer[plr].break == (4 * wallTough))
                {
                    breaks[index - 1].y = -200;
                }

                if(index === player.index + 1)
                {
                    breaks[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = breaks[index - 1].y;
                    w = new Walls(breaks[index - 1].x, 200);
                    w.display();
                }
            }
        }
        
        if(keyCode === UP_ARROW && player.index !== null)
        {
            keyCode = DOWN_ARROW;
            if(player.waitTime == 0)
            {
                player.break += 1;
                player.update();
                player.waitTime += 30 * (Math.round(random(1,5)));
            }
        }
        if(player.waitTime > 0)
        {
            player.waitTime = player.waitTime - 1;
        }
        if(player.break == (4 * wallTough))
        {
            this.update(2);
        }
        drawSprites();
    }

    end(){
        console.log("end");
    }
};