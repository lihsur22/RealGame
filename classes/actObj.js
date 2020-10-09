class Check {
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
          rect(400, 720, 140, 60);
          fill("orange");
          strokeWeight(3);
          textAlign(CENTER);
          textSize(30);
          text("CHECK", 400, 730);
      }

			if(this.chosen == 1)
      {
          stroke("yellow");
          strokeWeight(4);
          rectMode(CENTER);
          fill("black");
          rect(400, 720, 140, 60);
          fill("yellow");
          strokeWeight(3);
          textAlign(CENTER);
      textSize(30);
      text("CHECK", 400, 730);
    }
  }

  selected(){
    turnTaken = 1;
    hideStats = 1;
  }
};