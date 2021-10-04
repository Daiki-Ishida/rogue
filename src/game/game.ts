import { Board } from './board';
import { Commands } from './command';
import { Inventory } from './inventory';
import { Player } from './models/actor';
import {
  EnemyGenerator,
  ItemGenerator,
  TrapGenerator,
} from './models/generator';
import { Turn } from './turn';
import { RandomUtil } from './util';

type PlayMode = 'NORMAL' | 'DASH' | 'STEP';
type GameState = 'START' | 'PLAY' | 'BRIDGE' | 'GAME_OVER' | 'GAME_CLEAR';

export class Game {
  private constructor(
    readonly player: Player,
    readonly board: Board,
    readonly commands: Commands,
    readonly turn: Turn,
    readonly inventory: Inventory,
    public mode: PlayMode = 'NORMAL',
    public state: GameState = 'BRIDGE'
  ) {}

  static init(): Game {
    const player = Player.init('Player');
    const board = Board.init(60, 30);
    const commands = Commands.init();
    const turn = Turn.init();
    const inventory = Inventory.init();

    const game = new Game(player, board, commands, turn, inventory);
    game.generateModels();
    return game;
  }

  get skip(): boolean {
    return this.mode === 'DASH' || this.mode === 'STEP';
  }

  dash(): void {
    this.mode = 'DASH';
  }

  step(): void {
    this.mode = 'STEP';
  }

  resume(): void {
    this.mode = 'NORMAL';
  }

  proc(): void {
    this.turn.proc(this);
  }

  next(): void {
    this.state = 'BRIDGE';

    this.board.next();
    this.generateModels();
  }

  private generateModels(): void {
    const board = this.board;
    this.player.spawn(board);

    const enemyCount = RandomUtil.getRandomIntInclusive(7, 12);
    EnemyGenerator.generate(enemyCount, board);

    const itemCount = RandomUtil.getRandomIntInclusive(7, 12);
    ItemGenerator.generate(itemCount, board);

    const trapCount = RandomUtil.getRandomIntInclusive(7, 12);
    TrapGenerator.generate(trapCount, board);
  }
}
