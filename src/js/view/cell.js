export
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
