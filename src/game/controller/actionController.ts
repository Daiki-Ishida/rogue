import { KeyConfig } from 'config';
import { windowManager } from 'game';
import { AttackCommand, MoveCommand, StepCommand } from 'game/command';
import { Game } from 'game/game';
import { StandByPhase } from 'game/turn';
import { DirectionKey } from 'game/unit/actor/direction';
import { ActionSelectionWindow } from 'game/view/window';
import {
  ControllerManager,
  Controller,
  inventoryController,
  selectWindowController,
} from '.';

/**
 * プレイヤーの行動を受け付けるコントローラー
 */
export class ActionController implements Controller {
  proc(input: string, game: Game, context: ControllerManager): void {
    if (!(game.turn.phase instanceof StandByPhase)) {
      return;
    }

    const player = game.player;

    switch (input) {
      case 'k': {
        const command = AttackCommand.of(player);
        game.commands.push(command);
        break;
      }
      case 'i':
        windowManager.open();
        context.changeState(inventoryController);
        break;
      case 'a':
      case 'w':
      case 'd':
      case 's': {
        const direction = KeyConfig.directionMapping[input];
        player.turnTo(direction);
        const command = MoveCommand.of(player);
        game.commands.push(command);
        break;
      }
      case 'A':
      case 'W':
      case 'D':
      case 'S': {
        const direction = KeyConfig.directionMapping[input];
        player.turnTo(direction);
        break;
      }
      case 'u': {
        game.dash();
        const command = MoveCommand.of(player);
        game.commands.push(command);
        break;
      }
      case 'o': {
        game.step();
        const command = StepCommand.of(player);
        game.commands.push(command);
        break;
      }
      case 'j': {
        const { x, y } = game.player.next;
        const actor = game.board.findActor(x, y);
        if (actor?.isNpc()) {
          let d: DirectionKey;
          switch (game.player.d.key) {
            case 'DOWN':
              d = 'UP';
              break;
            case 'UP':
              d = 'DOWN';
              break;
            case 'LEFT':
              d = 'RIGHT';
              break;
            case 'RIGHT':
              d = 'LEFT';
              break;
          }
          actor.turnTo(d);

          const window = ActionSelectionWindow.ofNpcAbility(game.player, actor);
          windowManager.selectWindow = window;
          windowManager.statusWindow.setMode('MESSAGE');
          windowManager.statusWindow.open();

          context.changeState(selectWindowController);
        }
        break;
      }
      case 'p': {
        game.save();
        break;
      }
    }
  }
}

export const actionController = new ActionController();
