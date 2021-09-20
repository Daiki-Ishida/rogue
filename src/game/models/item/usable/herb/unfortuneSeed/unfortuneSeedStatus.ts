import { HerbStatus } from '..';

export class UnfortuneSeedStatus extends HerbStatus {
  static readonly _name = '不幸のタネ';

  displayName(): string {
    return UnfortuneSeedStatus._identified
      ? UnfortuneSeedStatus._name
      : UnfortuneSeedStatus._tempName;
  }

  get identified(): boolean {
    return UnfortuneSeedStatus._identified;
  }
}
