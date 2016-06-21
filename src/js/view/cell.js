export
class Cell {
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;
		//this.board = this.model.;
	}

	draw() {
		this.ctx.fillStyle = cell.color ? 'white' : 'black';
		this.ctx.fillRect(
			this.model.index
		);
	}
}