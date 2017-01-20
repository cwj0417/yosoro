export class snowFall {
    constructor({Snow3num = 80, Snow3Size = 10, Snow3Speed = 1} = {}) {
        this.Snow3num = Snow3num;
        this.Snow3Size = Snow3Size;
        this.Snow3Speed = Snow3Speed;
        this.flakes = [];
    }

    start() {
        this.snowCanvas();
        this.drawSnow();
    }

    snowCanvas() {
        let snowcanvas = document.createElement("canvas");
        snowcanvas.id = "snowfall";
        snowcanvas.width = window.innerWidth;
        snowcanvas.height = window.innerHeight;
        snowcanvas.setAttribute("style", "position: fixed; top: 0; left: 0; z-index: 2999; pointer-events: none;");
        document.getElementsByTagName("body")[0].appendChild(snowcanvas);
        this.canvas = snowcanvas;
        this.ctx = snowcanvas.getContext("2d");
        window.onresize = function () {
            snowcanvas.width = window.innerWidth;
            snowcanvas.height = window.innerHeight;
        }
    }

    createFlakes() {
        let Snow3num = this.Snow3num,
            flakes = this.flakes = [],
            canvas = this.canvas;
        for (let i = 0; i < Snow3num; i++) {
            flakes.push(new flakeMove(canvas.width, canvas.height, this.Snow3Size, this.Snow3Speed))
        }
    }

    drawSnow() {
        let Snow3num = this.Snow3num,
            flakes = this.flakes,
            ctx = this.ctx, canvas = this.canvas;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let flake of flakes) {
            flake.update();
            flake.render(ctx);
        }
        this.loop = requestAnimationFrame(() => {
            this.drawSnow();
        });
    }

    clearFlakes() {
        this.flakes = [];
    }

    resetFlakes() {
        if(this.flakes.length) {
            this.clearFlakes();
            this.createFlakes();
        }
    }
}

class flakeMove {
    constructor(canvasWidth, canvasHeight, Snow3Size, Snow3Speed) {
        Snow3Speed = Snow3Speed < 1 ? 1 : Snow3Speed;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.floor(Math.random() * canvasWidth);
        this.y = Math.floor(Math.random() * canvasHeight);
        this.size = Math.random() * Snow3Size + 2;
        this.maxSize = Snow3Size;
        this.speed = Math.random() * 1 + Snow3Speed;
        this.Snow3Speed = Snow3Speed;
        this.velY = this.speed;
        this.velX = 0;
        this.stepSize = Math.random() / 30;
        this.step = 0;
    }

    update() {
        let x = this.x,
            y = this.y;
        this.velX *= 0.98;
        if (this.velY <= this.speed) {
            this.velY = this.speed
        }
        this.velX += Math.cos(this.step += .05) * this.stepSize;
        this.y += this.velY;
        this.x += this.velX;
        if (this.x >= this.canvasWidth || this.x <= 0 || this.y >= this.canvasHeight || this.y <= 0) {
            this.reset(this.canvasWidth, this.canvasHeight)
        }
    }

    reset(width, height) {
        this.x = Math.floor(Math.random() * width);
        this.y = 0;
        this.size = Math.random() * this.maxSize + 2;
        this.speed = Math.random() * 1 + this.Snow3Speed;
        this.velY = this.speed;
        this.velX = 0;
    }

    render(ctx) {
        let snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)");
        snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.save();
        ctx.fillStyle = snowFlake;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}