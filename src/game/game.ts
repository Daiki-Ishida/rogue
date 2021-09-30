import { Board } from './board';
import { Commands } from './command';
import { Inventory } from './inventory';
import { Player } from './models/actor';
import { Enemy } from './models/actor/enemy';
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

    const enemy = Enemy.generate('DRAGON_01', board);
    enemy.setAt(player.x + 1, player.y);

    const itemCount = RandomUtil.getRandomIntInclusive(7, 12);
    ItemGenerator.generate(itemCount, board);

    const trapCount = RandomUtil.getRandomIntInclusive(7, 12);
    TrapGenerator.generate(trapCount, board);

    return new Game(player, board, commands, turn, inventory);
  }

  proc(): void {
    this.turn.proc(this);
  }
}
