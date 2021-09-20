import { Phase, PhaseBase, StandByPhase } from '.';

export class InitPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new StandByPhase();
  }

  proc(): void {
    // TODO: 敵spawn等
    this.completed = true;
  }
}
