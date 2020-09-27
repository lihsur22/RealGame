class Food {
    constructor(){
        this.fuudS = 0
        this.lastFed;
        this.image = loadImage("images/milk.png");
    }

    getFuudS(){
        return this.fuudS
    }

    updateFoodS(a){
        this.fuudS = a;
    }

    bedroom(){
      background(bedImg,550,500);
    }

    garden(){
      background(gardenImg,550,500);
    }

    washroom(){
      background(washImg,550,500);
    }

    display(){
        var x=80,y=200;
      
      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
      if(this.fuudS!=0){
        for(var i=0;i<this.fuudS;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
};