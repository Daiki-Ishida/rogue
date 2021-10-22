import p5 from 'p5';
import { imageStore } from 'game';
import { Camera } from 'game/drawer';
import { ActorSymbol } from '.';
import { DirectionKey } from '../direction';

export class PlayerSymbol extends ActorSymbol {
  static init(): PlayerSymbol {
    return new PlayerSymbol(
      imageStore.actors.player,
      imageStore.effects.slash,
      9
    );
  }

  turnTo(direction: DirectionKey): void {
    switch (direction) {
      case 'LEFT':
        this.idx = 12;
        break;
      case 'UP':
        this.idx = 3;
        break;
      case 'RIGHT':
        this.idx = 6;
        break;
      case 'DOWN':
        this.idx = 9;
        break;
    }
  }

  draw(p: p5, camera: Camera): void {
    this.proc(p);
    const { x, y } = camera.adjust(this.x, this.y);
    const size = camera.zoom * 2;
    p.image(this.currentChip, x, y - camera.zoom * 0.2, size, size);
  }
}
