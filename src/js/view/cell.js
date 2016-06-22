export
class Cell {
	constructor(model, controller) {
		this.model = model;
		this.controller = controller;
		
		this.size = 64;
	}

	draw() {
		this.ctx.fillStyle = cell.color ? 'white' : 'black';
		this.ctx.fillRect(
			this.model.index * this.size,
			this.model.row.index * this.size,
			this.size,
			this.size
		);
	}
}
