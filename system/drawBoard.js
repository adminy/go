class drawBoard {
	constructor() {
		this.canvas = document.getElementById("board");
		this.border = document.getElementById("border");
		this.board_size = 9; //hardcoded board size
		this.board_pos = 0; //this.board_size*4; //board position on the canvas
	}
	
	updateSizes() {
		//this.canvas.width = this.canvas.style.width =  window.innerHeight/1.5;
		//this.canvas.height = this.canvas.style.height = window.innerHeight/1.5;
		this.distance_between = this.canvas.width/this.board_size; //distance between spaces

	}

	drawBoard(board) {
		this.updateSizes();

		this.ctx = this.canvas.getContext("2d");

		ctx.beginPath();
		
		for(var i = 0; i < size; i++) {
			ctx.moveTo(this.board_pos, this.board_pos + this.distance_between * i);
			ctx.lineTo(this.board_pos + this.distance_between * (this.board_size-1),
					   this.board_pos + this.distance_between * i);

			ctx.moveTo(this.board_pos + this.distance_between * i, this.board_pos);
			ctx.lineTo(this.board_pos + this.distance_between * i,
					   this.board_pos + this.distance_between * (this.board_size-1));
		}

		ctx.closePath();
		ctx.stroke();

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

	}

/*
	


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


*/	
	
}