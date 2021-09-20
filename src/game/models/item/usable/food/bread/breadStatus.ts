import { FoodStatusBase } from '..';

const VALUE = 50;

export class BreadStatus extends FoodStatusBase {
  static init(): BreadStatus {
    return new BreadStatus(VALUE);
  }

  static readonly _name = 'パン';
  displayName(): string {
    return BreadStatus._identified ? BreadStatus._name : BreadStatus._tempName;
  }

  get identified(): boolean {
    return BreadStatus._identified;
  }
}
