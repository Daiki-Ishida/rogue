import { HerbStatus } from '..';

export class PoisonHerbStatus extends HerbStatus {
  static readonly _name = '毒草';

  displayName(): string {
    return PoisonHerbStatus._identified
      ? PoisonHerbStatus._name
      : PoisonHerbStatus._tempName;
  }

  get identified(): boolean {
    return PoisonHerbStatus._identified;
  }
}
