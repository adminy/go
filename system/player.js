class Player {
    constructor(colour, score) {
        this.colour = colour; //"black" | "white"
        this.score = new Score(this); //this is reference to this current instance of a player
    }
}