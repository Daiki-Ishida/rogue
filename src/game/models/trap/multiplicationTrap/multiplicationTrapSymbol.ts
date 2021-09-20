import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class MultiplicationTrapSymbol extends TrapSymbolBase {
  static init(): MultiplicationTrapSymbol {
    return new MultiplicationTrapSymbol(imageStore.traps.multiplication);
  }
}
