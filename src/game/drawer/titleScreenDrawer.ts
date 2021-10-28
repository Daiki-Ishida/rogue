import p5 from 'p5';
import { Drawer } from '.';
import { imageStore } from 'game';

const TITLE = 'GAME START';
const MESSAGE = 'Press Enter To Play';

/**
 * タイトル画面描画
 */
class TitleScreenDrawer implements Drawer {
  draw(p: p5): void {
    p.push();
    p.imageMode('corner');
    p.image(imageStore.bg, 0, 0, 1280, 720);

    const f = p.frameCount % 250;
    if (f >= 0 && f <= 19) {
      p.image(imageStore.shootingStar[f], 0, 0, 1280, 720);
    }

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

export const titleScreenDrawer = new TitleScreenDrawer();
