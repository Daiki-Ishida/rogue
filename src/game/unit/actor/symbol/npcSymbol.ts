import p5, { Image } from 'p5';
import { imageStore } from 'game';
import { Camera } from 'game/drawer';
import { ActorSymbol } from '.';
import { DirectionKey } from '../direction';

export class NpcSymbol extends ActorSymbol {
  static init(id: string): NpcSymbol {
    let chip: Image[];
    switch (id) {
      case 'HEALER':
        chip = imageStore.actors.healer;
        break;
      case 'BLACKSMITH':
        chip = imageStore.actors.blacksmith;
        break;
      case 'PRIESTESS':
        chip = imageStore.actors.priestess;
        break;
      case 'CHEF':
        chip = imageStore.actors.chef;
        break;
      default:
        throw new Error('');
    }

    return new NpcSymbol(chip, imageStore.effects.slash, 9);
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
