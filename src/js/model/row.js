import {CellModel} from './cell.js';

export
class RowModel {
    constructor(board, index, width) {
        this.board = board;
        this.index = index;
        this.width = width;

        this.createCells();
    }

    createCells() {
        this.cells = [];

        for(let i = 0; i < this.width; i += 1) {
            this.cells.push(new CellModel(
                this, 
                this.board, 
                i, 
                ((i + this.index) % 2 == 0)
            ));
        }
    }
}