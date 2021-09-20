import { ItemStatusBase } from '../../itemStatus';
import { ShieldStatus } from '../iEquipment';

export abstract class ShieldStatusBase
  extends ItemStatusBase
  implements ShieldStatus
{
  constructor(
    readonly def: number,
    public level: number,
    public identified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {
    super();
  }
  get fullIdentified(): boolean {
    return false; // todo
  }

  fullIdentify(): void {
    throw new Error('Method not implemented.');
  }

  abstract displayName(): string;
}
