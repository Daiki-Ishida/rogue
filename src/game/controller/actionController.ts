import { KeyConfig } from 'config';
import { windowManager } from 'game';
import { AttackCommand, MoveCommand } from 'game/command';
import { Game } from 'game/game';
import { Controller, ControllerState, inventoryController } from '.';

class ActionController implements ControllerState {
  proc(input: string, game: Game, context: Controller): void {
    // if (!(game.turn.phase instanceof StandByPhase)) {
    //   return;
    // }
    const player = game.player;

    switch (input) {
      case 'k': {
        const command = new AttackCommand(player);
        game.commands.push(command);
        break;
      }
      case 'i':
        // new SoundEffect(game.asset.soundFiles.select).play();
        windowManager.inventoryWindow.open();
        context.changeState(inventoryController);
        break;
      case 'a':
      case 'w':
      case 'd':
      case 's': {
        const direction = KeyConfig.directionMapping[input];
        player.turnTo(direction);
        const command = new MoveCommand(player);
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
    }
  }
}

export const actionController = new ActionController();
