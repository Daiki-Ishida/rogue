import { Condition, ConditionType } from './condition';

export class Conditions {
  conditions: Condition[];

  constructor(conditions: Condition[]) {
    this.conditions = conditions;
  }

  static init(): Conditions {
    return new Conditions([]);
  }

  push(condition: Condition): void {
    // todo 重複判定等
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

  // draw(x: number, y: number, p: p5, camera: Camera): void {
  //   if (this.conditions.length === 0) return;

  //   if (p.frameCount % 60 === 0) {
  //     idx++;
  //   }

  //   if (idx >= this.conditions.length) {
  //     idx = 0;
  //   }

  //   const cond = this.conditions[idx];
  //   const dy = p.sin(p.frameCount / 10) * 5;
  //   cond.draw(x, y + dy, p, camera);
  // }
}
