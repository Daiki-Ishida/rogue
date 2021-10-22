import { imageStore } from 'game';
import p5, { Image } from 'p5';
import { Camera } from '../../drawer';

export interface ITrapSymbol {
  x: number;
  y: number;
  img: Image;
  draw(p: p5, camera: Camera): void;
}

export class TrapSymbol implements ITrapSymbol {
  private constructor(
    public x: number,
    public y: number,
    readonly img: Image
  ) {}

  static init(id: string): TrapSymbol {
    const trapImgs = imageStore.traps;
    let img: Image;
    switch (id) {
      case 'LANDMINE':
        img = trapImgs.landMine;
        break;
      case 'HUNGER':
        img = trapImgs.hunger;
        break;
      case 'ROCK_SLIDE':
        img = trapImgs.rockSlide;
        break;
      case 'POISON':
        img = trapImgs.poison;
        break;
      case 'SLEEP':
        img = trapImgs.sleep;
        break;
      case 'SPIN':
        img = trapImgs.spin;
        break;
      case 'STRIP':
        img = trapImgs.strip;
        break;
      case 'SUMMON':
        img = trapImgs.summon;
        break;
      case 'WARP':
        img = trapImgs.warp;
        break;
      case 'MULTIPLICATION':
        img = trapImgs.multiplication;
        break;
      default:
        throw new Error(`Invalid Id: ${id}`);
    }
    return new TrapSymbol(0, 0, img);
  }

  draw(p: p5, camera: Camera): void {
    const { x, y } = camera.adjust(this.x, this.y);
    p.image(this.img, x, y, camera.zoom, camera.zoom);
  }
}
