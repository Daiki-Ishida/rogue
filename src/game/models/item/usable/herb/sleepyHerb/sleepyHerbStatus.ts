import { HerbStatus } from '..';

export class SleepyHerbStatus extends HerbStatus {
  static readonly _name = '睡眠草';

  displayName(): string {
    return SleepyHerbStatus._identified
      ? SleepyHerbStatus._name
      : SleepyHerbStatus._tempName;
  }

  get identified(): boolean {
    return SleepyHerbStatus._identified;
  }
}
