import { Board } from 'game/board';
import { Player } from 'game/models/actor';
import { Item } from '..';

export abstract class Usable extends Item {
  abstract use(user: Player, board: Board): void;

  identify(): void {
    this.status.identify();
  }

  isUsable(): this is Usable {
    return true;
  }
}
