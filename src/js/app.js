import {BoardController} from './controller/board.js';
import {CheckerModel} from './model/checker.js';

let checkers = [
    new CheckerModel(1, 0, 1),
    new CheckerModel(0, 5, 1)
];

let boardController = new BoardController(document.body, 8, 8, checkers);