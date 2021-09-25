import { UsableStatus } from './itemStatus';

export class FoodStatus implements UsableStatus {
  private constructor(
    public used: boolean,
    public identified: boolean,
    public value: number
  ) {}

  static init(id: string): FoodStatus {
    let value: number;
    switch (id) {
      case 'BREAD':
        value = 50;
        break;
      case 'BIG_BREAD':
        value = 100;
        break;
      case 'GIANT_BREAD':
        value = 100;
        break;
      case 'ROTTEN_BREAD':
        value = 20;
        break;
      default:
        throw new Error(`Invalid Id: ${id}`);
    }

    return new FoodStatus(false, true, value); // fixme
  }

  get displayName(): string {
    return 'todo';
  }
}
