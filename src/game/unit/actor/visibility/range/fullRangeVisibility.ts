import { VisibilityRange } from '.';

export class FullRangeVisibility implements VisibilityRange {
  constructor(
    readonly x: number = 0,
    readonly y: number = 0,
    readonly w: number = 60,
    readonly h: number = 30
  ) {}
}
