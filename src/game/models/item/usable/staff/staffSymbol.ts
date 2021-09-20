import { Image } from 'p5';
import { ItemSymbolBase } from '../..';
import { imageStore } from '../../../..';

export class StaffSymbol extends ItemSymbolBase {
  private constructor(readonly img: Image) {
    super(img);
  }

  static init(): StaffSymbol {
    return new StaffSymbol(imageStore.items.staff);
  }
}
