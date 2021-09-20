import { ActorStatusBase } from '..';
import { enemyDataStore } from '../../../store';

export class EnemyStatus extends ActorStatusBase {
  constructor(
    readonly name: string,
    readonly group: string,
    public maxHp: number,
    public dmg: number,
    readonly str: number,
    readonly vit: number,
    public level: number,
    public exp: number
  ) {
    super(name, maxHp, dmg, str, vit, level, exp);
  }

  static init(id: string): EnemyStatus {
    const status = enemyDataStore.findEnemyStatusById(id);
    return new EnemyStatus(
      status.name,
      status.group,
      status.hp,
      0,
      status.atk,
      status.def,
      status.level,
      status.exp
    );
  }

  get atk(): number {
    return this.str;
  }
  get def(): number {
    return this.vit;
  }
}
