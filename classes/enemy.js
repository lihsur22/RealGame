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
			m = Math.round(random(0,7));
		}
		if(m_ == 2)
        {
			m = Math.round(random(3,15));
        }
        if(m_ == 3)
        {
			m = Math.round(random(3,23));
		}
        if(m === 0)
        {
			this.createEnemy(15,2,20,2,15,15,2,"Common Goblin");
        }
    	if(m === 1)
        {
        	this.createEnemy(30,1,3,4,20,10,5,"Weak Zombie");
        }
        if(m === 2)
        {
            this.createEnemy(25,5,0,3,10,7,7,"Slow Zombie");
        }
        if(m === 3)
        {
			this.createEnemy(25,3,8,4,30,15,8,"Skeleton");
		}
		if(m === 4)
        {
            this.createEnemy(25,1,8,6,30,18,7,"Slow Goblin");
        }
        if(m === 5)
        {
            this.createEnemy(20,2,4,5,40,25,5,"Healthy Goblin");
        }
        if(m === 6)
        {
            this.createEnemy(30,0,20,3,35,10,5,"Slow Zombie");
        }
        if(m === 7)
        {
            this.createEnemy(10,2,25,8,25,20,8,"Furious Goblin");
		}

        /* LEVEL II exclusive */
		if(m === 8)
        {
			this.createEnemy(30,2,13,7,30,18,5,"Strong Skeleton");
        }
    	if(m === 9)
        {
        	this.createEnemy(35,3,4,4,35,25,3,"Beefy Zombie");
        }
        if(m === 10)
        {
            this.createEnemy(15,2,25,5,20,35,1,"Fast Goblin");
        }
        if(m === 11)
        {
			this.createEnemy(25,3,8,4,30,15,8,"Skeleton");
		}
		if(m === 12)
        {
            this.createEnemy(25,1,8,6,30,18,7,"Slow Goblin");
        }
        if(m === 13)
        {
            this.createEnemy(20,2,4,5,40,25,5,"Healthy Goblin");
        }
        if(m === 14)
        {
            this.createEnemy(30,0,20,3,35,10,5,"Strong Zombie");
        }
        if(m === 15)
        {
            this.createEnemy(10,2,25,8,25,20,8,"Furious Goblin");
        }
        /* LEVEL II exclusive */
        /* LEVEL III exclusive */
        if(m === 16)
        {
			this.createEnemy(30,2,13,7,30,18,5,"Strong Skeleton");
        }
    	if(m === 17)
        {
        	this.createEnemy(35,3,4,4,35,25,3,"Beefy Zombie");
        }
        if(m === 18)
        {
            this.createEnemy(15,2,25,5,20,35,1,"Fast Goblin");
        }
        if(m === 19)
        {
			this.createEnemy(25,3,8,4,30,15,8,"Skeleton");
		}
		if(m === 20)
        {
            this.createEnemy(25,1,8,6,30,18,7,"Slow Goblin");
        }
        if(m === 21)
        {
            this.createEnemy(20,2,4,5,40,25,5,"Healthy Goblin");
        }
        if(m === 22)
        {
            this.createEnemy(30,0,20,3,35,10,5,"Strong Zombie");
        }
        if(m === 23)
        {
            this.createEnemy(10,2,25,8,25,20,8,"Furious Goblin");
        }
        /* LEVEL III exclusive */
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