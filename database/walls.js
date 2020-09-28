class Walls {
    constructor(x1,y1){
        this.x1 = x1;
        this.y1 = y1 - 100;
    }

    display(){
        w1 = createSprite(this.x1,this.y1,15,15);
        w2 = createSprite(this.x1,this.y1 - 100,15,15);
        w3 = createSprite(this.x1,this.y1 - 200,15,15);
        w3 = createSprite(this.x1,this.y1 - 300,15,15);
    }
};