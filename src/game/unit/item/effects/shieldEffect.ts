import { animationManager, soundManager, soundStore } from 'game';
import { MagicAnimation } from 'game/animation';
import { Battle } from 'game/battle';
import { Board } from 'game/board';
import { Tile } from 'game/board/layer';
import { Corridor } from 'game/dungeon/corridor';
import { Actor, Condition, Player } from 'game/unit/actor';
import { RandomUtil } from 'game/util';

interface IShieldEffects {
  [key: string]: IShieldEffect;
}

export interface IShieldEffect {
  passive: (player: Player, board: Board) => void;
  onDamage: (player: Player, attacker: Actor, dmg: number) => void;
}

const ShieldEffects = (): IShieldEffects => {
  const nothing = {
    passive: () => {
      return;
    },
    onDamage: () => {
      return;
    },
  };

  const pickaxe = {
    onAttack: (player: Player, board: Board) => {
      const x = player.next.x;
      const y = player.next.y;
      const tile = board.dungeonLayer.tileAt(x, y);
      if (tile === Tile.BLOCK) {
        const corridor = Corridor.generate(x, y);
        board.dungeon.corridors.push(corridor);
        board.dungeonLayer.putAt(Tile.CORRIDOR, x, y);
      }
    },
    onDamage: () => {
      return;
    },
  };

  return {
    WOODEN_SHIELD: nothing,
    IRON_SHIELD: nothing,
    KINGHT_SHIELD: nothing,
    HEAVY_SHIELD: nothing,
    SILVER_SHIELD: nothing,
    PHANTASM_SHIELD: nothing,
  };
};

export const shieldEffects = ShieldEffects();
