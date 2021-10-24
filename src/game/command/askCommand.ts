import { Player } from 'game/unit/actor';
import { Npc } from 'game/unit/actor/npc';
import { Command } from '.';

/**
 * NPCの手助けを得るコマンド
 */
export class AskCommand implements Command {
  private constructor(
    readonly actor: Player,
    readonly npc: Npc,
    public done: boolean
  ) {}

  static of(player: Player, npc: Npc): AskCommand {
    return new AskCommand(player, npc, false);
  }

  exec(): void {
    this.npc.activateAbility(this.actor);
    this.done = true;
  }
}
