import { Image } from 'p5';
import { ItemSymbolBase } from '../..';
import { imageStore } from '../../../..';

export class HerbSymbol extends ItemSymbolBase {
  private constructor(readonly img: Image) {
    super(img);
  }

  static init(): HerbSymbol {
    return new HerbSymbol(imageStore.items.herb);
  }
}
