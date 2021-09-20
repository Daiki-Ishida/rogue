import { ItemStatusBase } from '../../itemStatus';
import { EquipmentStatus } from '../iEquipment';

export abstract class BraceletStatusBase
  extends ItemStatusBase
  implements EquipmentStatus
{
  constructor(
    public cursed: boolean,
    public fullIdentified: boolean = false,
    public equiped: boolean = false
  ) {
    super();
  }

  abstract get identified(): boolean;
  abstract fullIdentify(): void;
  abstract displayName(): string;
}
