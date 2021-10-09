import p5 from 'p5';

export class DescriptionWindow {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean
  ) {}

  static init(): DescriptionWindow {
    const x = 100;
    const y = 100;
    const w = 700;
    const h = 420;

    return new DescriptionWindow(x, y, w, h, false);
  }

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  draw(p: p5, description: string): void {
    if (!this.display) return;

    this.drawFrame(p);
    this.drawContent(p, description);
  }

  private drawFrame(p: p5): void {
    p.push();

    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    p.pop();
  }

  private drawContent(p: p5, description: string): void {
    p.push();

    p.textSize(24);
    p.fill('white');

    const x = this.x + 30;
    const y = this.y + 30;

    p.text(description, x, y);

    p.pop();
  }
}
