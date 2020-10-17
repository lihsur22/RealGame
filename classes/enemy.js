class Monster {
    constructor(n) {
		this.body = createSprite(400,200,40,40);
		this.setEnemy(n);
    }

    display() {
		textAlign(CENTER);
		fill("white");
		stroke("red");
		textSize(20);
		strokeWeight(1);
		text(name, this.body.x, this.body.y + 50);
	}

    attack() {
        var miss = Math.round(random(1,100));
        var critC = Math.round(random(1,100));
        if(critC < critChanceM && miss > dext)
        {
            critMS = 1;
        }
        if(miss < dext)
        {
            hideMissM = 1;
            hurtTime = 10;
        } else
        {
            hurtTime = 255;
        }
    }

    setEnemy(m_){
		var m = 0;
		if(m_ == 1)
        {
			m = Math.round(0,7);
		}
		if(m_ == 2)
        {
			m = Math.round(3,15);
		}
        if(m === 0)
        {
			this.createEnemy(15,2,20,2,15,15,2,"a");
        }
    	if(m === 1)
        {
        	this.createEnemy(30,1,3,4,20,10,5,"a");
        }
        if(m === 2)
        {
            this.createEnemy(25,5,0,3,10,7,7,"a");
        }
        if(m === 3)
        {
			this.createEnemy(25,3,8,4,30,15,8,"a");
		}
		if(m === 4)
        {
            this.createEnemy(25,1,8,6,30,18,7,"a");
        }
        if(m === 5)
        {
            this.createEnemy(20,2,4,5,40,25,5,"a");
        }
        if(m === 6)
        {
            this.createEnemy(30,0,20,3,35,10,5,"a");
        }
        if(m === 7)
        {
            this.createEnemy(10,2,25,8,25,20,8,"a");
		}

		/* LEVEL II */
		if(m === 8)
        {
			this.createEnemy(30,2,13,7,30,18,5,"a");
        }
    	if(m === 9)
        {
        	this.createEnemy(35,3,4,4,35,25,3,"a");
        }
        if(m === 10)
        {
            this.createEnemy(15,2,25,5,20,35,1,"a");
        }
        if(m === 11)
        {
			this.createEnemy(25,3,8,4,30,15,8,"a");
		}
		if(m === 12)
        {
            this.createEnemy(25,1,8,6,30,18,7,"a");
        }
        if(m === 13)
        {
            this.createEnemy(20,2,4,5,40,25,5,"a");
        }
        if(m === 14)
        {
            this.createEnemy(30,0,20,3,35,10,5,"a");
        }
        if(m === 15)
        {
            this.createEnemy(10,2,25,8,25,20,8,"a");
        }
	}

    createEnemy(mHp_, def_, dext_, attk_, xp_, critC_, crit_, name_){
        maxHpM = mHp_;
        hpM = maxHpM;
        defM = def_;
        dextM = dext_;
        attkM = attk_;
        xpM = xp_;
        critChanceM = critC_;
		critM = crit_;
		name = name_;
    }
};