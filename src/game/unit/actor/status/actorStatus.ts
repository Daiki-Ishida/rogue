interface IActorStatus {
  name: string;
  maxHp: number;
  hp: number;
  dmg: number;
  atk: number;
  def: number;
  str: number;
  vit: number;
  level: number;
  exp: number;
}

export abstract class ActorStatus implements IActorStatus {
  constructor(
    readonly name: string,
    public maxHp: number,
    public dmg: number,
    readonly str: number,
    readonly vit: number,
    public level: number,
    public exp: number
  ) {}

  abstract get atk(): number;
  abstract get def(): number;
  get hp(): number {
    return this.maxHp - this.dmg;
  }
}
