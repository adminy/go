class Liberty {
    constructor(stone) {
        this.top = 0;
        this.left = 0;
        this.bottom = 0;
        this.right = 0;
    }
}

class Stone {
    constructor(board, color, y, x) {
        this.board = board; //the 9x9 2D list in which `this` stone belongs to
        this.color = color; //"black" | "white"
        this.liberty = new Liberty(this); //for this specific stone
        this.x = x;
        this.y = y;
    }
    libertyAttack() {
        this.liberty.top = false;
        //hint -> use `this.board`
    }
    stoneGroupConstruction() {
        //hint -> use `this.board`
    }
    updateLiberties() {
        if (this.x > 0 && this.board.board[this.y][this.x-1] == "Free") {
            this.liberty.left = 1;
        }
        
        if (this.x < (this.board.board_size - 1) && this.board.board[this.y][this.x+1] == "Free") {
            
            this.liberty.right = 1;
        }
        if (this.y > 0 && this.board.board[this.y-1][this.x] == "Free") {
            this.liberty.top = 1;
        }
        if (this.y < (this.board.board_size - 1) && this.board.board[this.y+1][this.x] == "Free") {
            this.liberty.bottom = 1;
        }
 

        //hint -> use `this.board`
        //hint -> use this.liberty.top|left|right|bottom
    }
}