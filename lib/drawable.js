function Drawable(ctx, src, horizontalFrames, verticalFrames) {
    this.ctx = ctx;

    this.x = 0;
    this.x0 = 0;
    this.vx = 0;

    this.y = 0;
    this.y0 = 0;
    this.vy = 0;
    
    this.width = 0;
    this.height = 0;

    this.sprite = new Image();
    this.sprite.src = src;
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.onload = function () {
        this.sprite.isReady = true;
        this.sprite.horizontalFrames = horizontalFrames;
        this.sprite.verticalFrames = verticalFrames;
        this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
        this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        this.width = this.sprite.frameWith;
        this.height = this.sprite.frameHeight;
    }.bind(this);

    this.drawCount = 0;
}

Drawable.prototype.isReady = function () {
    return this.sprite.isReady;
}

Drawable.prototype.animate = function () {}

Drawable.prototype.animateSprite = function (initialVerticalIndex, initialHorizontalIndex, maxHorizontalSegments, frequency) {
    if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
        this.sprite.verticalFrameIndex = initialVerticalIndex;
        this.sprite.horizontalFrameIndex = initialHorizontalIndex;
    } else if (this.drawCount % frequency === 0) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex >= maxHorizontalSegments) ? 0 : this.sprite.horizontalFrameIndex + 1;
    }
}



Drawable.prototype.draw = function () {
    if (this.isReady()) {
        this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWith,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWith,
            this.sprite.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.animate();
        this.drawCount = (this.drawCount === Math.max()) ? 0 : this.drawCount + 1;
    }
}