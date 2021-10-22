import p5 from 'p5';
import { Game } from 'game/game';
import { BounceIndicator } from '.';
import { Camera } from '../../drawer';
import { StatusIndicator } from './statusIndicator';

export class IndicatorManager {
  private constructor(
    readonly statusIndicators: StatusIndicator,
    public bounceIndicators: BounceIndicator[]
  ) {}

  static init(): IndicatorManager {
    const statusIndicator = new StatusIndicator();
    return new IndicatorManager(statusIndicator, []);
  }

  proc(): void {
    for (const indicator of this.bounceIndicators) {
      indicator.proc();
    }
    this.bounceIndicators = this.bounceIndicators.filter((i) => !i.done);
  }

  draw(game: Game, p: p5, camera: Camera): void {
    this.statusIndicators.draw(p, game);
    for (const indicator of this.bounceIndicators) {
      indicator.draw(p, camera);
    }
  }
}
