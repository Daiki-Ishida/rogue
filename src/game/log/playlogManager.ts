import p5 from 'p5';
import { Playlog } from '.';

export class PlaylogManager {
  private constructor(public logs: Playlog[]) {}

  static init(): PlaylogManager {
    return new PlaylogManager([]);
  }

  add(message: string): void {
    const log = Playlog.generate(message);
    if (this.logs.length > 9) {
      this.logs.shift();
    }

    this.logs.push(log);
  }

  proc(): void {
    for (const log of this.logs) {
      log.proc();
    }

    this.logs = this.logs.filter((log) => !log.done);
  }

  draw(p: p5): void {
    p.push();
    p.textSize(24);
    for (let i = 0; i < this.logs.length; i++) {
      this.logs[i].draw(20, 50 + 30 * (i + 1), p);
    }
    p.pop();
  }
}
