import { Camera } from 'game/view';
import p5 from 'p5';
import { Condition, ConditionType } from './condition';

let IDX = 0;

export class Conditions {
  conditions: Condition[];

  constructor(conditions: Condition[]) {
    this.conditions = conditions;
  }

  static init(): Conditions {
    return new Conditions([]);
  }

  push(condition: Condition): void {
    // 重複しない
    if (this.isInclude(condition.value)) {
      return;
    }

    this.conditions.push(condition);
  }

  recover(condition: ConditionType): void {
    this.conditions.forEach((c) => {
      if ((c.value = condition)) {
        c.recover();
      }
    });
  }

  refresh(): void {
    this.conditions = this.conditions.filter((c) => !c.isRecovered);
  }

  isInclude(condition: ConditionType): boolean {
    return (
      this.conditions.find((cond) => cond.value === condition) !== undefined
    );
  }

  draw(_x: number, _y: number, p: p5, camera: Camera): void {
    if (this.conditions.length === 0) return;

    if (p.frameCount % 60 === 0) {
      IDX++;
    }

    if (IDX >= this.conditions.length) {
      IDX = 0;
    }

    const { x, y } = camera.adjust(_x, _y - 1);

    const cond = this.conditions[IDX];
    const dy = p.sin(p.frameCount / 10) * 5;
    cond.draw(x, y + dy, p, camera);
  }
}
