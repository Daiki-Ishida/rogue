import p5 from 'p5';

export interface Window {
  x: number;
  y: number;
  w: number;
  h: number;
  display: boolean;
  open(): void;
  close(): void;
  draw(p: p5): void;
}

export abstract class WindowBase implements Window {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean
  ) {}

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  draw(p: p5): void {
    if (!this.display) return;

    this.drawFrame(p);
    this.drawContent(p);
  }

  drawFrame(p: p5): void {
    p.push();

    p.fill('rgba(8,15,90,0.8)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    p.pop();
  }

  abstract drawContent(p: p5): void;
}
