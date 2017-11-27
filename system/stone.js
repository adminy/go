class Liberty {
    constructor(stone) {
        this.top    = 0;
        this.left   = 0;
        this.bottom = 0;
        this.right  = 0;
    }
    total() {
        return this.top + this.left + this.bottom + this.right;
    }

}

class Chain {
    constructor(board, colour, stones) {
        this.board = board;
        this.colour = colour;
        this.stones = stones;
        this.liberties = 0;
    }

    totalLiberties() {
        this.liberties = 0;
        for (var i = 0; i < this.stones.length; i ++) {
            this.liberties += this.stones[i].liberty.total();
        }
        return this.liberties;

    }

}

class Stone {
    constructor(board, colour, y, x) {
        this.board = board; //the 9x9 2D list in which `this` stone belongs to
        this.colour = colour; //"black" | "white"
        this.liberty = new Liberty(this); //for this specific stone
        this.x = x;
        this.y = y;

        this.checkForChain();
        this.libertyAttack();
        /*
        for(var i = 0; i < this.board.chains.length; i++) {
            console.log(this.board.chains[i].totalLiberties());
            if(this.board.chains[i].totalLiberties() == 0) {
                for(var j = 0; j < board.chains[i].stones.length; j++) {
                    this.board.deleteMove(board.chains[i].stones[j].y, board.chains[i].stones[j].x);
                    //update score
                }
                this.board.chains[i].stones = [];
                this.board.cleanChains();
            }
        }*/
        
    }
    libertyAttack() {
        this.updateLiberties();
        for(var i = 0; i < board.chains.length; i++) {
            for(var j = 0; j < board.chains[i].stones.length; j++) {
                board.chains[i].stones[j].updateLiberties();
            }
        }    

        
    }

    checkForChain() {
        var addedToChain = false, added_x = 0, added_y = 0;
        // if there is a stone to left that same colour as you
        if (this.liberty.left == 0 && this.isMyStone(this.y, this.x-1)) {
            this.aminChain(this.board.board[this.y][this.x-1]).stones.push(this);
            addedToChain = true;
            added_y = this.y;
            added_x = this.x - 1;
        }

        
        // if there is a stone to right that same colour as you
        if (this.liberty.right == 0 && this.isMyStone(this.y, this.x+1)){
            if(addedToChain) {
                while(this.aminChain(this.board.board[this.y][this.x+1]) != [])
                    this.aminChain(this.board.board[added_y][added_x]).stones.push(this.aminChain(this.board.board[this.y][this.x+1]).stones.pop());
            }
            else {
                this.aminChain(this.board.board[this.y][this.x+1]).stones.push(this);
                addedToChain = true;
                added_y = this.y;
                added_x = this.x + 1;
            }
            this.board.cleanChains();
            console.log("RIGHT CHAIN !!!!!!!!!!!!!!!");
        }



        // if there is a stone above that is same colour as you
        if (this.liberty.top == 0 && this.isMyStone(this.y+1, this.x)) {
            if(addedToChain) {
                while(this.aminChain(this.board.board[this.y+1][this.x]) != [])
                    this.aminChain(this.board.board[added_y][added_x]).stones.push(this.aminChain(this.board.board[this.y+1][this.x]).stones.pop());
            }
            else {
                this.aminChain(this.board.board[this.y+1][this.x]).stones.push(this);
                addedToChain = true;
                added_y = this.y  + 1;
                added_x = this.x;
            }
            this.board.cleanChains();
            console.log("TOP CHAIN !!!!!!!!!!!!!!!");
        }



        // if there is a stone below that is same colour as you
        if (this.liberty.bottom == 0 && this.isMyStone(this.y-1, this.x)){
            if(addedToChain) {
                while(this.aminChain(this.board.board[this.y-1][this.x]) != [])
                    this.aminChain(this.board.board[added_y][added_x]).stones.push(this.aminChain(this.board.board[this.y-1][this.x]).stones.pop());
            }
            else {
                this.aminChain(this.board.board[this.y-1][this.x]).stones.push(this);
                addedToChain = true;
                added_y = this.y - 1;
                added_x = this.x;
            }
            this.board.cleanChains();
            console.log("TOP CHAIN !!!!!!!!!!!!!!!");        }
        

        if(!addedToChain)
            this.board.chains.push(new Chain(this.board.board, this.colour, [this]))
    }

        




    aminChain(stone) {
        for( let i = 0; i < this.board.chains.length; i++)
            for(let j = 0; j < this.board.chains[i].stones.length; j++)
                if(this.board.chains[i] && this.board.chains[i][j] && this.board.chains[i].stones[j] == stone)
                    return this.board.chains[i];

    }

    isMyStone(y, x) {
        if(this.board.board[y] && this.board.board[y][x])
            return this.board.board[y][x] && this.board.board[y][x].colour == this.colour;
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

    suicideCheck() {



    }


}