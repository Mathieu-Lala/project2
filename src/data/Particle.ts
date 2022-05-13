import * as PIXI from 'pixi.js'
import { perlin } from '@trinkets/noise'

interface Context {
    app: PIXI.Application;
}

export default class Particle {
    ctx: Context;

    position: PIXI.Point;
    velocity: PIXI.Point;
    noiseValue: number;
    graphics: PIXI.Graphics;

    constant: number;
    angle: number;
    speed: number;

    constructor(ctx: Context, position: PIXI.Point,
        constant: number,
        angle: number,
        speed: number,
    ) {
        this.ctx = ctx;

        this.position = position;
        this.velocity = new PIXI.Point(0, 0)
        this.noiseValue = 0;
        this.graphics = new PIXI.Graphics();

        this.constant = constant;
        this.angle = angle;
        this.speed = speed;

        this.ctx.app.stage.addChild(this.graphics);
    }

    update(): void {
        function vector_with_magnitude(point: PIXI.Point, mag: number): PIXI.Point {
            const new_mag = Math.sqrt(point.x * point.x + point.y * point.y);
            return new PIXI.Point(
                point.x * new_mag / mag,
                point.y * new_mag / mag
            );
        }

        function vector_from_angle(angle: number) {
            return new PIXI.Point(Math.cos(angle), Math.sin(angle));
        }

        if (this.position.x > 0 && this.position.x < this.ctx.app.view.width
            && this.position.y > 0 && this.position.y < this.ctx.app.view.height) {
            this.noiseValue = perlin(this.position.x * this.constant, this.position.y * this.constant);
            this.velocity = vector_with_magnitude(vector_from_angle(this.noiseValue * this.angle), this.speed);
            this.position.x += this.velocity.x / this.ctx.app.ticker.FPS * 1000;
            this.position.y += this.velocity.y / this.ctx.app.ticker.FPS * 1000;
            this.display();
        }
    }

    display(): void {
        function to_hexa(r: number, g: number, b: number) {
            return (1 << 24) + (r << 16) + (g << 8) + b;
        }

        type HslType = { h: number; s: number; l: number }
        type RgbType = { r: number, g: number, b: number }

        const hslToRgb = (hsl: HslType): RgbType => {
            let { h, s, l } = hsl

            const k = (n: number) => (n + h / 30) % 12
            const a = s * Math.min(l, 1 - l)
            const f = (n: number) =>
                l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
            return {
                r: Math.round(255 * f(0)),
                g: Math.round(255 * f(8)),
                b: Math.round(255 * f(4)),
            }
        }

        let { r, g, b } = hslToRgb({
            h: (1.5 * this.noiseValue * 82.6 - 51) % 131.3, s: 1, l: 0.5
        });
        this.graphics.beginFill(to_hexa(r, g, b));
        this.graphics.drawCircle(this.position.x, this.position.y, 0.5);
        this.graphics.endFill();
    }

}
