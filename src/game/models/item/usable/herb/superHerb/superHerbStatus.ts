import { HerbStatus } from '..';

export class SuperHerbStatus extends HerbStatus {
  static readonly _name = '上薬草';

  displayName(): string {
    return SuperHerbStatus._identified
      ? SuperHerbStatus._name
      : SuperHerbStatus._tempName;
  }

  get identified(): boolean {
    return SuperHerbStatus._identified;
  }
}
