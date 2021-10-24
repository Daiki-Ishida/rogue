import p5 from 'p5';
import { game } from 'game';
import { WindowBase } from './window';

const X = 100;
const Y = 550;
const W = 700;
const H = 120;

const MESSAGE = '1,000ゴールド必要です。';

type Mode = 'STATUS' | 'MESSAGE';

export class StatusWindow extends WindowBase {
  private constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public display: boolean,
    private mode: Mode
  ) {
    super(x, y, w, h, display);
  }

  static init(): StatusWindow {
    return new StatusWindow(X, Y, W, H, false, 'STATUS');
  }

  setMode(mode: Mode): void {
    this.mode = mode;
  }

  drawContent(p: p5): void {
    switch (this.mode) {
      case 'STATUS':
        this.drawStatus(p);
        break;
      case 'MESSAGE':
        this.drawMessage(p);
        break;
    }
  }

  private drawStatus(p: p5): void {
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

  private drawMessage(p: p5): void {
    p.push();

    p.textSize(24);
    p.fill('white');

    const x = this.x + 30;
    const y = this.y + 30;

    p.text(MESSAGE, x, y);

    p.pop();
  }
}
