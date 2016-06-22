import {CellView} from '../view/cell.js';
import {CellController} from '../controller/cell.js';
import {Helper} from '../helper/helper.js';

export
class BoardView {
    constructor(model, controller, rootElem) {
        this.rootElem = rootElem;

        this.model = model;
        this.controller = controller;

        this.padding = 10;
        this.borderWidth = 2;
        this.size = 64 * this.model.width; //todo 64

        console.info(this.size, 'size');

        this.init();
    }

    init() {
        this.canvas = Helper.elt('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = this.size + this.padding * 2 + this.borderWidth * 2;
        this.canvas.height = this.size + this.padding * 2 + this.borderWidth * 2;
    }

    draw() {
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.strokeRect(
            this.padding,
            this.padding,
            this.size + this.borderWidth,
            this.size + this.borderWidth
        );

        this.drawCells();

        this.rootElem.appendChild(this.canvas);
    }

    drawCells() {
        for(let i = 0; i < this.model.height; i += 1) {
            for(let j = 0; j < this.model.width; j += 1) {
                let cellController = new CellController(this.controller);
                let cellView = new CellView(this.model.rows[i].cells[j], cellController);

                cellView.draw();
            }
        }
    }

    //drawCheckers() {
        
    //}
}
