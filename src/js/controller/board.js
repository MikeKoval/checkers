import {BoardModel} from '../model/board.js';
import {BoardView} from '../view/board.js';

export
class BoardController {
    constructor(rootElem, width, height, checkers) {
        this.width = width;
        this.height = height;

        this.model = new BoardModel(width, height);
        this.model.checkers = checkers;
        this.view = new BoardView(this, rootElem);
        
        this.init();
        //this.initEvents();
    }
    
    init() {
        //this.view.draw();
        //this.view.drawCheckers();
    }
}