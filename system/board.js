class Board {
    constructor() {
        this.canvas = document.getElementById("board");
		this.border = document.getElementById("border");

		this.board_size = 9; //hardcoded board size
		this.board_pos = 33; //this.board_size*4; //board position on the canvas

		this.chains = [];

        this.board = [];
        for(let y = 0; y < this.board_size; y++) {
            this.board[y] = [];
            for(let x = 0; x < this.board_size; x++)
                this.board[y][x] = "Free";
		}
		
		this.drawBoard();
		this.waitForUserEvents();

    }

    updateSizes() {
		this.canvas.width = 600;
		this.canvas.style.width = 600; //window.innerHeight/1.5;
		this.canvas.height = 600;
		this.canvas.style.height = 600; // = window.innerHeight/1.5;
		this.distance_between = this.canvas.width/this.board_size; //distance between spaces

	}

	drawBoard() {
		this.updateSizes();

		var c = this.canvas.getContext("2d");
		
		c.beginPath();
		for(var i = 0; i < this.board_size; i++) {
			c.moveTo(this.board_pos, this.board_pos + this.distance_between * i);
			c.lineTo(this.board_pos + this.distance_between * (this.board_size-1), this.board_pos + this.distance_between * i);
			c.moveTo(this.board_pos + this.distance_between * i, this.board_pos);
			c.lineTo(this.board_pos + this.distance_between * i, this.board_pos + this.distance_between * (this.board_size-1));
		}
		c.closePath();
		c.stroke();
	
	
		//place positions
		this.board_positions = [];
		this.radius = this.distance_between/2;
		
		for(var y = this.board_pos; y <= this.distance_between * this.board_size; y += this.distance_between) {
			//this.board_positions.push([]);
			for(var x = this.board_pos; x <= this.distance_between*this.board_size; x += this.distance_between) {
				c.beginPath();
				c.arc(x, y, this.radius, 0, 2*Math.PI);
				c.closePath();
				c.stroke();
				this.board_positions.push([x,y, false]); //x, y, set on board or not?
			}
			i++;
		}
	}

	cleanChains() {
		var newChains = [];
		for(let i = 0; i < this.chains.length; i++)
			if(this.chains[i].stones.length > 0)
				newChains.push(this.chains[i]);
		this.chains = newChains;

	}

	waitForUserEvents() {
		var that = this;
	
		this.black_white_player_turn = true; //TODO: remove in the future
		
		this.canvas.addEventListener("click", function(event) {          
				var rect = that.canvas.getBoundingClientRect();
				var mouse = {x: event.clientX - rect.left, y: event.clientY - rect.top};
				that.checkvalidclick(mouse);
		}, false);
	}

	checkvalidclick(mouse) {
		for(var i = 0; i < this.board_positions.length; i++) {
			//if clicked inside a circle
			if(Math.sqrt((mouse.x - this.board_positions[i][0]) * (mouse.x - this.board_positions[i][0]) +
				 (mouse.y - this.board_positions[i][1]) * (mouse.y - this.board_positions[i][1])) < 
						this.radius && this.board_positions[i][2] !== true) {
					
					//move valid, so is it the player's turn?	//check     `canMove`		variable
					me.makeTurn(parseInt(i/this.board_size), i%this.board_size); //move y, x
				/*	console.log("Y: "+parseInt(i/this.board_size)+", X: "+ (i%this.board_size) );

				//for decorative purpose have player move hihi
				var c = this.canvas.getContext("2d");
					c.beginPath();
					c.arc(this.board_positions[i][0], this.board_positions[i][1], this.radius, 0, 2*Math.PI);
					c.fillStyle = this.black_white_player_turn ? "black" : "white";
					c.fill();
					c.closePath();
					this.black_white_player_turn = !this.black_white_player_turn;
					this.board_positions[i][2] = true; */
			}
				
		}
	}

	drawMove(colour, y, x) {
		var i = y * this.board_size + x;
		var c = this.canvas.getContext("2d");
		//console.log(i);
		c.beginPath();
		c.arc(this.board_positions[i][0], this.board_positions[i][1], this.radius, 0, 2*Math.PI);
		c.fillStyle = colour;
		c.fill();
		c.closePath();
		this.board_positions[i][2] = true; //TODO: this tells position taken don't place anymore but ... Not checked above ... not used

	}
}
