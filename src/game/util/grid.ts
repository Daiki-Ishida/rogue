export class GridUtil {
  static gridToIndex(x: number, y: number): number {
    const w = 60;
    const h = 30;
    if (x < 0 || x >= w || y < 0 || y >= h) {
      return -1;
    }

    return y * w + x;
  }

  static indexToGrid(idx: number): number[] {
    const w = 60;

    const x = idx % w;
    const y = (idx - x) / w;
    return [x, y];
  }

  static distanceBetween(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  static rayToGrids(
    x: number,
    y: number,
    dx: number,
    dy: number,
    limit?: number
  ): number[][] {
    const areaContains = (x: number, y: number): boolean => {
      return x > 0 && x < 60 && y > 0 && y < 30;
    };

    const grids = [];
    let count = 0;

    while (areaContains(x, y)) {
      x += dx;
      y += dy;
      grids.push([x, y]);

      count++;
      if (limit && limit <= count) break;
    }

    return grids;
  }

  static aroundGrids(x: number, y: number): number[][] {
    const grids = [];
    grids.push(
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1]
    );

    return grids;
  }
}
