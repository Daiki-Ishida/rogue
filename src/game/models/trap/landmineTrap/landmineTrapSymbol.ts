import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class LandmineTrapSymbol extends TrapSymbolBase {
  static init(): LandmineTrapSymbol {
    return new LandmineTrapSymbol(imageStore.traps.landMine);
  }
}
