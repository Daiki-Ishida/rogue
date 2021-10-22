import { LayerBase, Tile } from './layer';
import { Dungeon } from '../dungeon';

export class DungeonLayer extends LayerBase {
  static init(w: number, h: number): DungeonLayer {
    const base = Array(w * h).fill(Tile.BLOCK);
    return new DungeonLayer(w, h, base);
  }

  reset(): void {
    this.tiles = Array(this.w * this.h).fill(Tile.BLOCK);
  }

  apply(dungeon: Dungeon): void {
    dungeon.rooms.forEach((room) => {
      for (let y = room.y; y < room.y + room.h; y++) {
        for (let x = room.x; x < room.x + room.w; x++) {
          this.putAt(Tile.ROOM, x, y);
        }
      }

      dungeon.corridors.forEach((corridor) => {
        this.putAt(Tile.CORRIDOR, corridor.x, corridor.y);
      });
    });
  }
}
