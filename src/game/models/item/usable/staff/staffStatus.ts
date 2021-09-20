import { UsableStatus, UsableStatusBase } from '..';

export interface StaffStatus extends UsableStatus {
  durability: number;
  fullIdentified: boolean;
  fullIdentify(): void;
}

export abstract class StaffStatusBase
  extends UsableStatusBase
  implements StaffStatus
{
  constructor(
    public durability: number,
    public fullIdentified: boolean = false
  ) {
    super();
  }

  abstract displayName(): string;
  abstract fullIdentify(): void;
}
