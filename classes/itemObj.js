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
            text("ITEM", 680, 730);
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
            text("ITEM", 680, 730);
        }
    }
};