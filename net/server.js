var players = ['black', 'white'];
var turn = true; //true : black | false : white
class GameState {
    constructor() {
        this.state = 0;
        //0 -> initial state server started
        //1 -> connected player 1
        //1 -> starrted state (waiting on player response)
        //2 -> finished state (calculating score)
        //3 -> player1 wins
        //4 -> player2 wins
        //5 -> connection error
        //6 -> game terminated by player -> go to state 2
        //7 -> unknown error state
    }
}

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 88 });

function sendToAll(message) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) //client !== ws && 
          client.send(message);
    });
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if(message=='whoami') {
        if(turn) {
            sendToAll(players[0]);
            turn = !turn;
        } else {
            sendToAll(players[1]);
            sendToAll("canmove,"+players[0]);
            turn = !turn;
        }
    }

    if(message.substring(0,4) == 'move') {
        var move = message.split(',');
        if(move[1] == 'black' && turn) {
            turn = !turn; //change turn
            sendToAll(message); //broadcast the move
            sendToAll("canmove,"+players[1]);
        }
        if(move[1] == 'white' && !turn) {
            turn = !turn; //change turn
            sendToAll(message);
            sendToAll("canmove,"+players[0]);
        }
        
    }

    console.log('received: %s', JSON.stringify(message));
  });
});


