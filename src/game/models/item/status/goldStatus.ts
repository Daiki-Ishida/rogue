import { RandomUtil } from 'game/util';
import { ItemStatus } from '.';

export class GoldStatus implements ItemStatus {
  private constructor(
    readonly id: string,
    readonly identified: boolean,
    readonly amount: number
  ) {}

  static generate(): GoldStatus {
    const amount = RandomUtil.getRandomIntInclusive(10, 2000);
    return new GoldStatus('GOLD', true, amount);
  }

  get displayName(): string {
    return `${this.amount} G`;
  }

  get description(): string {
    return 'お店で使えるぞ。';
  }

  identify(): void {
    return;
  }
}
