export
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

        // this.controller.
    }
}
