import { ItemStatusBase } from '../../itemStatus';
import { SwardStatus } from '../iEquipment';

export abstract class SwardStatusBase
  extends ItemStatusBase
  implements SwardStatus
{
  constructor(
    readonly baseAtk: number,
    public level: number,
    public fullIdentified: boolean,
    public equiped: boolean,
    public cursed: boolean
  ) {
    super();
  }

  abstract get identified(): boolean;
  abstract fullIdentify(): void;
  abstract displayName(): string;
}
