import p5 from 'p5';
import { game } from 'game';
import { Window } from './window';

const X = 100;
const Y = 550;
const W = 700;
const H = 130;

export class StatusWindow implements Window {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean
  ) {}

  static init(): StatusWindow {
    return new StatusWindow(X, Y, W, H, false);
  }

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

  private drawFrame(p: p5): void {
    p.push();

    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h, 10);

    p.pop();
  }

  private drawContent(p: p5): void {
    const player = game.player;

    const exp = player.status.exp;
    const str = player.status.str;
    const turn = game.turn.count;

    const sword = player.status.sword;
    const atk = sword === undefined ? 'なし' : sword.atk;
    const shield = player.status.shield;
    const def = shield === undefined ? 'なし' : shield.def;

    p.push();

    p.textSize(24);
    p.fill('white');

    const x = this.x + 30;
    const y = this.y + 30;

    p.text(`経験値: ${exp}`, x, y);
    p.text(`ちから: ${str}`, x + 320, y);
    p.text(`武器の強さ: ${atk}`, x, y + 40);
    p.text(`盾の強さ: ${def}`, x + 320, y + 40);
    p.text(`経過ターン: ${turn}`, x, y + 80);

    p.pop();
  }
}
