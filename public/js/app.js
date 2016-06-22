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

class CellView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;

        this.size = 64;

        this.boardView = this.controller.boardController.view;
    }

    draw() {
        this.controller.boardController.view.ctx.fillStyle = this.model.color ? 'white' : 'black';
        this.controller.boardController.view.ctx.fillRect(
            this.boardView.borderWidth / 2 + this.boardView.padding + this.model.index * this.size,
            this.boardView.borderWidth / 2 + this.boardView.padding + this.model.row.index * this.size,
            this.size,
            this.size
        );
    }
}

class CellController {
    constructor(boardController) {
        this.boardController = boardController;
    }
}

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

    drawCheckers() {
        
    }
}

class BoardController {
    constructor(rootElem, width, height, checkers) {
        this.width = width;
        this.height = height;

        this.model = new BoardModel(width, height);
        this.model.checkers = checkers;
        this.view = new BoardView(this.model, this, rootElem, width, height);
        
        this.init();
        //this.initEvents();
    }
    
    init() {
        //this.view.draw();
        //this.view.drawCheckers();
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

boardController.view.draw();
//# sourceMappingURL=app.js.map
