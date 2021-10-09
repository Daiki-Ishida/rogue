import { soundManager, soundStore } from 'game';
import { Board } from './board';
import { Commands } from './command';
import { Inventory } from './inventory';
import { Player } from './unit/actor';
import { Turn } from './turn';

type PlayMode = 'NORMAL' | 'DASH' | 'STEP';
type GameState =
  | 'START'
  | 'SET_UP'
  | 'PLAY'
  | 'BRIDGE'
  | 'GAME_OVER'
  | 'GAME_CLEAR';

export class Game {
  private constructor(
    readonly player: Player,
    readonly board: Board,
    readonly commands: Commands,
    readonly turn: Turn,
    readonly inventory: Inventory,
    public gold: number = 0,
    public mode: PlayMode = 'NORMAL',
    public state: GameState = 'START'
  ) {}

  static init(): Game {
    const board = Board.init(60, 30);
    const player = Player.init('Player');
    player.spawn(board);

    const commands = Commands.init();
    const turn = Turn.init();
    const inventory = Inventory.init();

    const game = new Game(player, board, commands, turn, inventory);
    game.setGameState('START');
    return game;
  }

  get isSkipMode(): boolean {
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

  setGameState(state: GameState): void {
    switch (state) {
      case 'START': {
        const sound = soundStore.startScreenBgm;
        soundManager.register(sound);
        break;
      }
      case 'PLAY': {
        const sound = soundStore.dungeonBgm;
        soundManager.register(sound);
        break;
      }
    }
    this.state = state;
  }

  proc(): void {
    this.turn.proc(this);
  }

  next(): void {
    this.setGameState('BRIDGE');
    this.board.next();
    this.player.spawn(this.board);
  }
}
