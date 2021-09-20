import p5 from 'p5';
import { Camera } from '../drawer';
import { Animation } from './animation';

class AnimationManager {
  private constructor(public animations: Animation[]) {
    this.animations = animations;
  }

  static init(): AnimationManager {
    return new AnimationManager([]);
  }

  get isAllDone(): boolean {
    return this.animations.length === 0;
  }

  exec(): void {
    this.animations.forEach((a) => a.exec());
    this.refresh();
  }

  push(a: Animation): void {
    this.animations.push(a);
  }

  refresh(): void {
    this.animations = this.animations.filter((a) => !a.done);
  }

  draw(p: p5, camera: Camera): void {
    for (const animation of this.animations) {
      if (animation.done) continue;

      animation.draw(p, camera);
    }
  }
}

export const animationManager = AnimationManager.init();
