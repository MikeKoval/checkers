import {Point} from './../helper/point.js';

export
class CheckerModel {
    constructor(x, y, color) {
        this.coords = new Point(x, y); //todo add checking on isPointBlack
        this.color = color;
    }
}