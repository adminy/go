var newChains;	//global variables.

class Board {
    constructor() {
        this.canvas = document.getElementById("board");

		this.canvas.style.width = this.canvas.width = 600;
		this.canvas.style.height = this.canvas.height = 600;
		this.ctx = this.canvas.getContext('2d');
		this.board_size = 9; //hardcoded board size
		this.board_pos = 33; //this.board_size*4; //board position on the canvas
		this.distance_between = this.canvas.width/this.board_size; //distance between spaces		
		this.chains = [];
        this.board = [];
        //fill the board with "Free"
        for(let y = 0; y < this.board_size; y++) {
            this.board[y] = [];
            for(let x = 0; x < this.board_size; x++)
                this.board[y][x] = "Free";
		}
		//draw empty board
		this.drawBoard();
		this.waitForUserEvents();

    }


	drawBoard() {
		
		this.ctx.beginPath();
		for(var i = 0; i < this.board_size; i++) {
			this.ctx.moveTo(this.board_pos, this.board_pos + this.distance_between * i);
			this.ctx.lineTo(this.board_pos + this.distance_between * (this.board_size-1), this.board_pos + this.distance_between * i);
			this.ctx.moveTo(this.board_pos + this.distance_between * i, this.board_pos);
			this.ctx.lineTo(this.board_pos + this.distance_between * i, this.board_pos + this.distance_between * (this.board_size-1));
		}
		this.ctx.closePath();
		this.ctx.stroke();
	
	
		//place positions
		this.board_positions = [];
		this.radius = this.distance_between/2;
		
		for(var y = this.board_pos; y <= this.distance_between * this.board_size; y += this.distance_between) {
			//this.board_positions.push([]);
			for(var x = this.board_pos; x <= this.distance_between*this.board_size; x += this.distance_between) {
				this.ctx.beginPath();
				this.ctx.arc(x, y, this.radius, 0, 2*Math.PI);
				this.ctx.closePath();
				this.ctx.stroke();
				this.board_positions.push([x,y, false]); //x, y, set on board or not?
			}
			i++;
		}
	}
	/* This method removes empty chains from the board
	*	-goes through every chain and checks if it has no stones
	*	-if its not empty it will add it to the new chains list. then that will be the new chains list.
	*/
	cleanChains() {
		newChains = [];
		for(let i = 0; i < this.chains.length; i++)
			if(this.chains[i].stones != [])
				newChains.push(this.chains[i]);
		this.chains = newChains;
		newChains = [];
	}

	waitForUserEvents() {
		this.canvas.addEventListener("click", function(event) {          
				var rect = board.canvas.getBoundingClientRect();
				var mouse = {x: event.clientX - rect.left, y: event.clientY - rect.top};
				board.checkvalidclick(mouse);
		}, false);
	}
	/* move valid called by event listener, so is it the player's turn?	//check `me.canMove` {Bool}
	*	-when its the user's turn and it is a valid move to make, like that position is empty
	*	-then make a Turn using player class
	*/
	checkvalidclick(mouse) {
		for(var i = 0; i < this.board_positions.length; i++) {
			//ALTERNATIVE CODE
			//if clicked inside a circle
			if(Math.sqrt((mouse.x - this.board_positions[i][0]) * (mouse.x - this.board_positions[i][0]) +
				 (mouse.y - this.board_positions[i][1]) * (mouse.y - this.board_positions[i][1])) < 
						this.radius && this.board_positions[i][2] !== true && me.canMove) {
			
			//if(Math.pow(mouse.x - this.board_positions[i][0], 2) + Math.pow(mouse.y - this.board_positions[i][1], 2) < Math.pow(this.radius,2) && this.board_positions[i][2] !== true && ) {

					me.makeTurn(parseInt(i/this.board_size), i%this.board_size); //move y, x
					this.board_positions[i][2] = true;
					//console.log("Y: "+parseInt(i/this.board_size)+", X: "+ (i%this.board_size) );
			}	
		}
	}

	drawMove(colour, y, x) {
		var i = y * this.board_size + x;
		//console.log(i);
		this.ctx.beginPath();
		this.ctx.arc(this.board_positions[i][0], this.board_positions[i][1], this.radius, 0, 2*Math.PI);
		this.ctx.fillStyle = colour;
		this.ctx.fill();
		this.ctx.closePath();
		this.board_positions[i][2] = true;
	}


	deleteMove(y, x) {
		var i = y * this.board_size + x;

		this.ctx.beginPath();
		this.ctx.arc(this.board_positions[i][0], this.board_positions[i][1], this.radius, 0, 2*Math.PI);
		
		this.ctx.moveTo(this.board_positions[i][0] - this.radius,this.board_positions[i][0], this.radius,this.board_positions[i][1]);
		this.ctx.lineTo(this.board_positions[i][0] + this.radius, this.board_positions[i][1] + this.radius);

		this.ctx.moveTo(this.board_positions[i][1] - this.radius,this.board_positions[i][1], this.radius,this.board_positions[i][0]);
		this.ctx.lineTo(this.board_positions[i][1] + this.radius, this.board_positions[i][0] + this.radius);

		this.ctx.fillStyle = "#e1995e";
		this.ctx.fill();
		this.ctx.closePath();
		this.board_positions[i][2] = false; //TODO: this tells position taken don't place anymore but ... Not checked above ... not used
		this.board[y][x] = "Free"; //something here	
	}
}
