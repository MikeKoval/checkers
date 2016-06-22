class CellModel {
    get checker() {
        return this._checker;
    }
    set checker(value) {
        this._checker = value;
    }

    constructor(board, point, color) {
        this.board = board;
        this.color = color;

        this.point = point;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

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

class CellView {
    constructor(controller) {
        this.controller = controller;

        this.size = 64;

        console.info(this.controller.model.point);

        this.boardView = this.controller.boardController.view;
    }

    draw() {
        this.controller.boardController.view.ctx.fillStyle = this.controller.model.color ? 'white' : 'black';
        this.controller.boardController.view.ctx.fillRect(
            this.boardView.borderWidth / 2 + this.boardView.padding + this.controller.model.point.x * this.size,
            this.boardView.borderWidth / 2 + this.boardView.padding + this.controller.model.point.y * this.size,
            this.size,
            this.size
        );
    }
}

class CellController {
    constructor(model, boardController) {
        this.model = model;
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
    constructor(controller, rootElem) {
        this.rootElem = rootElem;
        
        this.controller = controller;

        this.padding = 10;
        this.borderWidth = 2;
        this.size = 64 * this.controller.model.width; //todo 64

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
        for(let i = 0; i < this.controller.model.height; i += 1) {
            for(let j = 0; j < this.controller.model.width; j += 1) {
                let cellController = new CellController(
                    this.controller.model.cells[i, j],
                    this.controller
                );
                let cellView = new CellView(cellController);

                cellView.draw();
            }
        }
    }

    //drawCheckers() {
        
    //}
}

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

class CheckerModel {
    constructor(point, color) {
        this.point = point; //todo add checking on isPointBlack
        this.color = color;
    }
}

let checkers = [
    new CheckerModel(new Point(1, 0), 1),
    new CheckerModel(new Point(0, 5), 1)
];

let boardController = new BoardController(document.body, 8, 8, checkers);

boardController.view.draw();
//# sourceMappingURL=app.js.map
