class Monster {
    constructor(m) {
        this.body = createSprite(400,200,40,40);

        if(m === 0)
        {
            maxHpM = 25;
            hpM = maxHpM;
            defM = 2;
            dextM = 1000;
            attkM = 3;
            xpM = 10;
        }
        if(m === 1)
        {
            maxHpM = 30;
            hpM = maxHpM;
            defM = 3;
            dextM = 100;
            attkM = 6;
            xpM = 20;
        }
        if(m === 2)
        {
            maxHpM = 15;
            hpM = maxHpM;
            defM = 2;
            dextM = 1000;
            attkM = 2;
            xpM = 15;
        }
        if(m === 3)
        {
            maxHpM = 25;
            hpM = maxHpM;
            defM = 2;
            dextM = 100;
            attkM = 4;
            xpM = 30;
        }
    }

    display() {}

    attack() {
        var miss = Math.round(random(1,100));
        if(miss < dext)
        {
            hideMissM = 1;
        } else
        {
            hurtTime = 255;
        }
    }
};