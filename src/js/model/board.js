import {RowModel} from './row.js';

export
class BoardModel {
    get checkers(){
        return this._checkers;
    }

    set checkers(value){
        this._checkers = value;
    }

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createRows();
    }

    createRows() {
        this.rows = [];

        for(let i = 0; i < this.height; i += 1) {
            this.rows.push(new RowModel(this, i, this.width));
        }
    }
}