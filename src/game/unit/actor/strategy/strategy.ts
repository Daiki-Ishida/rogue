import { Command } from 'game/command';
import { Enemy } from '../enemy';

export interface Strategy {
  /**
   * ターゲットの設定
   */
  target(enemy: Enemy): { x: number | undefined; y: number | undefined };

  /**
   * コマンドの生成
   */
  command(enemy: Enemy): Command;
}
