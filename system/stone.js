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
        for (var i = 0; i < this.stones.length; i ++) {
            liberties += this.stones[i].Liberty.total();
        }
    }

}

class Stone {
    constructor(board, colour, y, x) {
        this.board = board; //the 9x9 2D list in which `this` stone belongs to
        this.colour = colour; //"black" | "white"
        this.liberty = new Liberty(this); //for this specific stone
        this.x = x;
        this.y = y;

        //this.checkForChain();
        
    }
    libertyAttack() {
        
        //hint -> use `this.board`
    }

    checkForChain() {
        var theChain = [], addedToChain = false;
        // if there is a stone to left that same colour as you
        if (this.liberty.left == 0 && this.isMyStone(this.y, this.x-1)){
            theChain = this.aminChain(this.board.board[this.y][this.x-1]);
            theChain.stones.push(this);
            addedToChain = true;
            //console.log(leftChain);
        }

        
        // if there is a stone to right that same colour as you
        if (this.liberty.right == 0 && this.isMyStone(this.y, this.x+1)){
            
            var rightChain = this.aminChain(this.board.board[this.y][this.x+1]);

            if(addedToChain)
                while(rightChain)
                    theChain.push(rightChain.pop());
            else {
                rightChain.stones.push(this);
                addedToChain = true;
                theChain = rightChain;
            }
            this.board.cleanChains();
        }



        // if there is a stone above that is same colour as you
        if (this.liberty.top == 0 && this.isMyStone(this.y+1, this.x)){
            var topChain = this.aminChain(this.board.board[this.y+1][this.x]);

            if(addedToChain)
                while(topChain)
                    theChain.push(topChain.pop());
            else {
                topChain.stones.push(this);
                addedToChain = true;
                theChain = topChain;
            }
            this.board.cleanChains();
        }



        // if there is a stone below that is same colour as you
        if (this.liberty.bottom == 0 && this.isMyStone(this.y-1, this.x)){
            var bottomChain = this.aminChain(this.board.board[this.y-1][this.x]);
            
            if(addedToChain)
                while(bottomChain)
                    theChain.push(bottomChain.pop());
            else {
                bottomChain.stones.push(this);
                addedToChain = true;
                theChain = bottomChain;
            }
            this.board.cleanChains();
        }
        

        if(!addedToChain)
            this.board.chains.push(new Chain(this.board.board, this.colour, [this]))
        else
            this.board.chains.push(theChain)
    }






    aminChain(stone) {
        for( let i = 0; i < this.board.chains.length; i++)
            for(let j = 0; j < this.board.chains[i].stones.length; j++)
                if(this.board.chains[i].stones[j] == stone)
                    return this.board.chains[i];

    }

    isMyStone(y, x) {
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