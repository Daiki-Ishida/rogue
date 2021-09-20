import { HerbStatus } from '..';

export class StomachShrinkerStatus extends HerbStatus {
  static readonly _name = '胃縮小の種';

  displayName(): string {
    return StomachShrinkerStatus._identified
      ? StomachShrinkerStatus._name
      : StomachShrinkerStatus._tempName;
  }

  get identified(): boolean {
    return StomachShrinkerStatus._identified;
  }
}
