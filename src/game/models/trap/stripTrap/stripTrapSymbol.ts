import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class StripTrapSymbol extends TrapSymbolBase {
  static init(): StripTrapSymbol {
    return new StripTrapSymbol(imageStore.traps.strip);
  }
}
