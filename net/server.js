/*class GameState {
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


*/

class Server {
    constructor(host, port) {
        const wss = new WebSocket.Server({host: host, port: port});
        var that = this; //this object is that over there
        wss.on('connection', function connection(ws) {
          ws.on('message', function incoming(message) {
            console.log('received: %s', message);
          });

          ws.send('something');
        });

        this.canContactClients = false;

    }
    
    connect(ws) {
        this.ws = ws;
        ws.on('message', processRequest);
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


new Server(host='51.37.104.171', port=88);
        //
