var MAX_JUMP_FRAMES = 6;
var DEFAULT_MAX_FRAMES = 10;

function Ken(ctx) {
    Drawable.call(this, ctx, './img/ken.sprite.png', 7, 10);
    
    this.x = 500;
    this.x0 = 500;

    this.y0 = 200;
    this.y = this.y0;

    this.movements = {
        up: false,
        down: false,
        right: false,
        left: false,
        punch: false,
        kick: false,
        superKick: false,
        hadouken: false
    }
    this.isJumping = false;

    this.sprite.verticalFrameIndex = 8;
    this.sprite.horizontalFrameIndex = 0;
    this.isKeyDown = false;
}

Ken.prototype = Object.create(Drawable.prototype);
Ken.prototype.constructor = Ken;

Ken.prototype.onKeyEvent = function(event) {
    var state = event.type === 'keydown' ? true : false;
    switch (event.keyCode) {
        case KEY_UP:
            this.movements.up = state;
            break;
        case KEY_RIGHT:
            this.movements.right = state;
            break;
        case KEY_DOWN:
            this.movements.down = state;
            break;
        case KEY_LEFT:
            this.movements.left = state;
            break;
        case KEY_PUNCH:
            this.movements.punch = state;
            break;
        case KEY_KICK:
            this.movements.kick = state;
            break;
        case KEY_SUPER_KICK:
            if (!this.isKeyDown) {
                this.movements.superKick = state;
            }
            break;
        case KEY_HADUCKEN:
            if (!this.isKeyDown) {
                this.movements.hadouken = state;
            }
            break;
    }

    this.isKeyDown = state;
}

Ken.prototype.animate = function() {
    this.move();

    this.vy += GRAVITY;
    this.y += this.vy;
    this.x += this.vx;
    this.vx *= FRICTION;
    this.vy *= FRICTION;

    if (this.isDownsideY()) {
        this.y = this.y0;
        this.vy = 0;
        this.isJumping = false;
    }
}

Ken.prototype.isDownsideY = function() {
    return this.y >= this.y0;
}

Ken.prototype.move = function() {
    if (this.movements.up === true && !this.isJumping) {
        this.isJumping = true;
        this.vy -= SPEED_JUMP;
    }

    if (this.canMove()) {
        if (this.movements.right) {
            this.vx += SPEED_MOVE;
        }
        if (this.movements.left) {
            this.vx -= SPEED_MOVE;
        }
    }

    if (this.isJumping) {
        this.animateJump();
    } else if (this.movements.superKick) {
        this.animateSuperKick();
    } else if (this.movements.kick) {
        this.animateKick();
    } else if (this.movements.hadouken) {
        this.animateHadouken();
    } else if (this.movements.punch) {
        this.animatePunch();
    } else if (this.movements.right || this.movements.left ) {
        this.animateWalk();
    } else if (this.movements.down) {
        this.animateDown();
    } else {
        this.animateStand();
    }    
}

Ken.prototype.animateStand = function () {
    this.animateSprite(1, 0, 3, MAX_JUMP_FRAMES);
}

Ken.prototype.animateWalk = function () {
    this.animateSprite(3, 0, 4, MAX_JUMP_FRAMES);
}

Ken.prototype.animateDown = function () {
    this.animateSprite(9, 0, 0, MAX_JUMP_FRAMES);
}

Ken.prototype.animateJump = function() {
    this.animateSprite(8, 0, 4, MAX_JUMP_FRAMES);
}

Ken.prototype.animatePunch = function () {
    this.animateSprite(2, 0, 2, DEFAULT_MAX_FRAMES);
}

Ken.prototype.animateKick = function () {
    this.animateSprite(6, 0, 3, DEFAULT_MAX_FRAMES);
}

Ken.prototype.animateSuperKick = function () {
    this.animateSprite(7, 0, 5, DEFAULT_MAX_FRAMES);
    if (this.sprite.horizontalFrameIndex === 5) {
        this.movements.superKick = false;
    }
}

Ken.prototype.animateHadouken = function () {
    this.animateSprite(0, 0, 3, DEFAULT_MAX_FRAMES);
    if (this.sprite.horizontalFrameIndex === 3) {
        this.movements.hadouken = false; 
    }
}

Ken.prototype.canMove = function() {
    return !this.movements.punch && 
        !this.movements.kick && 
        !this.movements.hadouken &&
        !this.movements.superKick;
}
