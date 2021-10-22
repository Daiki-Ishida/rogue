import p5 from 'p5';
import { Drawer } from '.';

const TITLE = 'GAME START';
const MESSAGE = 'Press Enter To Play';

/**
 * 初期表示画面
 */
class StartScreenDrawer implements Drawer {
  draw(p: p5): void {
    p.push();
    p.background('#082032');

    p.textSize(144);
    p.fill('#FEF1E6');
    p.text(TITLE, 280, 380);

    const r = p.frameCount % 45;
    const on = r > 20 ? true : false;

    if (on) {
      p.textSize(48);
      p.fill('#FEF1E6');
      p.text(MESSAGE, 400, 540);
    }

    p.pop();
  }
}

export const startScreenDrawer = new StartScreenDrawer();
