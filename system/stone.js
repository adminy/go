class Liberty {
    constructor(stone) {
        this.top = 0;
        this.left = 0;
        this.bottom = 0;
        this.right = 0;
    }
}

class Stone {
    constructor(board, color) {
        this.board = board; //the 9x9 2D list in which `this` stone belongs to
        this.color = color; //"black" | "white"
        this.liberty = new Liberty(this); //for this specific stone
    }
    libertyAttack() {
        //hint -> use `this.board`
    }
    stoneGroupConstruction() {
        //hint -> use `this.board`
    }
    availableLiberties() {
        //hint -> use `this.board`
        //hint -> use this.liberty.top|left|right|bottom
    }
}