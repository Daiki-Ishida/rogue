import { HerbStatus } from '..';

export class FortuneSeedStatus extends HerbStatus {
  static readonly _name = 'しあわせのタネ';

  displayName(): string {
    return FortuneSeedStatus._identified
      ? FortuneSeedStatus._name
      : FortuneSeedStatus._tempName;
  }

  get identified(): boolean {
    return FortuneSeedStatus._identified;
  }
}
