import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class WarpTrapSymbol extends TrapSymbolBase {
  static init(): WarpTrapSymbol {
    return new WarpTrapSymbol(imageStore.traps.warp);
  }
}
