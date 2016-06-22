import {BoardController} from './controller/board.js';
import {CheckerModel} from './model/checker.js';
import {Point} from './helper/point.js';

let checkers = [
    new CheckerModel(new Point(1, 0), 1),
    new CheckerModel(new Point(0, 5), 1)
];

let boardController = new BoardController(document.body, 8, 8, checkers);

boardController.view.draw();