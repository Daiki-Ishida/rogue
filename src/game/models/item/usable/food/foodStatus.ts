import { UsableStatus, UsableStatusBase } from '..';

export interface FoodStatus extends UsableStatus {
  readonly value: number;
}

export abstract class FoodStatusBase
  extends UsableStatusBase
  implements FoodStatus
{
  constructor(readonly value: number) {
    super();
  }
}
