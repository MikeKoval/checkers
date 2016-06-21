class Helper {
    static elt(name, attributes, children) {
        var node = document.createElement(name);

        if(attributes) {
            for(var attr in attributes)
                if(attributes.hasOwnProperty(attr))
                    node.setAttribute(attr, attributes[attr]);
        }

        if(children) {
           for(let i = 0; i < children.length; i += 1) {
              let child = children[i];

              node.appendChild(child);
           }
        }

        return node;
    }

    static getCoords(elem) {
        // (1)
        var box = elem.getBoundingClientRect();
    
        var body = document.body;
        var docEl = document.documentElement;
    
        // (2)
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
        // (3)
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    
        // (4)
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
    
        // (5)
        return { top: Math.round(top), left: Math.round(left) };
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class CellModel {
    constructor(row, board, index, color) {
        this.board = board;
        this.row = row;
        this.index = index;
        this.color = color;

        this.point = new Point(index, this.row.index);
    }
}

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

class CheckerView {
    constructor(model) {
        this.model = model;
    }

    build() {
        let color = this.model.color ? 'white' : 'black'; //TODO bad practice

        return Helper.elt('div', {'class': 'checker ' + color});
    }
}

class BoardView {
    constructor(model, controller, rootElem, width, height) {
        this.rootElem = rootElem;

        this.model = model;
        
        this.controller = controller;

        this.build();
        this.buildCheckers();
    }

    build() {
        let rows = [];

        for(let i = 0; i < this.model.height; i += 1) {
            let cells = [];

            for(let j = 0; j < this.model.width; j += 1) {
                let cell = this.model.rows[i].cells[j];
                cells.push(
                    Helper.elt('td', {'class': cell.color ? 'white' : 'black'})
                );
            }

            rows.push(Helper.elt('tr', {}, cells));
        }

        this.boardWrapper = Helper.elt('table', {'class': 'board'}, rows);
        
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

class CheckerModel {
    constructor(x, y, color) {
        this.coords = new Point(x, y); //todo add checking on isPointBlack
        this.color = color;
    }
}

let checkers = [
    new CheckerModel(1, 0, 1),
    new CheckerModel(0, 5, 1)
];

let boardController = new BoardController(document.body, 8, 8, checkers);
//# sourceMappingURL=app.js.map
