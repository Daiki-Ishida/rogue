import { Phase, PhaseBase } from '.';
import { Commands } from '../../command';
import { PlayerActionPhase } from './playerActionPhase';

export class StandByPhase extends PhaseBase {
  get nextPhase(): Phase {
    return new PlayerActionPhase();
  }

  proc(commands: Commands): void {
    if (commands.isEmpty) return;

    this.completed = true;
  }
}
