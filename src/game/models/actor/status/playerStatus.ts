import { ActorStatus } from '.';

export class PlayerStatus extends ActorStatus {
  constructor(
    readonly name: string,
    public maxHp: number,
    readonly str: number,
    readonly vit: number,
    public level: number,
    public maxFullness: number,
    public exp: number = 0,
    public dmg: number = 0,
    public hunger: number = 0,
    public sward?: Sward,
    public shield?: Shield
  ) {
    super(name, maxHp, dmg, str, vit, level, exp);
  }

  static init(name: string): PlayerStatus {
    const initialStatus = {
      level: 1,
      fullness: 100,
      hp: 15,
      str: 5,
      vit: 1,
    };
    return new PlayerStatus(
      name,
      initialStatus.hp,
      initialStatus.str,
      initialStatus.vit,
      initialStatus.level,
      initialStatus.fullness
    );
  }

  get atk(): number {
    const sward = this.sward === undefined ? 0 : this.sward.atk;
    return this.str + sward;
  }

  get def(): number {
    const shield = this.shield === undefined ? 0 : this.shield.def;
    return this.vit + shield;
  }

  get fullness(): number {
    return this.maxFullness - this.hunger;
  }
}
