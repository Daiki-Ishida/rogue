import { Board } from './board';
import { Commands } from './command';
import { Inventory } from './inventory';
import { Player } from './models/actor';
import { ItemGenerator, TrapGenerator } from './models/generator';
import { Turn } from './turn';
import { RandomUtil } from './util';

export class Game {
  constructor(
    readonly player: Player,
    readonly board: Board,
    readonly commands: Commands,
    readonly turn: Turn,
    readonly inventory: Inventory
  ) {}

  static init(): Game {
    const player = Player.init('Player');
    const board = Board.init(60, 30);
    const commands = Commands.init();
    const turn = Turn.init();
    const inventory = Inventory.init();

    // debug
    player.spawn(board);
    player.visibility.setFullRange();
    board.actors.push(player);

    const itemCount = RandomUtil.getRandomIntInclusive(7, 12);
    const items = ItemGenerator.generate(itemCount, board);
    console.log(items);
    for (const item of items) {
      board.items.push(item);
    }

    const trapCount = RandomUtil.getRandomIntInclusive(7, 12);
    const traps = TrapGenerator.generate(trapCount, board);
    console.log(traps);
    for (const trap of traps) {
      trap.disclose();
      board.traps.push(trap);
    }

    return new Game(player, board, commands, turn, inventory);
  }

  proc(): void {
    this.turn.proc(this);
  }
}
