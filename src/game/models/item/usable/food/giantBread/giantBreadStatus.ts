import { FoodStatusBase } from '..';

const VALUE = 999;

export class GiantBreadStatus extends FoodStatusBase {
  static init(): GiantBreadStatus {
    return new GiantBreadStatus(VALUE);
  }

  static readonly _name = '巨大なパン';
  displayName(): string {
    return GiantBreadStatus._identified
      ? GiantBreadStatus._name
      : GiantBreadStatus._tempName;
  }

  get identified(): boolean {
    return GiantBreadStatus._identified;
  }
}
