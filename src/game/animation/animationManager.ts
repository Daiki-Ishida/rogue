import { Game } from 'game/game';
import { Actor } from 'game/models/actor';
import p5 from 'p5';
import { WalkAnimation } from '.';
import { Camera } from '../view';
import { Animation } from './animation';

export class AnimationManager {
  private constructor(public animations: Animation[]) {
    this.animations = animations;
  }

  static init(): AnimationManager {
    return new AnimationManager([]);
  }

  get isAllDone(): boolean {
    return this.animations.length === 0;
  }

  get isWalkDone(): boolean {
    return (
      this.animations.filter((animation) => animation instanceof WalkAnimation)
        .length === 0
    );
  }

  get isActionDone(): boolean {
    return (
      this.animations.filter(
        (animation) => !(animation instanceof WalkAnimation)
      ).length === 0
    );
  }

  exec(): void {
    this.animations.forEach((a) => a.exec());
    this.refresh();
  }

  /**
   * 移動コマンドだけ処理
   */
  execWalk(): void {
    this.animations
      .filter((animation) => animation instanceof WalkAnimation)
      .forEach((walk) => walk.exec());
    this.refresh();
  }

  /**
   * 移動以外のアクションだけ処理
   */
  execAction(): void {
    this.animations
      .filter((animation) => !(animation instanceof WalkAnimation))
      .forEach((action) => action.exec());
    this.refresh();
  }

  /**
   * 移動アニメーションをカット
   */
  skipWalk(game: Game): void {
    this.animations
      .filter((animation) => animation instanceof WalkAnimation)
      .forEach((walk) => (walk.done = true));

    for (const actor of game.board.actors) {
      actor.symbol.setAt(actor.x, actor.y);
    }
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
