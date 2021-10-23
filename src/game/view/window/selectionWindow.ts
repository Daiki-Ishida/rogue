import p5 from 'p5';
import { Window } from './window';
import { Option } from './option';
import { soundManager, soundStore } from 'game';
import { WindowBase } from '.';

export interface SelectionWindow extends Window {
  readonly options: Option[];
  idx: number;
  selected: Option;
  next(): void;
  prev(): void;
  select(): void;
}

export abstract class SelectionWindowBase
  extends WindowBase
  implements SelectionWindow
{
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean,
    readonly options: Option[],
    public idx: number
  ) {
    super(x, y, w, h, display);
  }

  get selected(): Option {
    return this.options[this.idx];
  }

  next(): void {
    if (this.options.length === 0) return;

    this.idx >= this.options.length - 1 ? (this.idx = 0) : this.idx++;

    this.setSound();
  }

  prev(): void {
    if (this.options.length === 0) return;

    this.idx <= 0 ? (this.idx = this.options.length - 1) : this.idx--;

    this.setSound();
  }

  select(): void {
    this.selected.onSelection();
    this.close();

    this.setSound();
  }

  private setSound(): void {
    const sound = soundStore.select;
    soundManager.register(sound);
  }

  drawContent(p: p5): void {
    p.push();

    p.fill('white');
    p.noStroke();
    p.textSize(24);

    this.options.forEach((op, idx) => {
      // 選択マーカー描画
      if (idx === this.idx) {
        this.drawMarker(idx, p);
      }

      p.text(`${op.value}`, this.x + 50, this.y + 40 + idx * 40);
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
