class Player {
    constructor(color, score) {
        this.color = color; //"black" | "white"
        this.score = new Score(this); //this is reference to this current instance of a player
    }
}