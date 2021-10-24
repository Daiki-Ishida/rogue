import { game } from 'game';
import { Command, MoveCommand, StepCommand } from 'game/command';
import { Strategy } from './strategy';
import { DirectionKey } from '../direction';
import { GridUtil, RandomUtil } from 'game/util';
import { Npc } from '../npc';

/**
 * NPCの基本の行動アルゴリズム（徘徊型）
 */
class NpcWalkingAroundStrategy implements Strategy {
  target(npc: Npc): { x: number | undefined; y: number | undefined } {
    if (npc.hasTarget) {
      return {
        x: npc.targetX,
        y: npc.targetY,
      };
    }

    const room = game.board.findRoom(npc.x, npc.y);
    if (room) {
      return this.findDoor(npc);
    }

    return {
      x: undefined,
      y: undefined,
    };
  }

  command(npc: Npc): Command {
    // 1/2で何もしない。
    const r = RandomUtil.getRandomIntInclusive(0, 1);
    if (r === 0) {
      return StepCommand.of(npc);
    }

    this.adjustDirection(npc);
    return MoveCommand.of(npc);
  }

  /**
   * 体の向きを調整
   */
  private adjustDirection(npc: Npc): void {
    npc.hasTarget
      ? // ターゲットがあればそっちに進む
        this.turnToTarget(npc)
      : // なければまっすぐ進む
        this.straightForward(npc);
  }

  /**
   * 最も遠い部屋の出口を探す
   */
  private findDoor(npc: Npc): { x: number; y: number } {
    const candidates = this.findDoors(npc);

    const distances = candidates.map((elem, idx) => {
      return {
        idx: idx,
        val: GridUtil.distanceBetween(npc.x, npc.y, elem.x, elem.y),
      };
    });

    distances.sort((a, b) => b.val - a.val);
    const roomExit = candidates[distances[0].idx];

    return { x: roomExit.x, y: roomExit.y };
  }

  /**
   * 部屋の出口を全て探す
   */
  private findDoors(npc: Npc): { x: number; y: number }[] {
    const exits: { x: number; y: number }[] = [];
    const board = game.board;
    const v = npc.visibility;

    for (let i = 0; i < v.w; i++) {
      for (let j = 0; j < v.h; j++) {
        const x = i + v.x;
        const y = j + v.y;
        if (board.isCorridor(x, y)) {
          exits.push({ x: x, y: y });
        }
      }
    }

    return exits;
  }

  /**
   * 現在の進路を極力維持しつつ、進める方向を探す
   */
  private straightForward(npc: Npc): void {
    const board = game.board;
    // 真っ直ぐ進めればそのまま進む
    if (npc.canMove(board)) return;

    // 左にいければ左に進む
    npc.turnLeft();
    if (npc.canMove(board)) return;

    // 右にいければ右に進む
    npc.turnAround();
    if (npc.canMove(board)) return;

    // 直進・左右が無理なら引き返す
    npc.turnRight();
  }

  /**
   * ターゲットに向かって最短で接近する方向を探す
   */
  private turnToTarget(npc: Npc): void {
    const board = game.board;
    // ターゲットに近づくように移動
    const x = npc.x;
    const y = npc.y;
    const tx = npc.targetX;
    const ty = npc.targetY;

    // ターゲットがある前提
    if (tx === undefined || ty === undefined) {
      throw new Error();
    }

    const dx = Math.abs(x - tx);
    const dy = Math.abs(y - ty);

    // 水平方向の判定
    const horizontal = (): DirectionKey => (x > tx ? 'LEFT' : 'RIGHT');
    // 垂直方向の判定
    const vertical = (): DirectionKey => (y > ty ? 'UP' : 'DOWN');

    npc.turnTo(dx > dy ? horizontal() : vertical());
    if (npc.canMove(board)) {
      return;
    }

    // 指定の方向に進めなければ水平・垂直を逆にする
    npc.turnTo(dx > dy ? vertical() : horizontal());
  }
}

export const npcWalkingAroundStrategy = new NpcWalkingAroundStrategy();
