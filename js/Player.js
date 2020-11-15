class Player {
    constructor() {
        this.index = null;
        this.taps = 0;
        this.name = null;
    }

    updateName(name){
        var playerIndex ="room1/" + "players/player" + this.index;
        this.name = name;
        if(this.index === 1){
            database.ref(playerIndex).set({
                name:this.name,
                taps:this.taps,
                index: this.index,
                x: displayWidth/2,
                y: 200
            });
        }
        else if(this.index === 2){
            database.ref(playerIndex).set({
                name:this.name,
                taps:this.taps,
                index: this.index,
                x: displayWidth/2,
                y: 600
            });
        }
        
    }

    addTaps() {
        this.taps++;
        database.ref("room1/"+"players/player" + this.index).update({
            taps:this.taps
        });
    }
    
    getPlayerPosition() {
        for(var i=0; i<=room.playerCount; i++){
            var playerPositionRefX = database.ref("room"+room.roomIndex+"/players/player"+i+"/x");
            playerPositionRefX.on("value", (data) => {
                room.players[i-1].x = data.val();
            })
            var playerPositionRefY = database.ref("room"+room.roomIndex+"/players/player"+i+"/y");
            playerPositionRefY.on("value", (data) => {
                room.players[i-1].y = data.val();
            })
        }
    }

    updatePlayerPosition() {
        if(this.index === 1){
            database.ref("room"+room.roomIndex+"/players/player"+this.index).update({
                x: room.player1.x,
                y: room.player1.y
            })
        }
        if(this.index === 2){
            database.ref("room"+room.roomIndex+"/players/player"+this.index).update({
                x: room.player2.x,
                y: room.player2.y
            })
        }
    }
}