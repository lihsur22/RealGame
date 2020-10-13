class Player {
    constructor() {
        this.xp = 0;
        this.name = null;
        this.lvl = 0;
        this.index = null;
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
            pos: this.index
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = db.ref('player' + 's');
        playerInfoRef.on("value", (data) => {
            allPlayer = data.val();
        });
    }

    getNames() {
        
    }
}
