class Fight {
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
            rect(120, 720, 140, 60);
            fill("orange");
            strokeWeight(3);
            textAlign(CENTER);
            textSize(30);
            text("FIGHT", 120, 730);
        }

        if(this.chosen == 1)
        {
            stroke("yellow");
            strokeWeight(4);
            rectMode(CENTER);
            fill("black");
            rect(120, 720, 140, 60);
            fill("yellow");
            strokeWeight(3);
            textAlign(CENTER);
            textSize(30);
            text("FIGHT", 120, 730);
        }
    }

    selected(){
        var miss = Math.round(random(1,100));
        var critC = Math.round(random(1,100));
        var critS = 0;
        if(critC < critChance && miss > dextM)
        {
            critS = 1;
        }
        if(miss < dextM)
        {
            hideMiss = 1;
        } else if(defM != 0 && defM != 1 && critS == 0)
        {
            hpM = hpM - (Math.round(attk / defM));
            dmgDealt = hpM
            showDmg = 1;
            dmgSnd.play();
        } else if(defM == 1 && critS == 0)
        {
            hpM = hpM - (Math.round(attk - (attk/10)));
            dmgDealt = hpM;
            showDmg = 1;
            dmgSnd.play();
        } else if(defM == 0 && critS == 0)
        {
            hpM = hpM - attk;
            dmgDealt = hpM;
            showDmg = 1;
            dmgSnd.play();
        } else if(critS == 0)
        {
            hpM = hpM - attk;
            dmgDealt = hpM;
            showDmg = 1;
            dmgSnd.play();
        } else if(defM != 0 && defM != 1 && critS == 1)
        {
            hpM = hpM - Math.round(attk + (crit * random(2,6) / defM));
            dmgDealt = hpM;
            console.log("critted");
            critS = 0;
            showDmg = 1;
            dmgSnd.play();
        } else if(defM == 1 && critS == 1)
        {
            hpM = hpM - Math.round(attk + (crit * random(2,6) / (crit * 2 / 5)));
            dmgDealt = hpM;
            console.log("critted");
            critS = 0;
            showDmg = 1;
            dmgSnd.play();
        } else if(defM == 0 && critS == 1)
        {
            hpM = hpM - Math.round(attk + (crit * random(2,6)));
            dmgDealt = hpM;
            console.log("critted");
            critS = 0;
            showDmg = 1;
            dmgSnd.play();
        }
    }
};