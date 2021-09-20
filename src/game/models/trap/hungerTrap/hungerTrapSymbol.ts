import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class HungerTrapSymbol extends TrapSymbolBase {
  static init(): HungerTrapSymbol {
    return new HungerTrapSymbol(imageStore.traps.hunger);
  }
}
