export * from './window';
export * from './windowManager';
export * from './selectionWindow';
export * from './option';
export * from './itemSelectWindow';
export * from './exitSelectWindow';
export * from './inventoryWindow';

// exec(): void {
//   // switch (this.selected) {
//   //   case 'PROCEED':
//   //     game.nextLevel();
//   //     break;
//   //   case 'CANCEL': {
//   //     game.turn.goNextPhase();
//   //     break;
//   //   }
//   // }
//   // game.selectWindow = undefined;
//   // controller.changeState(actionController);
// }

// exec(game: Game): void {
//   switch (this.selected) {
//     case 'USE':
//     case 'EQUIP':
//     case 'UNEQUIP':
//       game.commands.push(new ItemCommand(game.player, this.item));
//       game.inventory.close();
//       controller.changeState(actionController);
//       break;
//     case 'THROW':
//       game.commands.push(new ThrowCommand(game.player, this.item));
//       game.inventory.close();
//       controller.changeState(actionController);
//       break;
//     case 'LOOK_INTO': {
//       const pot = this.item as Pot;
//       game.potContentsWindow = new PotContents(pot);
//       controller.changeState(new PotContentsController(pot));
//       game.inventory.close();
//       break;
//     }
//     case 'INSERT':
//       controller.changeState(new PotInsertController(this.item as Pot));
//       break;
//     case 'REMOVE': {
//       if (!game.potContentsWindow) {
//         throw new Error();
//       }

//       const pot = game.potContentsWindow.pot;
//       pot.remove(game);

//       controller.changeState(inventoryController);
//       game.inventory.open();
//       game.potContentsWindow = undefined;
//       break;
//     }
//     case 'CANCEL': {
//       game.inventory.close();
//       game.potContentsWindow = undefined;
//       controller.changeState(actionController);
//       break;
//     }
//   }
// }
