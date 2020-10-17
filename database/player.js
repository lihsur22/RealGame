class Player {
    constructor() {
        this.xp = 0;
        this.name = null;
        this.lvl = 0;
        this.index = null;
        this.passw = null;
    }

    updateCount(count) {
        db.ref('/').update({
            playC: count
        });
    }

    getCount() {
        var playerCountRef = db.ref('playC');
        playerCountRef.on("value", (data) => {
            playCount = data.val();
        })
    }

    update() {
        var playerIndex = "players/player" + this.index;
        db.ref(playerIndex).set({
            name: this.name,
            lvl: this.lvl,
            xp: this.xp,
            pos: this.index,
            passw: this.passw
        });
    }

    getPlayerInfo(x) {
        var playerInfoRef = db.ref("players/player" + x);
        playerInfoRef.on("value", (data) => {
            this.name = data.val().name;
            this.index = data.val().pos;
            this.xp = data.val().xp;
            this.lvl = data.val().lvl;
            this.passw = data.val().passw;
        });
    }
}
