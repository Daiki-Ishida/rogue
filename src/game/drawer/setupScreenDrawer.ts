import p5 from 'p5';
import { Drawer } from '.';
import { imageStore, textBox } from 'game';

const LABEL = 'YOUR NAME';
const NOTICE = 'MAX 8 Letters';

/**
 * キャラ設定等の準備画面
 */
class SetupScreenDrawer implements Drawer {
  draw(p: p5): void {
    p.push();
    p.imageMode('corner');
    p.image(imageStore.bg, 0, 0, 1280, 720);

    p.textSize(72);
    p.fill('#FEF1E6');
    p.text(LABEL, 200, 240);

    p.textSize(48);
    p.text(NOTICE, 560, 240);

    textBox.center();
    textBox.size(820);
    textBox.style('height: 86px; font-size:72px;');

    p.pop();
  }
}

export const setupScreenDrawer = new SetupScreenDrawer();
