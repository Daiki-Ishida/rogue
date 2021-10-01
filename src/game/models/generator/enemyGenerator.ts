import { Board } from 'game/board';
import { enemyDataStore } from 'game/store';
import { Enemy } from '../actor/enemy';

export class EnemyGenerator {
  static generate(n: number, level: number, board: Board): Enemy[] {
    const enemys: Enemy[] = [];
    for (let i = 0; i < n; i++) {
      const id = enemyDataStore.getEnemyIdInLevelRandomly(level);
      const enemy = Enemy.generate(id, board);
      enemys.push(enemy);
    }

    return enemys;
  }
}
