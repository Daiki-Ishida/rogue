import p5 from 'p5';
import {
  Controller,
  ActionController,
  InventoryController,
  SelectWindowController,
} from 'game/controller';

const ACTION_HELP =
  'a,w,s,d:移動 / u:ダッシュ / o:足踏み / i:インベントリ / k:攻撃';
const INVENTORY_HELP = 'w, s:△ ▽ / a,s:◁ ▷ / i:閉じる / u:選ぶ';
const SELECT_HELP = 'w, s:△ ▽ / u:決定';

export class HelpWindow {
  constructor(
    readonly x = 0,
    readonly y = 690,
    readonly w = 1280,
    readonly h = 30
  ) {}

  draw(controller: Controller, p: p5): void {
    p.push();
    p.fill(0, 0, 0, 200);
    p.rect(this.x, this.y, this.w, this.h);

    let text = '';
    if (controller.state instanceof ActionController) {
      text = ACTION_HELP;
    } else if (controller.state instanceof InventoryController) {
      text = INVENTORY_HELP;
    } else if (controller.state instanceof SelectWindowController) {
      text = SELECT_HELP;
    }

    p.fill('white');
    p.textSize(24);
    p.text(text, this.x + 30, this.y + 20);

    p.pop();
  }
}
