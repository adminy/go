
function selectServer(ip) {
	ws=new WebSocket("ws://" + ip);
	startConnection();
}
//once started connection and its open, process the server responses.
function startConnection() {
	ws.onopen = function(event) {
		document.getElementById('history').innerHTML += "<font color=green>Connected!</font><br>";
        send("whoami"); //ask server which player AM I?
    }
	ws.onmessage = function(response) {
		processResponse(response.data);
  	}
}
// Print All Server Responses in the console.
function processResponse(data) {
	/* Server is telling me to be black or player
	* 	do it if it didn't already tell me before
	* 	make new Player object
	*/
	if(isPlayerSetup == false && (data == "black" || data == "white")) {
		isPlayerSetup = true;
		if(data == "black") {
			me = new Player(data, 0);
			op = new Player("white", 2);
		} else {
			me = new Player(data, 2);
			op = new Player("black", 0);
		}
		document.getElementById('history').innerHTML += "You have become the " + data + " player.<br>";
	}

	if(data.substring(0,4) == 'move') {
		me.placeTurn(data);
	}
	if(data.substring(0,7) == 'canmove')
		me.canMove = data.split(',')[1] == me.colour;

	console.log(data);	
}
//Send message to server
function send(message) {
	ws.send(message);
}

// connect to the server calling selectServer();
//selectServer();






function operation() {
	//yeah what does this do again?
}

function stonePlacementRequest() {
	var userInput = {x:3, y:3};
	ws.send(JSON.stringify(userInput));
	//finally making sense function
}

function updateDisplay() {
	//I'm assuming this is like after server tells client put this piece as response from player B?
}

function toBeCaptured(bool) {
	if(bool) {
		//puff 4 or however many pieces to be removed :)
	}
}

function prisonerScore() {
	//ask server for score right?
	ws.send("{cmd:'score'}");
}





/*
	Render Graphics is supposed to be code above right?
	Audio Haha xD
	new Board function written Above! renamed to drawBoard() because server also needs a new Board??
*/

function renderGraphics() {
	//unfortunately you'll have to explain yourself.
}

function renderAudio(src) {
	window.sound = [];
	window.sound.push(new Audio(src));
}

function displayClientView() {
	//again is this just another renderGraphics? Please Explain!
}

function decideStonePlacement() {
	//does what now?
}


/*

Class Client extends GameNetwork    # net/client.js
{
	//protected player;
	//protected GameWorld;
	//protected SoundManager;
	//protected GraphicManager;
	//protected NetworkManager;
    this.server = "ws://ip:port";

	public selectServer(address){
        this.server = address; //dropdown menu selects server in index.html so it calls this function after which we update this.server value
    }
	public StartConnection(){
        //connect to server button calls this after which available servers select is disabled
        document.getElementById('selectServer').setAttribute('disabled','');
        this.ws = new Websocket(this.server);     
    } 
	//public updateDisplay(){}
	public stonePlacementRequest(x, y){
        //this function only gets called if player 
        //gets the turn
        ws.snd("Place_piece:" + x+"|"+y);  //player is indentified by socket server so server will know who requested coordinates
    }
	public processResponse(response){ //make this a class as initially proposed
        //process `response.data` here
        //if(response.data.substring(0,1)=="$")
            //receiveScore(response.data.substring(1));
    }
	public toBeCaptured(){

    }
	public createStoneRequest(){
        //so what you're sayin is that stones are not 
        //given until a stone request is made??
        // this method is silly but sure why not :)
    }
	public createBoardResponse(){
        //once connected to the server initialise Go() class
        //then Go().drawBoard()
        //so this method should be reconsidered
    }

    public receiveScore(data) {
        var scores = json_parse_request(data);
        Score().updateScore(scores);

    }

    public connectionFailed(error) {
        //guys what happens on server disconnect?
        //No mention of what happens in this Case
        //so we are ignoring if this server is
        // 1. Unreachable
        // 2. Can't connect
        // 3. Connection Rejected For any other reason
        //ws.onerror(connectionFailed); will call this
    }


  
}*/
