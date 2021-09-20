import { UsableStatus } from './itemStatus';

export class HerbStatus implements UsableStatus {
  private constructor(public used: boolean, public identified: boolean) {}

  static init(): HerbStatus {
    return new HerbStatus(false, false);
  }

  get displayName(): string {
    return 'todo';
  }
}
