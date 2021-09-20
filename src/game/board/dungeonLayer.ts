import { LayerBase, Tile } from '.';
import { Dungeon } from '../../dungeon';

export class DungeonLayer extends LayerBase {
  static init(w: number, h: number): DungeonLayer {
    const base = Array(w * h).fill(Tile.BLOCK);
    return new DungeonLayer(w, h, base);
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