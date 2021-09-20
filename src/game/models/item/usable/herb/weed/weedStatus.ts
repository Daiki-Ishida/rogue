import { HerbStatus } from '..';

export class WeedStatus extends HerbStatus {
  static readonly _name = '雑草';

  displayName(): string {
    return WeedStatus._identified ? WeedStatus._name : WeedStatus._tempName;
  }

  get identified(): boolean {
    return WeedStatus._identified;
  }
}
