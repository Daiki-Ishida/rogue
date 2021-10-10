import { savedata, soundManager, soundStore } from 'game';
import { Board } from './board';
import { Commands } from './command';
import { Inventory } from './inventory';
import { Player } from './unit/actor';
import { Turn } from './turn';
import { itemDataStore } from './store/itemDataStore';
import { ItemGenerator } from './unit/generator';

type PlayMode = 'NORMAL' | 'DASH' | 'STEP';
type GameState =
  | 'START'
  | 'SET_UP'
  | 'PROLOGUE'
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

    return new Game(player, board, commands, turn, inventory);
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
      case 'PROLOGUE': {
        const sound = soundStore.startScreenBgm;
        soundManager.register(sound);
        break;
      }
      case 'BRIDGE':
      case 'PLAY': {
        if (this.state !== 'PLAY' && this.state !== 'BRIDGE') {
          soundManager.deregisterBgm();
          const sound = soundStore.dungeonBgm;
          soundManager.register(sound);
        }
        break;
      }
    }
    this.state = state;
  }

  proc(): void {
    this.turn.proc(this);
  }

  next(): void {
    if (this.board.dungeon.level === 30) {
      alert('GAME CLEAR!');
      this.setGameState('START');
      return;
    }
    this.setGameState('BRIDGE');
    this.board.next();
    this.player.spawn(this.board);
  }

  save(): void {
    const data = {
      player: this.player.status,
      inventory: {
        items: this.inventory.items.map((i) => i.status),
      },
      game: {
        gold: this.gold,
        turn: this.turn.count,
        level: this.board.dungeon.level,
      },
      itemStatus: itemDataStore.itemStatus,
    };

    savedata.status = 'SAVED';
    savedata.data = data;
    this.setGameState('START');
  }

  load(data: any): void {
    itemDataStore.itemStatus = data.itemStatus;

    this.player.status.name = data.player.name;
    this.player.status.maxHp = data.player.maxHp;
    this.player.status.dmg = data.player.dmg;
    this.player.status.str = data.player.str;
    this.player.status.vit = data.player.vit;
    this.player.status.level = data.player.level;
    this.player.status.exp = data.player.exp;
    this.player.status.maxFullness = data.player.maxFullness;
    this.player.status.hunger = data.player.hunger;

    this.inventory.items = [];
    data.inventory.items.forEach((status: any) => {
      const item = ItemGenerator.load(status.category, status.id, this.board);

      item.status.identified = status.identified;

      if (item.isEquipment()) {
        item.status.equiped = status.equiped;
        item.status.cursed = status.cursed;
        if (item.isSword() || item.isShield()) {
          item.status.level = status.level;
        }

        if (item.status.equiped) {
          this.player.equip(item);
        }
      }

      if (item.isUsable() && item.isStaff()) {
        item.status.durability = status.durability;
      }

      this.inventory.add(item);
    });

    this.gold = data.game.gold;
    this.turn.count = data.game.turn;
    this.board.dungeon.level = data.game.level;

    this.setGameState('BRIDGE');
  }
}
