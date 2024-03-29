import { game } from 'game';
import { ArtCommand, AttackCommand, Command, MoveCommand } from 'game/command';
import { Strategy } from './strategy';
import { Enemy } from '../enemy';
import { DirectionKey } from '../direction';
import { GridUtil, RandomUtil } from 'game/util';

/**
 * 敵の基本の行動アルゴリズム
 * 特性に合わせて行動を変える場合は継承して利用する。
 */
class BasicStrategy implements Strategy {
  target(enemy: Enemy): { x: number | undefined; y: number | undefined } {
    // プレイヤーが視野に入れば、プレイヤーを目指す。
    if (enemy.isInSightOfPlayer()) {
      return { x: game.player.x, y: game.player.y };
    }

    if (enemy.hasTarget) {
      return {
        x: enemy.targetX,
        y: enemy.targetY,
      };
    }

    const room = game.board.findRoom(enemy.x, enemy.y);
    if (room) {
      return this.findDoor(enemy);
    }

    return {
      x: undefined,
      y: undefined,
    };
  }

  command(enemy: Enemy): Command {
    const player = game.player;
    const board = game.board;
    this.adjustDirection(enemy);

    // 3/4で必殺技を使う
    const random = RandomUtil.getRandomIntInclusive(0, 3);
    const artsAvailable =
      random !== 0 &&
      !enemy.isCondition('SEALED') &&
      enemy.specialArt.inRange(player.x, player.y, enemy, board);

    return artsAvailable
      ? ArtCommand.of(enemy)
      : enemy.isAttackable(player)
      ? AttackCommand.of(enemy)
      : MoveCommand.of(enemy);
  }

  /**
   * 体の向きを調整
   */
  private adjustDirection(enemy: Enemy): void {
    enemy.hasTarget
      ? // ターゲットがあればそっちに進む
        this.turnToTarget(enemy)
      : // なければまっすぐ進む
        this.straightForward(enemy);
  }

  /**
   * 最も遠い部屋の出口を探す
   */
  private findDoor(enemy: Enemy): { x: number; y: number } {
    const candidates = this.findRoomExits(enemy);

    const distances = candidates.map((elem, idx) => {
      return {
        idx: idx,
        val: GridUtil.distanceBetween(enemy.x, enemy.y, elem.x, elem.y),
      };
    });

    distances.sort((a, b) => b.val - a.val);
    const roomExit = candidates[distances[0].idx];

    return { x: roomExit.x, y: roomExit.y };
  }

  /**
   * 部屋の出口を全て探す
   */
  private findRoomExits(enemy: Enemy): { x: number; y: number }[] {
    const exits: { x: number; y: number }[] = [];
    const board = game.board;
    const v = enemy.visibility;

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
  private straightForward(enemy: Enemy): void {
    const board = game.board;
    // 真っ直ぐ進めればそのまま進む
    if (enemy.canMove(board)) return;

    // 左にいければ左に進む
    enemy.turnLeft();
    if (enemy.canMove(board)) return;

    // 右にいければ右に進む
    enemy.turnAround();
    if (enemy.canMove(board)) return;

    // 直進・左右が無理なら引き返す
    enemy.turnRight();
  }

  /**
   * ターゲットに向かって最短で接近する方向を探す
   */
  private turnToTarget(enemy: Enemy): void {
    const player = game.player;
    const board = game.board;
    // ターゲットに近づくように移動
    const x = enemy.x;
    const y = enemy.y;
    const tx = enemy.targetX;
    const ty = enemy.targetY;

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

    enemy.turnTo(dx > dy ? horizontal() : vertical());
    if (enemy.canMove(board) || enemy.isAttackable(player)) {
      return;
    }

    // 指定の方向に進めなければ水平・垂直を逆にする
    enemy.turnTo(dx > dy ? vertical() : horizontal());
  }
}

export const basicStrategy = new BasicStrategy();
