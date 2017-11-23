class GameState {
    constructor() {
        this.state = 0;
        //0 -> initial state
        //1 -> starrted state (waiting on player response)
        //2 -> finished state (calculating score)
        //3 -> player1 wins
        //4 -> player2 wins
        //5 -> connection error
        //6 -> game terminated by player -> go to state 2
        //7 -> unknown error state
    }
}



class Server {
    constructor(host, port) {
        var WebSocket = require('ws');
        var ws = new WebSocket('ws://' + host + ':' + port);
            ws.on('open', function open() {
            ws.send('Server Started');
        });

        ws.on('message', this.processRequest);
    }
    
    processRequest(data){
        console.log(data);
        //what type of data it is and what to do with it
    }
    

    //verifyRequest(){}
    //checkStatus(){}
    createPlayer(){

    }
    createStones(){}
    initializeGame(){}
    send(){}
    createTurnInformationObject(){}
    chatBox(){}
    timer(){}
    moveHistory(){}
    endGame(){}
    score(){}
    createBoardRequest(){}
    createPlayerPrisoner(){}
    createPlayerScoreInformation(){} 
 }

new Server(host='51.37.104.171', port=88);
