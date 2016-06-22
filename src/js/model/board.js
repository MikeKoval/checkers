import {CellModel} from './cell.js';
import {Point} from '../helper/point.js';

export
class BoardModel {
    get checkers() {
        return this._checkers;
    }

    set checkers(checkers) {
        this._checkers = [];

        for(let i = 0; i < this.height; i += 1) {
            this._checkers[i] = [];

            for(let j = 0; j < this.width; j += 1) {
                this._checkers[i][j] = null;
            }
        }

        _.each(checkers, (checker) => {
            this._checkers[checker.point.y][checker.point.x] = checker;
        });
    }

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCells();
    }

    createCells() {
        this.cells = [];

        for(let i = 0; i < this.height; i += 1) {
            this.cells[i] = [];

            for(let j = 0; j < this.width; j += 1) {
                this.cells[i][j] = new CellModel(
                    this,
                    new Point(i, j),
                    ((i + j) % 2 == 0)
                );
            }
        }
    }
}