import {Point} from './../helper/point.js';

export
class CellModel {
    constructor(row, board, index, color) {
        this.board = board;
        this.row = row;
        this.index = index;
        this.color = color;

        this.point = new Point(index, this.row.index);
    }
}