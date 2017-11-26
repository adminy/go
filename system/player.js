class Player {
    constructor(colour, score) {
        this.colour = colour; //"black" | "white"
        this.score = new Score(this); //this is reference to this current instance of a player
        this.canMove = false;
    }
    makeTurn(y, x) {
        if(this.canMove)
            send('move,'+this.colour+','+y+','+x);
    }

    placeTurn(data) {
        var move = data.split(',');
        var move_colour = move[1], move_y = parseInt(move[2]), move_x = parseInt(move[3]);

        board.drawMove(move_colour, move_y, move_x );
        board.board[move_y][move_x] = new Stone(board, move_colour, move_y, move_x);
        
        var history_div = document.getElementById("move_history");
        history_div.innerHTML += move[1] + " at y: " + (parseInt(move[2])+1) + " x: " + (parseInt(move[2])) + "<br>";
        history_div.scrollTop = history_div.scrollHeight;
        //document.getElementById("move_history").innerHTML += move[1] + " at y: " + (parseInt(move[2])+1) + " x: " + (parseInt(move[2])) + "<br>";
        //document.getElementById("move_history").scrollTop = document.getElementById("move_history").scrollHeight;

    }
}