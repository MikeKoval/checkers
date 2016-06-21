import {Helper} from '../helper/helper.js';

export
class CheckerView {
    constructor(model) {
        this.model = model;
    }

    build() {
        let color = this.model.color ? 'white' : 'black'; //TODO bad practice

        return Helper.elt('div', {'class': 'checker ' + color});
    }
}