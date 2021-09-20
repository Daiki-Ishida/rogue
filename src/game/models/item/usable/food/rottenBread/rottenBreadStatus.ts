import { FoodStatusBase } from '..';

const VALUE = 50;

export class RottenBreadStatus extends FoodStatusBase {
  static init(): RottenBreadStatus {
    return new RottenBreadStatus(VALUE);
  }

  static readonly _name = '腐ったパン';
  displayName(): string {
    return RottenBreadStatus._identified
      ? RottenBreadStatus._name
      : RottenBreadStatus._tempName;
  }

  get identified(): boolean {
    return RottenBreadStatus._identified;
  }
}
