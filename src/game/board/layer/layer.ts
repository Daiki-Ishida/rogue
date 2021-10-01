import { GridUtil } from 'game/util';

export enum Tile {
  VISITED,
  UNVISITED,
  BLOCK,
  ROOM,
  CORRIDOR,
  EXIT,
  TRAP,
  ITEM,
  ACTOR,
}

export interface Layer {
  w: number;
  h: number;
  tiles: Tile[];
  tileAt: (x: number, y: number) => Tile;
  putAt: (tile: Tile, x: number, y: number) => boolean;
  reset: () => void;
}

export abstract class LayerBase implements Layer {
  constructor(readonly w: number, readonly h: number, public tiles: Tile[]) {}

  tileAt(x: number, y: number): Tile {
    const idx = GridUtil.gridToIndex(x, y);
    return idx === -1 ? Tile.BLOCK : this.tiles[idx];
  }

  putAt(tile: Tile, x: number, y: number): boolean {
    const idx = GridUtil.gridToIndex(x, y);
    if (idx === -1) return false;

    this.tiles[idx] = tile;
    return true;
  }

  abstract reset(): void;
}
