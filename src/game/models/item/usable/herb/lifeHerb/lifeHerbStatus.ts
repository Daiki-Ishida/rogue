import { HerbStatus } from '..';

export class LifeHerbStatus extends HerbStatus {
  static readonly _name = '命の草';

  displayName(): string {
    return LifeHerbStatus._identified
      ? LifeHerbStatus._name
      : LifeHerbStatus._tempName;
  }

  get identified(): boolean {
    return LifeHerbStatus._identified;
  }
}
