import p5 from 'p5';
import { BounceIndicator } from '.';
import { Camera } from '..';

export class IndicatorManager {
  private constructor(public bounceIndicators: BounceIndicator[]) {}

  static init(): IndicatorManager {
    return new IndicatorManager([]);
  }

  proc(): void {
    for (const indicator of this.bounceIndicators) {
      indicator.proc();
    }
    this.bounceIndicators = this.bounceIndicators.filter((i) => !i.done);
  }

  draw(p: p5, camera: Camera): void {
    for (const indicator of this.bounceIndicators) {
      indicator.draw(p, camera);
    }
  }
}
