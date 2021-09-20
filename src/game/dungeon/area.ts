import { BasicRoom, Room } from '.';
import { RandomUtil } from '../../util';

const MIN_WIDTH = 12;
const MIN_HEIGHT = 12;

export class Area {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly w: number,
    readonly h: number,
    public parentNode?: Area,
    public childNodes: Area[] = []
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.parentNode = parentNode;
    this.childNodes = [];
  }

  static init(w: number, h: number): Area {
    return new Area(0, 0, w, h);
  }

  /**
   * 深さ優先探索による全エリアのイテレーション
   * for(a of area){...}を使えるようにするため
   * https://ja.wikipedia.org/wiki/%E6%B7%B1%E3%81%95%E5%84%AA%E5%85%88%E6%8E%A2%E7%B4%A2
   */
  *[Symbol.iterator](): Iterator<Area> {
    const stack: Area[] = [];
    const visited: Area[] = [];

    stack.push(this);
    visited.push(this);

    while (stack.length !== 0) {
      const node = stack.pop();

      if (node === undefined) {
        throw new Error('Something went wrong.');
      }

      yield node;

      for (const child of node.childNodes) {
        if (!visited.includes(child)) {
          visited.push(child);
          stack.push(child);
        }
      }
    }
  }

  private splitAtX(d: number): boolean {
    if (d < MIN_WIDTH || this.w - d < MIN_WIDTH) return false;
    this.childNodes = [
      new Area(this.x, this.y, d, this.h, this),
      new Area(this.x + d, this.y, this.w - d, this.h, this),
    ];
    return true;
  }

  private splitAtY(d: number): boolean {
    if (d < MIN_HEIGHT || this.h - d < MIN_HEIGHT) return false;
    this.childNodes = [
      new Area(this.x, this.y, this.w, d, this),
      new Area(this.x, this.y + d, this.w, this.h - d, this),
    ];
    return true;
  }

  private splitDelection(): 'X' | 'Y' {
    return Math.random() > 0.5 ? 'X' : 'Y';
  }

  private splitRandomly(): boolean {
    return this.splitDelection() === 'X'
      ? this.splitAtX(
          RandomUtil.getRandomIntInclusive(MIN_WIDTH, this.w - MIN_WIDTH)
        )
      : this.splitAtY(
          RandomUtil.getRandomIntInclusive(MIN_HEIGHT, this.h - MIN_HEIGHT)
        );
  }

  split(): void {
    const ok = this.splitRandomly();
    if (!ok) return;
    for (const node of this.childNodes) {
      node.split();
    }
  }

  isLeafNode(): boolean {
    return this.childNodes.length === 0;
  }

  makeRooms(): Room[] {
    const leafNodes = Array.from(this).filter(
      (node) => node != undefined && node.isLeafNode()
    );

    return leafNodes.map((node) => {
      return BasicRoom.generate(node);
    });
  }

  hasAncestor(area: Area): boolean {
    if (this === area) return true;
    if (this.parentNode === undefined) return false;
    if (this.parentNode === area) return true;
    return this.parentNode.hasAncestor(area);
  }
}
