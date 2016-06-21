import {CheckerView} from '../view/checker.js';
import {Helper} from '../helper/helper.js';

export
class BoardView {
    constructor(model, controller, rootElem, width, height) {
        this.rootElem = rootElem;

        this.model = model;
        this.controller = controller;

        this.canvas = Helper.elt('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.build();
        this.buildCheckers();
    }

    build() {
        for(let i = 0; i < this.model.height; i += 1) {
            for(let j = 0; j < this.model.width; j += 1) {
                let cell = this.model.rows[i].cells[j];
                //cells.push(
                //    Helper.elt('td', {'class': cell.color ? 'white' : 'black'})
                //);
                //

            }

            rows.push(Helper.elt('tr', {}, cells));
        }
        
    }

    buildCheckers() {
        this.checkers = [];

        for(let i = 0; i < this.model.checkers.length; i += 1) {
            let checkerModel = this.model.checkers[i];

            let checkerView = new CheckerView(checkerModel);

            let checkerElement = checkerView.build();

            this.checkers.push(checkerElement);
        }
    }
    
    draw() {
        this.rootElem.appendChild(this.boardWrapper);
    }
    
    drawCheckers() {
        for(let i = 0; i < this.checkers.length; i += 1) {
            this.boardWrapper
                .children[this.model.checkers[i].coords.y]
                .children[this.model.checkers[i].coords.x]
                .appendChild(this.checkers[i])
        }
    }
}