import p5 from 'p5';
import { Window } from './window';

const EXPIRED = 180;
const LINE_HIGHET = 40;
const MARGIN_LEFT = 50;
const MARGIN_TOP = 40;

export class MessageWindow implements Window {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public messages: string[],
    public display: boolean,
    public timer: number
  ) {}

  static init(): MessageWindow {
    const x = 100;
    const y = 520;
    const w = 700;
    const h = 150;

    return new MessageWindow(x, y, w, h, [], false, 0);
  }

  get isExpired(): boolean {
    return this.timer > EXPIRED;
  }

  open(): void {
    this.display = true;
    this.timer = 0;
  }

  close(): void {
    this.messages = [];
    this.display = false;
    this.timer = 0;
  }

  draw(p: p5): void {
    if (this.isExpired) this.close();
    if (!this.display) return;

    this.timer++;

    p.push();

    // 枠
    p.rectMode('corner');
    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    // コンテンツ
    p.fill('white');
    p.textSize(25);

    for (let i = 0; i < this.messages.length; i++) {
      const message = this.messages[i];
      p.text(
        message,
        this.x + MARGIN_LEFT,
        this.y + MARGIN_TOP + LINE_HIGHET * i
      );
    }

    p.pop();
  }
}
