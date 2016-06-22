export
class CellModel {
    get checker() {
        return this._checker;
    }
    set checker(value) {
        this._checker = value;
    }

    constructor(board, point, color) {
        this.board = board;
        this.color = color;

        this.point = point;
    }
}