class Player {
    constructor(colour, score) {
        this.colour = colour; //"black" | "white"
        this.score = score; //new Score(this); //this is reference to this current instance of a player
        //score = this.score;
        this.canMove = false;
    }
    makeTurn(y, x) {
        if(this.canMove)
            send('move,'+this.colour+','+y+','+x);
    }
    updateScore(x) {
        this.score += x;
        document.getElementById(this.colour + "_score").innerHTML = this.score;
    }
    placeTurn(data) {
        var move        = data.split(',');
        var move_colour = move[1],
            move_y      = parseInt(move[2]),
            move_x      = parseInt(move[3]);
        board.board[move_y][move_x] = new Stone(move_colour, move_y, move_x);
        this.refreshLiberties();
        this.prisoners(move_y, move_x);
        
        var history_div = document.getElementById("history");
        history_div.innerHTML += move[1] + " at y: " + move_y + " x: " + move_x + "<br>";
        history_div.scrollTop = history_div.scrollHeight;
        board.update();
    }

    refreshLiberties() {
        for(var y = 0; y < board.board.length; y++)
            for(var x = 0; x < board.board[y].length; x++)
                if(board.board[y][x] != "Free")
                    board.board[y][x].updateLiberties();
    }


    prisoners(y, x){
        //check suicide
        if (board.board[y][x].mychain.totalLiberties() == 0){
        // remove this chain
            board.board[y][x].mychain.removeChain();
            //update other score by chain length

        }
        else {
            //check all other chains and remove
            for(var i = 0; i < board.chains.length; i++)
                if(board.chains[i].totalLiberties() == 0)
                    board.chains[i].removeChain();
                    //update my score by chain length
        }
    }

}