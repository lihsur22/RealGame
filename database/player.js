class Player {
    constructor(){
        this.index = null;
        this.wall = 0;
        this.break = 0;
        this.name = null;
    }

    readCount(){
        var refCount = db.ref('playC');
        refCount.on("value",function(data){
            playC = data.val();
        });
    }

    updateCount(count){
        db.ref('/').update({
            playC:count
        });
    }

    update(){
        var playerIndex = 'players/play' + this.index;
        db.ref(playerIndex).set({
            name : this.name,
            wall : this.wall,
            break : this.break
        });
    }

    static playerInfo() {
        var info = db.ref('players');
        info.on("value",(data)=>{
            allPlayer = data.val();
        });
    }
}