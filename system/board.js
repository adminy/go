class Board{
    constructor() {
        this.canvas = document.getElementById("board");
		this.border = document.getElementById("border");

		this.board_size = 9; //hardcoded board size
		this.board_pos = 0; //this.board_size*4; //board position on the canvas

        this.board = [];
        for(let y = 0; y < this.board_size; y++) {
            this.board[y] = [];
            for(let x = 0; x < this.board_size; x++)
                this.board[y][x] = "Free";
        }

    }

    updateSizes() {
		//this.canvas.width = this.canvas.style.width =  window.innerHeight/1.5;
		//this.canvas.height = this.canvas.style.height = window.innerHeight/1.5;
		this.distance_between = this.canvas.width/this.board_size; //distance between spaces

	}

	
}
