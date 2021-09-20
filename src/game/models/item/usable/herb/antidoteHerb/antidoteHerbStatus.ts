import { HerbStatus } from '..';

export class AntidoteHerbStatus extends HerbStatus {
  static readonly _name = '毒消し草';
  displayName(): string {
    return AntidoteHerbStatus._identified
      ? AntidoteHerbStatus._name
      : AntidoteHerbStatus._tempName;
  }

  get identified(): boolean {
    return AntidoteHerbStatus._identified;
  }
}
