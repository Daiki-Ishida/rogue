import p5 from 'p5';
import {
  ControllerManager,
  ActionController,
  InventoryController,
  SelectWindowController,
} from 'game/controller';
import { InventoryPotController } from 'game/controller/inventoryPotController';
import { PotContentsController } from 'game/controller/potContentsController';

const ACTION_HELP =
  'a,w,s,d:移動 / u:ダッシュ / o:足踏み / i:インベントリ / k:攻撃 / j: 話しかける / p: 中断';
const INVENTORY_HELP = 'w, s:△ ▽ / a,s:◁ ▷ / i:閉じる / u:選ぶ / e: ソート';
const SELECT_HELP = 'w, s:△ ▽ / u:決定';
const PUT_ITEM_HELP = 'どれをいれる？  w, s:△ ▽ / u:決定 / i:やめる';
const WITHDRAW_ITEM_HELP = 'どれを取り出す？  w, s:△ ▽ / u:決定 / i:やめる';

export class HelpWindow {
  constructor(
    readonly x = 0,
    readonly y = 690,
    readonly w = 1280,
    readonly h = 30
  ) {}

  draw(controller: ControllerManager, p: p5): void {
    p.push();
    p.fill(0, 0, 0, 200);
    p.rect(this.x, this.y, this.w, this.h);

    let text = '';
    if (controller.controller instanceof ActionController) {
      text = ACTION_HELP;
    } else if (controller.controller instanceof InventoryController) {
      text = INVENTORY_HELP;
    } else if (controller.controller instanceof SelectWindowController) {
      text = SELECT_HELP;
    } else if (controller.controller instanceof InventoryPotController) {
      text = PUT_ITEM_HELP;
    } else if (controller.controller instanceof PotContentsController) {
      text = WITHDRAW_ITEM_HELP;
    }

    p.fill('white');
    p.textSize(24);
    p.text(text, this.x + 30, this.y + 20);

    p.pop();
  }
}
