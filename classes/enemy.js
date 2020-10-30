class Monster {
    constructor(n) {
		this.body = createSprite(400,200,40,40);
        this.setEnemy(n);
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
            m = 23;
        }
        if(m_ == 4)
        {
            m = Math.round(random(16,31));
        }
        if(m_ == 5)
        {
            m = Math.round(random(23,39));
            //m = 23;
        }
        if(m_ == 6)
        {
            m = Math.round(random(23,47));
        }

        if(m === 0)
        {
			this.createEnemy(15,2,20,2,15,15,2,"Common Goblin","",false);
        }
    	if(m === 1)
        {
        	this.createEnemy(30,1,3,4,20,10,5,"Weak Zombie","",false);
        }
        if(m === 2)
        {
            this.createEnemy(25,5,0,3,10,7,7,"Slow Zombie","",false);
        }
        if(m === 3)
        {
			this.createEnemy(25,3,8,4,30,15,8,"Skeleton","",false);
		}
		if(m === 4)
        {
            this.createEnemy(25,1,8,6,30,18,7,"Slow Goblin","",false);
        }
        if(m === 5)
        {
            this.createEnemy(20,2,4,5,40,25,5,"Healthy Goblin","",false);
        }
        if(m === 6)
        {
            this.createEnemy(30,0,20,3,35,10,5,"Slow Zombie","",false);
        }
        if(m === 7)
        {
            this.createEnemy(10,2,25,8,25,20,8,"Furious Goblin","",false);
		}

        /* LEVEL II exclusive */
		if(m === 8)
        {
			this.createEnemy(30,2,13,7,30,18,5,"Strong Skeleton","",false);
        }
    	if(m === 9)
        {
        	this.createEnemy(35,3,4,4,35,25,3,"Beefy Zombie","",false);
        }
        if(m === 10)
        {
            this.createEnemy(15,2,25,5,20,35,1,"Fast Goblin","",false);
        }
        if(m === 11)
        {
			this.createEnemy(25,3,8,4,30,15,8,"Skeleton","",false);
		}
		if(m === 12)
        {
            this.createEnemy(25,1,8,6,30,18,7,"Slow Goblin","",false);
        }
        if(m === 13)
        {
            this.createEnemy(20,2,4,5,40,25,5,"Healthy Goblin","",false);
        }
        if(m === 14)
        {
            this.createEnemy(30,0,20,3,35,10,5,"Strong Zombie","",false);
        }
        if(m === 15)
        {
            this.createEnemy(10,2,25,8,25,20,8,"Furious Goblin","",false);
        }
        /* LEVEL II exclusive */

        /* LEVEL III exclusive */
        if(m === 16)
        {
			this.createEnemy(35,4,10,7,40,20,5,"Beefy Skeleton","",false);
        }
    	if(m === 17)
        {
        	this.createEnemy(20,2,7,6,35,25,4,"Furious Zombie","",false);
        }
        if(m === 18)
        {
            this.createEnemy(25,3,25,7,35,30,4,"Strong Goblin","",false);
        }
        if(m === 19)
        {
			this.createEnemy(30,4,10,6,35,18,7,"Strong Skeleton","",false);
		}
		if(m === 20)
        {
            this.createEnemy(20,1,30,5,25,10,3,"Spider","poison",false);
        }
        if(m === 21)
        {
            this.createEnemy(20,1,30,5,25,10,3,"Spider","poison",false);
        }
        if(m === 22)
        {
            this.createEnemy(15,1,35,7,40,10,5,"Cave Spider","poison2",false);
        }
        if(m === 23)
        {
            this.createEnemy(50,3,7,12,65,3,10,"Crypt Dweller","",true);
        }
        /* LEVEL III exclusive */

        /* LEVEL IV exclusive */
        if(m === 24)
        {
			this.createEnemy(35,4,13,8,30,20,6,"Dead Archer","poison",false);
        }
    	if(m === 25)
        {
        	this.createEnemy(20,2,7,6,35,25,4,"Strong Spider","poison",false);
        }
        if(m === 26)
        {
            this.createEnemy(12,0,50,2,5,20,0.5,"Silverfish","",false);
        }
        if(m === 27)
        {
			this.createEnemy(12,0,50,2,5,20,0.5,"Silverfish","",false);
		}
		if(m === 28)
        {
            this.createEnemy(20,1,30,5,25,10,3,"Spider","poison",false);
        }
        if(m === 29)
        {
            this.createEnemy(20,1,35,5,25,10,3,"Fast Spider","poison",false);
        }
        if(m === 30)
        {
            this.createEnemy(15,1,35,7,40,10,5,"Cave Spider","poison2",false);
        }
        if(m === 31)
        {
            this.createEnemy(30,3,35,8,45,13,6,"Strong Cave Spider","poison2",false);
        }
        /* LEVEL IV exclusive */

        /* LEVEL V exclusive */
        if(m === 32)
        {
			this.createEnemy(50,3,7,12,65,3,10,"String Cave Spider","poison2",false);
        }
    	if(m === 33)
        {
        	this.createEnemy(20,2,7,6,35,25,4,"Strong Spider","poison2",false);
        }
        if(m === 34)
        {
            this.createEnemy(20,1,50,2,10,20,1,"Strong Silverfish","",false);
        }
        if(m === 35)
        {
			this.createEnemy(15,1,50,2,20,20,0.7,"Venomous Silverfish","poison2",false);
		}
		if(m === 36)
        {
            this.createEnemy(20,2,7,6,35,25,4,"Strong Spider","poison",false);
        }
        if(m === 37)
        {
            this.createEnemy(20,1,35,5,25,10,3,"Fast Spider","poison",false);
        }
        if(m === 38)
        {
            this.createEnemy(30,3,35,8,45,13,6,"Strong Cave Spider","poison2",false);
        }
        if(m === 39)
        {
            this.createEnemy(30,3,35,8,45,13,6,"Strong Cave Spider","poison2",false);
        }
        /* LEVEL V exclusive */

        /* LEVEL VI exclusive */
        if(m === 40)
        {
			this.createEnemy(50,3,7,12,65,3,10,"String Cave Spider","poison2",false);
        }
    	if(m === 41)
        {
        	this.createEnemy(20,2,7,6,35,25,4,"Strong Spider","poison2",false);
        }
        if(m === 42)
        {
            this.createEnemy(15,1,50,2,20,20,0.7,"Strong Venomous Silverfish","",false);
        }
        if(m === 43)
        {
			this.createEnemy(15,1,50,2,20,20,0.7,"Strong Venomous Silverfish","poison2",false);
		}
		if(m === 44)
        {
            this.createEnemy(20,2,7,6,35,25,4,"Strong Spider","poison",false);
        }
        if(m === 45)
        {
            this.createEnemy(20,1,35,5,25,10,3,"Fast Spider","poison",false);
        }
        if(m === 46)
        {
            this.createEnemy(30,3,35,8,45,13,6,"Strong Cave Spider","poison2",false);
        }
        if(m === 47)
        {
            this.createEnemy(70,5,30,10,80,10,13,"Broodmother","poison3",false);
        }
        /* LEVEL VI exclusive */
	}

    createEnemy(mHp_, def_, dext_, attk_, xp_, critC_, crit_, name_, ability_, boss_){
        maxHpM = mHp_;
        hpM = maxHpM;
        defM = def_;
        dextM = dext_;
        attkM = attk_;
        xpM = xp_;
        critChanceM = critC_;
		critM = crit_;
        name = name_;
        ability = ability_;
        bossMons = boss_;
    }

    display() {
        if(bossMons == false)
        {
            textAlign(CENTER);
            fill("white");
            stroke("red");
            textSize(20);
            strokeWeight(1);
            text(name, this.body.x, this.body.y + 50);
        }
        if(bossMons == true)
        {
            textAlign(CENTER);
            fill("darkred");
            stroke("white");
            textSize(40);
            strokeWeight(1);
            text(name, this.body.x, this.body.y + 80);
        }
	}

    attack() {
        if(bossMons == false)
        {
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
            } else if(critMS == 1)
            {
                hurtTime = 300;
            }
            else
            {
                hurtTime = 255;
            }   
        }
        if(ability == "poison")
        {
            var ab = Math.round(random(1,100));
            if(ab < 50)
            {
                state = "poisoned_1";
                if(poisonedFor < 4)
                {
                    poisonedFor = 12;
                }
            } else
            {
                poisonedFor = poisonedFor;
            }
        }
        if(ability == "poison2")
        {
            var ab = Math.round(random(1,100));
            if(ab < 65)
            {
                state = "poisoned_2";
                if(poisonedFor < 8)
                {
                    poisonedFor = 25;
                } else
                {
                    poisonedFor = poisonedFor;
                }
            }
        }
        if(ability == "poison3")
        {
            var ab = Math.round(random(1,100));
            if(ab < 65)
            {
                state = "poisoned_3";
                if(poisonedFor < 13)
                {
                    poisonedFor = 40;
                } else
                {
                    poisonedFor = poisonedFor;
                }
            }
        }
        
        console.log(bossMons)
        if(bossMons == true)
        {
            var heal = Math.round(random(1,100));
            var miss = Math.round(random(1,100));
            var critC = Math.round(random(1,100));
            console.log(heal);
            if(heal > 25)
            {
                if(critC < critChanceM && miss > dext)
                {
                    critMS = 1;
                }
                if(miss < dext)
                {
                    hideMissM = 1;
                    hurtTime = 10;
                } else if(critMS == 1)
                {
                    hurtTime = 300;
                }
                else
                {
                    hurtTime = 255;
                }
            }
            if(heal <= 25)
            {   
                hpM = hpM + Math.round(random(4,12));
                if(hpM > maxHpM)
                {
                    hpM = maxHpM;
                }
                healSnd.play();
                console.log("heal");
                hurtTime = 0;
            }
        }
    }
};