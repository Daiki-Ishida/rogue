import { npcDataStore } from 'game/store';
import { ActorStatus } from './actorStatus';

type State = 'ACTIVE' | 'INACTIVE' | 'HOSTILE';

export class NpcStatus extends ActorStatus {
  constructor(
    readonly name: string,
    readonly maxHp: number,
    public dmg: number,
    readonly str: number,
    readonly vit: number,
    readonly level: number,
    readonly exp: number,
    public state: State
  ) {
    super(name, maxHp, dmg, str, vit, level, exp);
  }

  static init(id: string): NpcStatus {
    const status = npcDataStore.findStatusById(id);
    return new NpcStatus(
      status.name,
      status.hp,
      0,
      status.atk,
      status.def,
      1,
      0,
      'ACTIVE'
    );
  }

  get atk(): number {
    return this.str;
  }
  get def(): number {
    return this.vit;
  }
}
