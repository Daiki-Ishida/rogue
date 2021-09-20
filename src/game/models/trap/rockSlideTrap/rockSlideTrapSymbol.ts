import { TrapSymbolBase } from '..';
import { imageStore } from '../../..';

export class RockSlideTrapSymbol extends TrapSymbolBase {
  static init(): RockSlideTrapSymbol {
    return new RockSlideTrapSymbol(imageStore.traps.rockSlide);
  }
}
