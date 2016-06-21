import {RowModel} from './row.js';

export
class BoardModel {
    constructor(width, height, checkers) {
        this.width = width;
        this.height = height;
        this.checkers = checkers;

        this.createRows();
    }

    createRows() {
        this.rows = [];

        for(let i = 0; i < this.height; i += 1) {
            this.rows[i] = new RowModel(this, i, this.width);
        }
    }
}