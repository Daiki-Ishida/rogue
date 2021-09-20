import { HerbStatus } from '..';

export class StomachExpanderStatus extends HerbStatus {
  static readonly _name = '胃拡張の種';

  displayName(): string {
    return StomachExpanderStatus._identified
      ? StomachExpanderStatus._name
      : StomachExpanderStatus._tempName;
  }

  get identified(): boolean {
    return StomachExpanderStatus._identified;
  }
}
