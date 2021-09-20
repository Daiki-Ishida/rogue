import { MonsterSummonerBraceletStatus } from '.';
import { BraceletBase } from '..';
import { Player } from '../../../../actor';
import { Board } from '../../../../board';

/**
 * 魔物呼びの腕輪
 */
export class MonsterSummonerBracelet extends BraceletBase {
  static generate(): MonsterSummonerBracelet {
    const status = MonsterSummonerBraceletStatus.init();
    return new MonsterSummonerBracelet(status);
  }

  effect(player: Player, board: Board): void {
    console.log('todo');
    return;
  }
}
