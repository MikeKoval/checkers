import {Helper} from '../helper/helper.js';
import {BoardModel} from '../model/board.js';
import {BoardView} from '../view/board.js';

export
class BoardController {
    constructor(rootElem, width, height, checkers) {
        this.width = width;
        this.height = height;

        this.model = new BoardModel(width, height, checkers);
        this.view = new BoardView(this.model, this, rootElem, width, height);

        this.init();
        //this.initEvents();
    }
    
    init() {
        this.view.draw();
        //this.view.drawCheckers();
    }
}