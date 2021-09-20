import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class SleepTrapSymbol extends TrapSymbolBase {
  static init(): SleepTrapSymbol {
    return new SleepTrapSymbol(imageStore.traps.sleep);
  }
}
