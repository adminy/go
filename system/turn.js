class Turn {
	constructor(player) {
		this.player = player;
	}

    makeTurn(player) {
		document.getElementById("playerturn").innerHTML=player.colour;

    }

}