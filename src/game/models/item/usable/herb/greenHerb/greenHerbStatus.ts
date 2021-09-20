import { HerbStatus } from '..';

export class GreenHerbStatus extends HerbStatus {
  static readonly _name = '薬草';

  displayName(): string {
    return GreenHerbStatus._identified
      ? GreenHerbStatus._name
      : GreenHerbStatus._tempName;
  }

  get identified(): boolean {
    return GreenHerbStatus._identified;
  }
}
