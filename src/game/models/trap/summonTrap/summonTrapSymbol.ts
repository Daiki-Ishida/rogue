import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class SummonTrapSymbol extends TrapSymbolBase {
  static init(): SummonTrapSymbol {
    return new SummonTrapSymbol(imageStore.traps.summon);
  }
}
