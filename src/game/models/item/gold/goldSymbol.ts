import { Image } from 'p5';
import { ItemSymbolBase } from '..';
import { imageStore } from '../../..';

export class GoldSymbol extends ItemSymbolBase {
  private constructor(readonly img: Image) {
    super(img);
  }

  static init(): GoldSymbol {
    return new GoldSymbol(imageStore.items.gold);
  }
}
