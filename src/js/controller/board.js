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
        this.initEvents();
    }
    
    init() {
        this.view.draw();
        this.view.drawCheckers();
    }

    initEvents() {
        for(let i = 0; i < this.view.checkers.length; i += 1) {
            let checkerEl = this.view.checkers[i];

            checkerEl.addEventListener('mousedown', function(e) {
                var coords = Helper.getCoords(checkerEl);

                var shiftX = e.pageX - coords.left;
                var shiftY = e.pageY - coords.top;

                let moveAt = function(e) {
                    checkerEl.style.left = e.pageX - shiftX + 'px';
                    checkerEl.style.top = e.pageY - shiftY + 'px';
                };

                let mouseMoveEventListener = function(e) {
                    moveAt(e);
                };

                let mouseUpEventListener = function (e) {
                    document.removeEventListener('mousemove', mouseMoveEventListener);
                    checkerEl.removeEventListener('mouseup', mouseUpEventListener);
                };

                checkerEl.style.position = 'absolute';
                moveAt(e);

                document.body.appendChild(checkerEl);

                checkerEl.style.zIndex = 1000;


                document.addEventListener('mousemove', mouseMoveEventListener);

                checkerEl.addEventListener('mouseup', mouseUpEventListener);

                checkerEl.ondragstart = function() {
                    return false;
                };
            });


        }
    }
}