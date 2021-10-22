import { Board } from 'game/board';
import { enemyDataStore } from 'game/store';
import { Enemy } from '../actor/enemy';

export class EnemyGenerator {
  static generate(n: number, board: Board): Enemy[] {
    const enemys: Enemy[] = [];
    for (let i = 0; i < n; i++) {
      const lv = board.dungeon.level;
      const id = enemyDataStore.getEnemyIdInLevelRandomly(lv);
      const enemy = Enemy.generate(id);
      enemys.push(enemy);
    }

    return enemys;
  }
}
