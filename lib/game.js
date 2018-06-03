function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = window.innerWidth;
    this.canvas.height = Math.floor(window.innerHeight / 2);
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = FPS;

    this.ken = new Ken(this.ctx);
    this.framesCount = 0;
}

Game.prototype.start = function() {
    if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(function() {
            this.draw();
        }.bind(this), 1000 / this.fps);
    }
}

Game.prototype.stop = function() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
}

Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.onKeyDown = function (event) {
    this.ken.onKeyEvent(event);
}

Game.prototype.onKeyUp = function (event) {
    this.ken.onKeyEvent(event);
}

Game.prototype.isRunning = function () {
    return this.drawIntervalId !== undefined;
}

Game.prototype.draw = function () {
    this.clear();
    this.ken.draw();
}

