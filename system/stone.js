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
        var score_x = this.stones.length;
        var colour_x = "black";

        if(this.stones.length > 0)
            colour_x = this.stones[0].colour;

        for (var i = 0; i < this.stones.length; i++)
            board.deleteMove(this.stones[i].y,this.stones[i].x);
        this.stones = [];
        board.cleanChains();
        if(me.colour == colour_x) {
            me.updateScore(-score_x);
            op.updateScore(score_x);
        } else {
            me.updateScore(score_x);
            op.updateScore(-score_x);
        }
   }

}

class Stone {
    constructor(colour, y, x) {
        this.colour = colour; //"black" | "white"
        this.liberty = new Liberty(this); //for this specific stone
        this.x = x;
        this.y = y;
        this.mychain = new Chain(this.colour, []);
        this.checkForChain();
    }




    checkForChain() {
        
        var addedToChain = false, added_x = 0, added_y = 0;
        // if there is a stone to left that same colour as you
        if (this.liberty.left == 0 && this.isMyStone(this.y, this.x-1)) {
            board.board[this.y][this.x-1].mychain.stones.push(this);
            addedToChain = true;
            added_y = this.y;
            added_x = this.x - 1;
        }

        
        // if there is a stone to right that same colour as you
        if (this.liberty.right == 0 && this.isMyStone(this.y, this.x+1)){
            if(addedToChain) {
                for(var i = 0; i < board.board[this.y][this.x+1].mychain.stones.length; i++)
                    board.board[added_y][added_x].mychain.stones.push(board.board[this.y][this.x+1].mychain.stones[i]);
                board.board[this.y][this.x+1].mychain.stones = [];
            }
            else {
                board.board[this.y][this.x+1].mychain.stones.push(this);
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
                for(var i = 0; i < board.board[this.y+1][this.x].mychain.stones.length; i++)
                    board.board[added_y][added_x].mychain.stones.push(board.board[this.y+1][this.x].mychain.stones[i]);
                board.board[this.y+1][this.x].mychain.stones = [];
            }
            else {
                board.board[this.y+1][this.x].mychain.stones.push(this);
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
                for(var i = 0; i < board.board[this.y-1][this.x].mychain.stones.length; i++)
                    board.board[added_y][added_x].mychain.stones.push(board.board[this.y-1][this.x].mychain.stones[i]);
                board.board[this.y-1][this.x].mychain.stones = [];
            }
            else {
                board.board[this.y-1][this.x].mychain.stones.push(this);
                addedToChain = true;
                added_y = this.y - 1;
                added_x = this.x;
            }
            board.cleanChains();
            //console.log("BOTTOM CHAIN !!!!!!!!!!!!!!!");  
        }
        

        if(!addedToChain) {
            this.mychain = new Chain(this.colour, [this]);
            board.chains.push(this.mychain);
        }
        
    }

    isMyStone(y, x) { //typeof board.board[y][x] == "object" && board.board[y][x].hasOwnProperty('colour')   
        return board.board[y] && board.board[y][x] && board.board[y][x].colour == this.colour;
    }


    //stoneGroupConstruction() {
        //hint -> use `this.board`
    //}

    updateLiberties() {
        this.liberty.left = (this.x > 0 && board.board[this.y][this.x-1] == "Free") ? 1 : 0;
        this.liberty.right = (this.x < (board.board_size - 1) && board.board[this.y][this.x+1] == "Free") ? 1 : 0;  
        this.liberty.top = (this.y > 0 && board.board[this.y-1][this.x] == "Free") ? 1 : 0;
        this.liberty.bottom = (this.y < (board.board_size - 1) && board.board[this.y+1][this.x] == "Free") ? 1 : 0;
    }

    //suicideCheck() {

    //}


}