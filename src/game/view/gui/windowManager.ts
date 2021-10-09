import p5 from 'p5';
import { Game } from 'game/game';
import { Controller } from 'game/controller';
import { HelpWindow } from './helpWindow';
import { InventoryWindow } from './inventoryWindow';
import { SelectionWindow } from './selectionWindow';
import { StatusWindow } from './statusWindow';
import { soundManager, soundStore } from 'game';
import { DescriptionWindow } from './descriptionWindow';

export class WindowManager {
  constructor(
    readonly inventoryWindow: InventoryWindow,
    readonly statusWindow: StatusWindow,
    readonly descriptionWindow: DescriptionWindow,
    readonly helpWindow: HelpWindow,
    public selectWindow?: SelectionWindow
  ) {}

  static init(game: Game): WindowManager {
    const inventoryWindow = InventoryWindow.init(game.inventory);
    const statusWindow = StatusWindow.init();
    const descriptionWindow = DescriptionWindow.init();
    const helpWindow = new HelpWindow();
    return new WindowManager(
      inventoryWindow,
      statusWindow,
      descriptionWindow,
      helpWindow
    );
  }

  open(): void {
    this.inventoryWindow.open();
    this.statusWindow.open();
    this.descriptionWindow.open();

    const sound = soundStore.select;
    soundManager.register(sound);
  }

  close(): void {
    this.inventoryWindow.close();
    this.statusWindow.close();
    this.descriptionWindow.close();

    this.selectWindow = undefined;

    const sound = soundStore.select;
    soundManager.register(sound);
  }

  draw(p: p5, controller: Controller): void {
    this.inventoryWindow.draw(p);
    this.statusWindow.draw(p);

    const item = this.inventoryWindow.selected;
    if (item) {
      this.descriptionWindow.draw(p, item.status.description);
    }
    this.helpWindow.draw(controller, p);
    this.selectWindow?.draw(p);
  }
}
