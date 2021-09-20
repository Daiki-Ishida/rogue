import { Image } from 'p5';
import { ItemSymbolBase } from '../..';
import { imageStore } from '../../../..';

export class ScrollSymbol extends ItemSymbolBase {
  private constructor(readonly img: Image) {
    super(img);
  }

  static init(): ScrollSymbol {
    return new ScrollSymbol(imageStore.items.scroll);
  }
}
