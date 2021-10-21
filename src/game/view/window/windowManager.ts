import p5 from 'p5';
import { Game } from 'game/game';
import { Controller } from 'game/controller';
import { HelpWindow } from './helpWindow';
import { InventoryWindow } from './inventoryWindow';
import { SelectionWindow } from './selectionWindow';
import { StatusWindow } from './statusWindow';
import { soundManager, soundStore } from 'game';
import { DescriptionWindow } from './descriptionWindow';
import { PotContentsWindow } from '.';

export class WindowManager {
  constructor(
    readonly inventoryWindow: InventoryWindow,
    readonly statusWindow: StatusWindow,
    readonly descriptionWindow: DescriptionWindow,
    readonly helpWindow: HelpWindow,
    public selectWindow?: SelectionWindow,
    public potContentWindow?: PotContentsWindow
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
    this.potContentWindow = undefined;

    const sound = soundStore.select;
    soundManager.register(sound);
  }

  displayPotContent(window: PotContentsWindow): void {
    this.potContentWindow = window;
    this.inventoryWindow.close();
  }

  draw(p: p5, controller: Controller): void {
    this.inventoryWindow.draw(p);
    this.statusWindow.draw(p);

    if (this.descriptionWindow.display) {
      const item = this.inventoryWindow.selected;
      let description = item?.status.description + '\n';
      if (item?.isStorable()) {
        description += '\n[なかみ]';
        for (const content of item.contents) {
          description += `\n${content.status.displayName}`;
        }
      }

      this.descriptionWindow.draw(p, description);
    }

    this.helpWindow.draw(controller, p);
    this.selectWindow?.draw(p);
    this.potContentWindow?.draw(p);
  }
}
