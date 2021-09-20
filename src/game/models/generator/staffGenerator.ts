import {
  FortuneStaff,
  KnockbackStaff,
  LightningStaff,
  MageStaff,
  OrdinaryStaff,
  ParalysisStaff,
  PinningStaff,
  PostponeStaff,
  SealingStaff,
  Staff,
  SwapStaff,
  UnfortuneStaff,
} from '../game/item';
import { itemDataStore } from '../store/itemDataStore';

export class StaffGenerator {
  static generate(): Staff {
    const staffName = itemDataStore.getStaffNameRandomly();
    let staff: Staff;
    switch (staffName) {
      case 'KnockbackStaff':
        staff = KnockbackStaff.generate();
        break;
      case 'FortuneStaff':
        staff = FortuneStaff.generate();
        break;
      case 'UnfortuneStaff':
        staff = UnfortuneStaff.generate();
        break;
      case 'PinningStaff':
        staff = PinningStaff.generate();
        break;
      case 'OrdinaryStaff':
        staff = OrdinaryStaff.generate();
        break;
      case 'LightningStaff':
        staff = LightningStaff.generate();
        break;
      case 'SwapStaff':
        staff = SwapStaff.generate();
        break;
      case 'MageStaff':
        staff = MageStaff.generate();
        break;
      case 'ParalysisStaff':
        staff = ParalysisStaff.generate();
        break;
      case 'PostponeStaff':
        staff = PostponeStaff.generate();
        break;
      case 'SealingStaff':
        staff = SealingStaff.generate();
        break;
      default:
        throw new Error(`Invalid Id: ${staffName}`);
        break;
    }

    return staff;
  }
}
