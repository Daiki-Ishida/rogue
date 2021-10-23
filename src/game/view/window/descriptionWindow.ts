import p5 from 'p5';
import { WindowBase } from './window';

export class DescriptionWindow extends WindowBase {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean,
    private description: string
  ) {
    super(x, y, w, h, display);
  }

  static init(): DescriptionWindow {
    const x = 100;
    const y = 100;
    const w = 700;
    const h = 420;

    return new DescriptionWindow(x, y, w, h, false, '');
  }

  setDescription(description: string): void {
    this.description = description;
  }

  drawContent(p: p5): void {
    p.push();

    p.textSize(24);
    p.fill('white');

    const x = this.x + 30;
    const y = this.y + 30;

    p.text(this.description, x, y);

    p.pop();
  }
}
