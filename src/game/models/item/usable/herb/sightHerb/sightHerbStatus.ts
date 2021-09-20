import { HerbStatus } from '..';

export class SightHerbStatus extends HerbStatus {
  static readonly _name = '目薬草';

  displayName(): string {
    return SightHerbStatus._identified
      ? SightHerbStatus._name
      : SightHerbStatus._tempName;
  }

  get identified(): boolean {
    return SightHerbStatus._identified;
  }
}
