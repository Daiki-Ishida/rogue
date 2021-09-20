import { ItemSymbolBase } from '../..';
import { imageStore } from '../../../..';

export class BraceletSymbol extends ItemSymbolBase {
  static init(): BraceletSymbol {
    return new BraceletSymbol(imageStore.items.bracelet);
  }
}
