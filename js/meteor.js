class Meteor {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.meteors = [];
        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.createMeteors();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createMeteors() {
        const count = 40;
        for (let i = 0; i < count; i++) {
            this.meteors.push({
                x: Math.random() * this.canvas.width,
                y: 0,
                length: Math.random() * 80 + 100,
                speed: Math.random() * 15 + 8,
                size: Math.random() * 2 + 1,
                delay: Math.random() * 3000
            });
        }
    }

    drawMeteor(meteor) {
        if (meteor.delay > 0) {
            meteor.delay--;
            return;
        }

        this.ctx.beginPath();
        const angle = Math.PI / 4;
        const tailX = meteor.x - Math.cos(angle) * meteor.length;
        const tailY = meteor.y - Math.sin(angle) * meteor.length;

        const gradient = this.ctx.createLinearGradient(
            meteor.x, meteor.y,
            tailX, tailY
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = meteor.size;
        this.ctx.moveTo(meteor.x, meteor.y);
        this.ctx.lineTo(tailX, tailY);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    moveMeteor(meteor) {
        if (meteor.delay > 0) return;

        const angle = Math.PI / 4;
        meteor.x += Math.cos(angle) * meteor.speed;
        meteor.y += Math.sin(angle) * meteor.speed;

        if (meteor.x > this.canvas.width || meteor.y > this.canvas.height) {
            meteor.x = Math.random() * this.canvas.width;
            meteor.y = -meteor.length;
            meteor.delay = Math.random() * 3000;
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.meteors.forEach(meteor => {
            this.moveMeteor(meteor);
            this.drawMeteor(meteor);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 当页面加载完成后初始化流星雨效果
window.addEventListener('load', () => {
    const canvas = document.getElementById('meteorCanvas');
    new Meteor(canvas);
});