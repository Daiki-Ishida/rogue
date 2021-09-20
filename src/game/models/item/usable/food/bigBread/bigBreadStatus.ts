import { FoodStatusBase } from '..';

const VALUE = 100;

export class BigBreadStatus extends FoodStatusBase {
  static init(): BigBreadStatus {
    return new BigBreadStatus(VALUE);
  }

  static readonly _name = '大きいパン';
  displayName(): string {
    return BigBreadStatus._identified
      ? BigBreadStatus._name
      : BigBreadStatus._tempName;
  }

  get identified(): boolean {
    return BigBreadStatus._identified;
  }
}
