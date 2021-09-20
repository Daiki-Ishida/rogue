import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class PoisonTrapSymbol extends TrapSymbolBase {
  static init(): PoisonTrapSymbol {
    return new PoisonTrapSymbol(imageStore.traps.poison);
  }
}
