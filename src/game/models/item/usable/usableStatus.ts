import { ItemStatus, ItemStatusBase } from '..';

export interface UsableStatus extends ItemStatus {
  used: boolean;
}

export abstract class UsableStatusBase
  extends ItemStatusBase
  implements UsableStatus
{
  constructor(public used: boolean = false) {
    super();
  }

  abstract get identified(): boolean;
  abstract displayName(): string;
}
