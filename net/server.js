class GameState {
    constructor() {
        this.state = 0;
        //0 -> initial state
        //1 -> starrted state (waiting on player response)
        //2 -> finished state (calculating score)
        //3 -> player1 wins
        //4 -> player2 wins
        //5 -> connection error
        //6 -> game terminated by player -> go to state 2
        //7 -> unknown error state
    }
}

class Server {
    constructor() {
        GameState;
        NetworkManager;
    }
    processRequest(){}
    verifyRequest(){}
    checkStatus(){}
    createPlayer(){}
    createStones(){}
    initializeGame(){}
    send(){}
    createTurnInformationObject(){}
    chatBox(){}
    timer(){}
    moveHistory(){}
    endGame(){}
    score(){}
    createBoardRequest(){}
    createPlayerPrisoner(){}
    createPlayerScoreInformation(){} 
 }