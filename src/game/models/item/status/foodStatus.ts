import { UsableStatus } from './itemStatus';

export class FoodStatus implements UsableStatus {
  private constructor(
    public used: boolean,
    public identified: boolean,
    public value: number
  ) {}

  get displayName(): string {
    return 'todo';
  }
}
