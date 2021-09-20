import { LayerBase, Tile } from './layer';

export class BaseLayer extends LayerBase {
  static init(w: number, h: number): BaseLayer {
    const base = Array(w * h).fill(Tile.UNVISITED);
    return new BaseLayer(w, h, base);
  }
}
