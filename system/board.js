var newChains;	//global variables.

class Board {
    constructor() {
        this.canvas = document.getElementById("board");
        this.canvas.width = window.innerHeight/1.6;
        this.canvas.height = window.innerHeight/1.6;
		this.board_size = 9; //hardcoded board size

		this.board_pos = this.canvas.width/this.board_size; //this.board_size*4; //board position on the canvas
		this.distance_between = this.canvas.width/this.board_size; //distance between spaces		
		this.radius = this.distance_between/2;

		this.canvas.style.width = this.canvas.width =  this.distance_between * this.board_size + this.distance_between;
		this.canvas.style.height = this.canvas.height = this.distance_between * this.board_size + this.distance_between;

		this.chains = [];
        this.board = [];
        this.cleanBoard();
		//draw empty board
		this.drawBoard();
		
		this.canvas.addEventListener("mousedown", function(event) {
			//console.log("CX:"+event.clientX+" CY:"+event.clientY + " BR:"+JSON.stringify(board.rect))
			board.checkvalidclick({x: event.clientX - board.rect.left,
								   y: event.clientY - board.rect.top});
		});

    }

    cleanBoard() {
    	//fill the board with "Free"
        for(let y = 0; y < this.board_size; y++) {
            this.board[y] = [];
            for(let x = 0; x < this.board_size; x++)
                this.board[y][x] = "Free";
		}
    }

    checkFull() {
    	var total = 0;
        for(let y = 0; y < this.board.length; y++)
            for(let x = 0; x < this.board[y].length; x++)
                if(this.board[y][x] != "Free")
                	total++;
        return total == this.board_size ** 2;
    }

	drawBoard() {


		this.rect = this.canvas.getBoundingClientRect();
		this.ctx = this.canvas.getContext('2d');

		
		this.ctx.beginPath();
		for(var i = 0; i < this.board_size; i++) {
			this.ctx.moveTo(this.board_pos, this.board_pos + this.distance_between * i);
			this.ctx.lineTo(this.board_pos + this.distance_between * (this.board_size-1), this.board_pos + this.distance_between * i);
			this.ctx.moveTo(this.board_pos + this.distance_between * i, this.board_pos);
			this.ctx.lineTo(this.board_pos + this.distance_between * i, this.board_pos + this.distance_between * (this.board_size-1));
		}
		this.ctx.closePath();
		this.ctx.stroke();

		//now draw the circles
		for(var y = 0; y < this.board.length; y++) {
			for(var x = 0; x < this.board[y].length; x++) {
				this.ctx.beginPath();
				this.ctx.arc(this.board_pos + x * this.distance_between, this.board_pos + y * this.distance_between, this.radius, 0, 2*Math.PI);
				this.ctx.closePath();
				this.ctx.stroke();
			}
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

	/* move valid called by event listener, so is it the player's turn?	//check `me.canMove` {Bool}
	*	-when its the user's turn and it is a valid move to make, like that position is empty
	*	-then make a Turn using player class
	*/
	checkvalidclick(mouse) {
		for(var y = 0; y < this.board.length; y++) {
			for(var x = 0; x < this.board[y].length; x++) {
				var my = this.board_pos + y * this.distance_between, 
					mx = this.board_pos + x * this.distance_between;
				//try rounding??
				//console.log("MY:"+my + " MX:"+mx +" M_X:" +mouse.x+" M_Y:" +mouse.y )
				//if clicked inside a circle
				//if(Math.sqrt((mouse.x-mx)**2+(mouse.y-my)**2 < this.radius 
				//	&& this.board[y][x] == "Free" && me.canMove))
				if(mouse.x > mx - this.radius && mouse.x < mx + this.radius &&
					mouse.y > my - this.radius && mouse.y < my + this.radius &&
					 this.board[y][x] == "Free" && me.canMove)
					me.makeTurn(y, x);
			}
		}
	}

	drawMove(colour, y, x) {
		var my = this.board_pos + y * this.distance_between, 
			mx = this.board_pos + x * this.distance_between;
		this.ctx.beginPath();
		this.ctx.arc(mx, my, this.radius, 0, 2*Math.PI);
		this.ctx.fillStyle = colour;
		this.ctx.fill();
		this.ctx.closePath();
	}


	deleteMove(y, x) {
		this.board[y][x] = "Free";
		this.update();
	}

	update() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawBoard();
        for(var y = 0; y < this.board.length; y++)
            for(var x = 0; x < this.board[y].length; x++)
                if(this.board[y][x] != "Free")
                    this.drawMove(board.board[y][x].colour, y, x);
        if(this.checkFull()) {
        	game_again();
        }

        var history_div = document.getElementById("history");
        history_div.scrollTop = history_div.scrollHeight;

	}

}
