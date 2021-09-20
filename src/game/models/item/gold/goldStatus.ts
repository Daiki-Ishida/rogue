import { ItemStatusBase } from '..';
import { RandomUtil } from '../../../util';

export class GoldStatus extends ItemStatusBase {
  static _identified = true;

  constructor(readonly amount: number) {
    super();
  }

  static generate(): GoldStatus {
    const amount = RandomUtil.getRandomIntInclusive(10, 2000);
    return new GoldStatus(amount);
  }

  get identified(): boolean {
    return true;
  }

  displayName(): string {
    return `${this.amount} G`;
  }
}
