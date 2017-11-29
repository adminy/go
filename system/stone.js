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
    constructor(colour, stones) {
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
    removeChain(){  //removeChain removes a chain but also returns the chains length

        var score = this.stones.length;
        for (var i = 0; i < this.stones.length; i++){
            board.deleteMove(this.stones[i].y,this.stones[i].x)
        }
        this.stones = [];
        
    }

}

class Stone {
    constructor(colour, y, x) {
        this.colour = colour; //"black" | "white"
        this.liberty = new Liberty(this); //for this specific stone
        this.x = x;
        this.y = y;
        this.checkForChain();
        
        
        //console.log("the");

        // everything else
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




    checkForChain() {
        var addedToChain = false, added_x = 0, added_y = 0;
        // if there is a stone to left that same colour as you
        if (this.liberty.left == 0 && this.isMyStone(this.y, this.x-1)) {
            this.aminChain(board.board[this.y][this.x-1]).stones.push(this);
            addedToChain = true;
            added_y = this.y;
            added_x = this.x - 1;
        }

        
        // if there is a stone to right that same colour as you
        if (this.liberty.right == 0 && this.isMyStone(this.y, this.x+1)){
            if(addedToChain) {
                while(this.aminChain(board.board[this.y][this.x+1]) != [])
                    this.aminChain(board.board[added_y][added_x]).stones.push(this.aminChain(board.board[this.y][this.x+1]).stones.pop());
            }
            else {
                this.aminChain(board.board[this.y][this.x+1]).stones.push(this);
                addedToChain = true;
                added_y = this.y;
                added_x = this.x + 1;
            }
            board.cleanChains();
            //console.log("RIGHT CHAIN !!!!!!!!!!!!!!!");
        }



        // if there is a stone above that is same colour as you
        if (this.liberty.top == 0 && this.isMyStone(this.y+1, this.x)) {
            if(addedToChain) {
                while(this.aminChain(board.board[this.y+1][this.x]) != [])
                    this.aminChain(board.board[added_y][added_x]).stones.push(this.aminChain(board.board[this.y+1][this.x]).stones.pop());
            }
            else {
                this.aminChain(board.board[this.y+1][this.x]).stones.push(this);
                addedToChain = true;
                added_y = this.y  + 1;
                added_x = this.x;
            }
            board.cleanChains();
           // console.log("TOP CHAIN !!!!!!!!!!!!!!!");
        }



        // if there is a stone below that is same colour as you
        if (this.liberty.bottom == 0 && this.isMyStone(this.y-1, this.x)){
            if(addedToChain) {
                while(this.aminChain(board.board[this.y-1][this.x]) != [])
                    this.aminChain(board.board[added_y][added_x]).stones.push(this.aminChain(board.board[this.y-1][this.x]).stones.pop());
            }
            else {
                this.aminChain(board.board[this.y-1][this.x]).stones.push(this);
                addedToChain = true;
                added_y = this.y - 1;
                added_x = this.x;
            }
            board.cleanChains();
            //console.log("TOP CHAIN !!!!!!!!!!!!!!!");  
                  }
        

        if(!addedToChain)
            board.chains.push(new Chain(this.colour, [this]))
    }

        




    aminChain(stone) {
        for( let i = 0; i < board.chains.length; i++)
            for(let j = 0; j < board.chains[i].stones.length; j++)
                if(board.chains[i] && board.chains[i].stones[j] == stone)
                    return board.chains[i];
    }

    isMyStone(y, x) {
        if(board.board[y] && board.board[y][x])
            return board.board[y][x] && board.board[y][x].colour == this.colour;
    }

    stoneGroupConstruction() {
        //hint -> use `this.board`
    }

    updateLiberties() {
        this.liberty.left = (this.x > 0 && board.board[this.y][this.x-1] == "Free") ? 1 : 0;
        this.liberty.right = (this.x < (board.board_size - 1) && board.board[this.y][this.x+1] == "Free") ? 1 : 0;  
        this.liberty.top = (this.y > 0 && board.board[this.y-1][this.x] == "Free") ? 1 : 0;
        this.liberty.bottom = (this.y < (board.board_size - 1) && board.board[this.y+1][this.x] == "Free") ? 1 : 0;
    }

    suicideCheck() {

    }


}