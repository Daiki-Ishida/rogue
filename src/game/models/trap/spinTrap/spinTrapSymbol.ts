import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class SpinTrapSymbol extends TrapSymbolBase {
  static init(): SpinTrapSymbol {
    return new SpinTrapSymbol(imageStore.traps.spin);
  }
}
