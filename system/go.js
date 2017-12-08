		var ws, isPlayerSetup = false, board, me, op, score,  game_reset = false; //global variables
		/*
		var black_turns = 0;		//to remove at the end of testing
		var white_turns = 0;		//to remove at the end of testing
		function autoplay() {
			if(me && me.colour == "black" && me.canMove) {
				if(black_turns == 0) { me.makeTurn(3,2); console.log("black moved0"); }
				if(black_turns == 1) { me.makeTurn(4,1); console.log("black moved1"); }
				black_turns++;
				
			}

			if(me && me.colour == "white" && me.canMove) {
				if(white_turns == 0) { me.makeTurn(4,2); console.log("white moved"); }
				if(white_turns == 1) { me.makeTurn(4,0); console.log("white moved"); }
				white_turns++;
			}
			setTimeout(autoplay, 2000);
		}*/



		document.onreadystatechange = function () {
			if(document.readyState == "complete") {
				board = new Board();
				
				selectServer("51.37.119.242:88");
				//setTimeout(autoplay,0);


				document.getElementById('history').style.height = window.innerHeight - window.innerHeight/10;
			}
		};


		function random_fill(winner_colour) {
			let y = Math.floor(Math.random() * board.board_size),
			    x = Math.floor(Math.random() * board.board_size);
			board.board[y][x] = new Stone(winner_colour, y, x);
			board.update();
			setTimeout(function() { 
				if(!game_reset) {
					if(board.checkFull()) board.cleanBoard();
					random_fill(winner_colour); 
				}
			}, 0);
		}

		function finish_game() {
			let winner_colour = "green";
			if(parseInt(document.getElementById('black_score').innerHTML) > parseInt(document.getElementById('white_score').innerHTML)) {
				document.getElementById('history').innerHTML += "<font color=green>Black Wins !</font><br>";
				winner_colour = "black";
			} else {
				document.getElementById('history').innerHTML += "<font color=green>White Wins !</font><br>";
				winner_colour = "white";
			}
			board.cleanBoard();
			game_reset = false;
			random_fill(winner_colour);
			document.getElementById('reset_game').removeAttribute('disabled');
			document.getElementById('end_game').setAttribute('disabled', 'true');
		}

		function game_again() {
			document.getElementById('reset_game').setAttribute('disabled', 'true');
			document.getElementById('end_game').removeAttribute('disabled');
			game_reset = true;
			board.cleanBoard();
			board.update();
			document.getElementById('history').innerHTML = "<font color=green>Game Reset!</font><br>";
			document.getElementById('history').innerHTML = '';
				
		}