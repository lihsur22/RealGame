class Item {
    constructor(){
        this.chosen =  0;
    }
    
    display(){
        if(this.chosen == 0)
        {
            stroke("orange");
            strokeWeight(4);
            rectMode(CENTER);
            fill("black");
            rect(680, 720, 140, 60);
            fill("orange");
            strokeWeight(3);
            textAlign(CENTER);
            textSize(30);
            text("HEAL", 680, 730);
        }

        if(this.chosen == 1)
        {
            stroke("yellow");
            strokeWeight(4);
            rectMode(CENTER);
            fill("black");
            rect(680, 720, 140, 60);
            fill("yellow");
            strokeWeight(3);
            textAlign(CENTER);
            textSize(30);
            text("HEAL", 680, 730);
        }
    }

    selected(){
        if(lvl <= 2)
        {
            hp = hp + (Math.round(random(4,10)));
            healSnd.play();
        }
        if(lvl <= 5 && lvl > 2)
        {
            hp = hp + (Math.round(random(6,13)));
            healSnd.play();
        }
    }
};