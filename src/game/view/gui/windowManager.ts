import p5 from 'p5';
import { Game } from 'game/game';
import { Controller } from 'game/controller';
import { HelpWindow } from './helpWindow';
import { InventoryWindow } from './inventoryWindow';
import { SelectionWindow } from './selectionWindow';
import { StatusWindow } from './statusWindow';
import { soundManager, soundStore } from 'game';

export class WindowManager {
  constructor(
    readonly inventoryWindow: InventoryWindow,
    readonly statusWindow: StatusWindow,
    readonly helpWindow: HelpWindow,
    public selectWindow?: SelectionWindow
  ) {}

  static init(game: Game): WindowManager {
    const inventoryWindow = InventoryWindow.init(game.inventory);
    const statusWindow = StatusWindow.init();
    const helpWindow = new HelpWindow();
    return new WindowManager(inventoryWindow, statusWindow, helpWindow);
  }

  open(): void {
    this.inventoryWindow.open();
    this.statusWindow.open();

    const sound = soundStore.select;
    soundManager.register(sound);
  }

  close(): void {
    this.inventoryWindow.close();
    this.statusWindow.close();

    this.selectWindow = undefined;

    const sound = soundStore.select;
    soundManager.register(sound);
  }

  draw(p: p5, controller: Controller): void {
    this.inventoryWindow.draw(p);
    this.statusWindow.draw(p);
    this.helpWindow.draw(controller, p);
    this.selectWindow?.draw(p);
  }
}
