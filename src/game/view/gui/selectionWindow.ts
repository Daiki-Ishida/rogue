import p5 from 'p5';
import { Window } from './window';
import { Option } from './option';

export interface SelectionWindow extends Window {
  readonly options: Option[];
  idx: number;
  selected: Option;
  next(): void;
  prev(): void;
  select(): void;
}

export abstract class SelectionWindowBase implements SelectionWindow {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean,
    readonly options: Option[],
    public idx: number
  ) {}

  open(): void {
    this.display = true;
  }

  close(): void {
    this.display = false;
  }

  get selected(): Option {
    return this.options[this.idx];
  }

  next(): void {
    if (this.options.length === 0) return;

    this.idx >= this.options.length - 1 ? (this.idx = 0) : this.idx++;
  }

  prev(): void {
    if (this.options.length === 0) return;

    this.idx <= 0 ? (this.idx = this.options.length - 1) : this.idx--;
  }

  select(): void {
    this.selected.onSelection();
    this.display = false;
  }

  draw(p: p5): void {
    this.drawFrame(p);
    this.drawOptions(p);
  }

  private drawFrame(p: p5): void {
    p.push();

    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    p.pop();
  }

  private drawOptions(p: p5): void {
    p.push();

    p.fill('white');
    p.noStroke();
    p.textSize(25);

    this.options.forEach((op, idx) => {
      // 選択マーカー描画
      if (idx === this.idx) {
        this.drawMarker(idx, p);
      }

      p.text(`${op}`, this.x + 50, this.y + idx * 40);
    });

    p.pop();
  }

  private drawMarker(idx: number, p: p5): void {
    p.triangle(
      this.x + 10,
      this.y + 20 + idx * 40,
      this.x + 10,
      this.y + 40 + idx * 40,
      this.x + 30,
      this.y + 30 + idx * 40
    );
  }
}
