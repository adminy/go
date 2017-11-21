
function drawBoard() {
	var canvas = document.getElementById("board");
	var border = document.getElementById("border");
	canvas.width = canvas.style.width = border.style.width =  window.innerHeight/1.5;
	canvas.height = canvas.style.height = border.style.height = window.innerHeight/1.5;
	
	border.style.width =  window.innerHeight/1.5 + "px";
	border.style.height =  window.innerHeight/1.5 + "px";
	var size = 9;
	var distance_between = canvas.width/size; //parseInt(canvas.height/13);
	var board_pos = size*4;
	var c = canvas.getContext("2d");
	
	c.beginPath();
	for(var i = 0; i < size; i++) {
		c.moveTo(board_pos, board_pos+distance_between*i); c.lineTo(board_pos+distance_between*(size-1), board_pos+distance_between*i);
		c.moveTo(board_pos+distance_between*i, board_pos); c.lineTo(board_pos+distance_between*i, board_pos+distance_between*(size-1));
	}
	c.closePath();
	c.stroke();


	//place positions
	var board = [];
	var radius = distance_between/2;
	
	for(var y = board_pos; y <= distance_between*size; y+=distance_between) {
		board.push([]);
		for(var x = board_pos; x <= distance_between*size; x+=distance_between) {
			c.beginPath();
			c.arc(x, y, radius, 0, 2*Math.PI);
			c.closePath();
			c.stroke();
			board.push([x,y, false]); //x, y, set on board or not?
			
		}
		i++;
	}
	//console.log(board);
	var black_white_player_turn = true;
	
	canvas.addEventListener("click", function(event) {          
            var rect = canvas.getBoundingClientRect();
            var mouse = {x: event.clientX - rect.left, y: event.clientY - rect.top};
            for(var i = 0; i < board.length; i++) {
				//if clicked inside a circle
                if(Math.sqrt((mouse.x-board[i][0])*(mouse.x-board[i][0]) + (mouse.y-board[i][1])*(mouse.y-board[i][1])) < radius && board[i][2] !== true) {
				     c.beginPath();
					 c.arc(board[i][0], board[i][1], radius, 0, 2*Math.PI);
					 c.fillStyle = black_white_player_turn ? "black" : "white";
					 c.fill();
					 c.closePath();
					 black_white_player_turn = !black_white_player_turn;
					 board[i][2] = true;
                }
                    
            }
        }, false);


	
	
}



document.onreadystatechange = function () {
    if (document.readyState == "complete")
    	drawBoard();
    	//var select = document.getElementsByTagName("select");
    	//console.log(select);
        //
        //window.onload = window.onresize = window.onfocus = drawBoard;
};












/*
	I've tried, but guy's WTF way too many methods???

*/





var ws;
function selectServer(ip) {
	ws=new WebSocket("ws://" + ip);
	startConnection();
}
//once started connection and its open, process the server responses.
function startConnection() {
	ws.onopen = function(event) {
        	console.log("Connected!");
                send("Sending Data to Server.")
        }
	ws.onmessage = function(response) {
		processResponse(response.data);
  	}
}
// Print All Server Responses in the console.
function processResponse(data) {
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

