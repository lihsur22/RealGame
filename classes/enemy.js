class Monster {
    constructor(m) {
        this.body = createSprite(400,200,40,40);

        if(m === 0)
        {
            maxHpM = 25;
            hpM = maxHpM;
            defM = 5;
            dextM = 0;
            attkM = 3;
            xpM = 10;
            critChanceM = 7;
            critM = 7;
        }
        if(m === 1)
        {
            maxHpM = 30;
            hpM = maxHpM;
            defM = 1;
            dextM = 3;
            attkM = 4;
            xpM = 20;
            critChanceM = 10;
            critM = 5;
        }
        if(m === 2)
        {
            maxHpM = 15;
            hpM = maxHpM;
            defM = 2;
            dextM = 20;
            attkM = 2;
            xpM = 15;
            critChanceM = 15;
            critM = 2;
        }
        if(m === 3)
        {
            maxHpM = 25;
            hpM = maxHpM;
            defM = 3;
            dextM = 8;
            attkM = 4;
            xpM = 30;
            critChanceM = 15;
            critM = 8;
        }
    }

    display() {}

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
};