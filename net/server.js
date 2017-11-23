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
        var wss = new WebSocket.Server({host: host, port: port});
            wss.on('connection', this.connect);
        this.canContactClients = false;

    }
    
    connect(ws) {
        console.log("connected");
        this.ws = ws;
        ws.on('message', this.processRequest);
        this.canContactClients = true;
    }

    processRequest(data){
        console.log(data);
        //what type of data it is and what to do with it
    }

    send(data){
        if(this.canContactClients)
            this.ws.send(data);
        else
            console.log("Can't Send Messsage (Server Error)");
    }    

    //verifyRequest(){}
    //checkStatus(){}
    createPlayer(){

    }
    //createStones(){}
    initializeGame(){}

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


//var WebSocket = require('ws');
//var wss = new WebSocket.Server({host: '192.168.1.88', port: 8080 });
//wss.on('connection', function connection(ws) {
//  ws.on('message', function incoming(message) {
//    console.log('received: %s', message);
//  });
//
//  ws.send('something');
//});

//new Server(host='192.168.1.88', port=88);

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 88 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
