import p5, { Image } from 'p5';
import { ActorSymbolBase, DirectionKey } from '..';
import { imageStore } from '../../..';
import { Camera } from '../../../drawer';

export class EnemySymbol extends ActorSymbolBase {
  static init(id: string): EnemySymbol {
    let img: Image[];
    let attackImg: Image[];
    switch (id) {
      case 'DRAGON_01':
        img = imageStore.actors.dragon;
        attackImg = imageStore.effects.fang;
        break;
      case 'DRAGON_02':
        img = imageStore.actors.dragon;
        attackImg = imageStore.effects.fang;
        break;
      case 'DRAGON_03':
        img = imageStore.actors.dragon;
        attackImg = imageStore.effects.fang;
        break;
      default:
        throw new Error(`Invalid ID: ${id}`);
    }
    return new EnemySymbol(img, attackImg, 0);
  }

  turnTo(direction: DirectionKey): void {
    switch (direction) {
      case 'LEFT':
        this.idx = 3;
        break;
      case 'UP':
        this.idx = 9;
        break;
      case 'RIGHT':
        this.idx = 6;
        break;
      case 'DOWN':
        this.idx = 0;
        break;
    }
  }

  draw(p: p5, camera: Camera): void {
    this.proc(p);
    const { x, y } = camera.adjust(this.x, this.y);
    const size = camera.zoom * 2;
    p.image(this.currentChip, x, y, size, size);
  }
}
