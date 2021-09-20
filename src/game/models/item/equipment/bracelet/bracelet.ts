import { BraceletSymbol } from './braceletSymbol';
import { EquipmentBase } from '..';
import { RandomUtil } from '../../../../util';
import { Actor, Player } from '../../../actor';
import { Board } from '../../../board';
import { Bracelet, EquipmentStatus, Shield, Sward } from '../iEquipment';

export abstract class BraceletBase extends EquipmentBase implements Bracelet {
  constructor(
    readonly status: EquipmentStatus,
    readonly symbol: BraceletSymbol = BraceletSymbol.init()
  ) {
    super(symbol, status);
  }

  abstract effect(player: Player, board: Board): void;

  onHit(user: Player, target: Actor): void {
    const dmg = RandomUtil.getRandomIntInclusive(1, 2);
    target.damage(dmg);
  }

  isSward(): this is Sward {
    return false;
  }

  isShield(): this is Shield {
    return false;
  }
}
