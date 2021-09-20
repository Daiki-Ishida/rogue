import { VisibilityRange } from '.';
import { Room } from '../../../dungeon';

const MARGIN = 1;

export class RoomRangeVisibility implements VisibilityRange {
  constructor(readonly room: Room) {}

  get x(): number {
    return this.room.x - MARGIN;
  }
  get y(): number {
    return this.room.y - MARGIN;
  }
  get w(): number {
    return this.room.w + MARGIN * 2;
  }
  get h(): number {
    return this.room.h + MARGIN * 2;
  }
}
