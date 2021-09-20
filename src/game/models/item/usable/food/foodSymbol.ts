import { Image } from 'p5';
import { ItemSymbolBase } from '../..';
import { imageStore } from '../../../..';

export class FoodSymbol extends ItemSymbolBase {
  private constructor(readonly img: Image) {
    super(img);
  }

  static init(): FoodSymbol {
    return new FoodSymbol(imageStore.items.bread);
  }
}
