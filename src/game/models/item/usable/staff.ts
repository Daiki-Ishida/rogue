import { animationManager, imageStore } from 'game';
import { Board } from 'game/board';
import { Player, Actor } from 'game/models/actor';
import { GridUtil } from 'game/util';
import { StaffStatus } from '../status';
import { ItemSymbol } from '../symbol';
import { staffEffects } from '../effects';
import { Usable } from './usable';
import { MagicBulletAnimation } from 'game/animation';

export class Staff extends Usable {
  private constructor(
    public x: number,
    public y: number,
    readonly symbol: ItemSymbol,
    readonly status: StaffStatus,
    readonly effect: (user: Player, target: Actor, board: Board) => void
  ) {
    super(x, y, symbol, status);
  }

  static generate(id: string, board: Board): Staff {
    const symbol = new ItemSymbol(imageStore.items.staff);
    const status = StaffStatus.init(id);
    const effect = staffEffects[id];

    if (effect === undefined) throw new Error(`Invalid Id: ${id}`);

    const staff = new Staff(0, 0, symbol, status, effect);
    staff.spawn(board);
    return staff;
  }

  use(user: Player, board: Board): void {
    this.status.durability--;
    if (this.status.durability < 0) {
      this.status.used = true;
    }

    // Pinning Staffだけは特別扱い
    if (this.status.id === 'PINNING_STAFF') {
      this.pinning(user, board);
      return;
    }

    const d = user.d.next;
    const grids = GridUtil.rayToGrids(user.x, user.y, d.x, d.y);
    let current: { x: number; y: number } = { x: user.x, y: user.y };

    let target: Actor | undefined = undefined;
    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      target = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);

      if (target || blocked) break;
    }
    const animation = MagicBulletAnimation.generate(user, current);
    animationManager.push(animation);

    if (target) {
      this.effect(user, target, board);
    }
  }

  private pinning(user: Player, board: Board): void {
    const d = user.d.next;
    const grids = GridUtil.rayToGrids(user.x, user.y, d.x, d.y);
    let current: { x: number; y: number } = { x: user.x, y: user.y };
    let target: Actor | undefined = undefined;
    for (const grid of grids) {
      current = { x: grid[0], y: grid[1] };
      target = board.findActor(current.x, current.y);
      const blocked = board.isBlock(current.x, current.y);

      if (target || blocked) break;
    }

    const animation = MagicBulletAnimation.generate(user, current);
    animationManager.push(animation);

    const x = current.x - d.x;
    const y = current.y - d.y;
    user.setAt(x, y);
  }

  onHit(user: Player, target: Actor, board: Board): void {
    this.effect(user, target, board);
  }
}
