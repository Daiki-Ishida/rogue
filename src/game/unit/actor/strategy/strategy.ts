import { Command } from 'game/command';
import { Actor } from '..';

export interface Strategy {
  /**
   * ターゲットの設定
   */
  target(actor: Actor): { x: number | undefined; y: number | undefined };

  /**
   * コマンドの生成
   */
  command(actor: Actor): Command;
}
