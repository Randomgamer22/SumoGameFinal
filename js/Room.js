class Room {
    constructor() {
        this.status = 0;
        this.playerCount = null;
        this.gameState = 0;
        this.roomIndex = 1;
        this.player1 = null;
        this.player2 = null;
        this.players = [];
        this.allPlayers = [];
    }

    //getting gameState of the room
    readGameState() {
        var gameStateRef = database.ref('room'+this.roomIndex+'/gameState');
        gameStateRef.on('value',(data) => {
            this.gameState = data.val();
        })
    }

    //updating gameState of the room
    updateGameState(data) {
        database.ref('room'+this.roomIndex).update({
            gameState: data
        });
    }

    //getting room status
    readRoomStatus() {
        var roomStatusRef = database.ref('room'+this.roomIndex+'/status');
        roomStatusRef.on('value',(data) => {
            this.status = data.val();
        })
    }

    //updating room status
    updateRoomStatus(data) {
        database.ref('room'+this.roomIndex).update({
            status: data
        });
    }

    //getting playerInfo
    getPlayerInfo() {
        var playerInfoRef = database.ref("room"+this.roomIndex+"/players");
        playerInfoRef.on ("value", (data) => {
            this.allPlayers = data.val();
        })
    }
    
    //removing all games
    removePlayers() {
        var playersRef = database.ref("room"+this.roomIndex+"/players");
        playersRef.remove();
    }

    //gaming playerCount
    getPlayerCount() {
        var playerCountRef = database.ref("room"+this.roomIndex+"/playerCount");
        playerCountRef.on('value', (data) => {
            this.playerCount = data.val();
        })
    }

    //updating playerCount
    updatePlayerCount(data) {
        database.ref("room"+this.roomIndex).update({
            playerCount: data
        });
    }

    async start() {
        if(this.gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('room1/'+'playerCount').once("value");
            if(playerCountRef.exists()){
              this.playerCount = playerCountRef.val();
              room.getPlayerCount();
            }
            form = new Form()
            form.display();

            this.player1 = createSprite(displayWidth/2, 200);
            this.player2 = createSprite(displayWidth/2, 600);

            this.player1.addImage(player1Image);
            this.player2.addImage(player2Image);

            this.player1.debug = true;
            this.player2.debug = true;

            this.players = [this.player1, this.player2];
        }
    }

    play() {
        form.hide();
        room.updateRoomStatus(1);
        room.getPlayerInfo();

        
        player.updatePlayerPosition();
        player.getPlayerPosition();

        
        for(var i = 0; i <= this.players.length; i++) {
            if(i === player.index){
                push();
                ellipseMode(CENTER);
                noStroke();
                fill("#ff8a8a");
                ellipse(this.players[i-1].x, this.players[i-1].y, 300, 300);
                pop();
            }
            
        }


        if(keyWentDown("space")){
            if(player.index === 1){
                this.player1.y += 50;
                player.addTaps();
            }
            else if(player.index === 2){
                this.player2.y -= 50;
                player.addTaps();
            }
        }

        

        console.log(this.player1);
        drawSprites();

    }

}