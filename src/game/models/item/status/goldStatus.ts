import { RandomUtil } from 'game/util';
import { ItemStatus } from '.';

export class GoldStatus implements ItemStatus {
  private constructor(readonly identified: boolean, readonly amount: number) {}

  static generate(): GoldStatus {
    const amount = RandomUtil.getRandomIntInclusive(1, 10); // todo
    return new GoldStatus(true, amount);
  }

  get displayName(): string {
    return 'todo';
  }
}
