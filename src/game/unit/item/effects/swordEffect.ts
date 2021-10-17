import { animationManager, soundManager, soundStore } from 'game';
import { MagicAnimation } from 'game/animation';
import { Battle } from 'game/battle';
import { Board } from 'game/board';
import { Tile } from 'game/board/layer';
import { Corridor } from 'game/dungeon/corridor';
import { Actor, Condition, Player } from 'game/unit/actor';
import { RandomUtil } from 'game/util';

interface ISwordEffects {
  [key: string]: ISwordEffect;
}

export interface ISwordEffect {
  onAttack: (player: Player, board: Board) => void;
  onDamage: (player: Player, targer: Actor, dmg: number) => void;
}

const SwordEffects = (): ISwordEffects => {
  const nothing = {
    onAttack: () => {
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
        const corridor = Corridor.generate(x, y, board.dungeon.level);
        board.dungeon.corridors.push(corridor);
        board.dungeonLayer.putAt(Tile.CORRIDOR, x, y);
      }
    },
    onDamage: () => {
      return;
    },
  };

  const assassinsDagger = {
    onAttack: () => {
      return;
    },
    onDamage: (player: Player, targer: Actor) => {
      const r = RandomUtil.getRandomIntInclusive(0, 2);
      if (r !== 0) return;

      const condition = Condition.ofParalyzed(5);
      targer.conditions.push(condition);
    },
  };

  const kamaitachi = {
    onAttack: (player: Player, board: Board) => {
      const d = player.d.key;
      const next = player.next;
      let dl: { dx: number; dy: number };
      let dr: { dx: number; dy: number };
      switch (d) {
        case 'LEFT':
          dl = { dx: 0, dy: -1 };
          dr = { dx: 0, dy: 1 };
          break;
        case 'UP':
          dl = { dx: -1, dy: 0 };
          dr = { dx: 1, dy: 0 };
          break;
        case 'RIGHT':
          dl = { dx: 0, dy: 1 };
          dr = { dx: 0, dy: -1 };
          break;
        case 'DOWN':
          dl = { dx: 1, dy: 0 };
          dr = { dx: -1, dy: 0 };
          break;
      }

      const nextL = { x: next.x + dl.dx, y: next.y + dl.dy };
      const nextR = { x: next.x + dr.dx, y: next.y + dr.dy };

      const targetL = board.findActor(nextL.x, nextL.y);
      const targetR = board.findActor(nextR.x, nextR.y);

      if (targetL) {
        const battle = new Battle(player, targetL);
        battle.exec();
      }

      if (targetR) {
        const battle = new Battle(player, targetR);
        battle.exec();
      }
    },
    onDamage: () => {
      return;
    },
  };

  const miracleSword = {
    onAttack: () => {
      return;
    },
    onDamage: (player: Player, targer: Actor, dmg: number) => {
      const value = Math.floor(dmg / 2);
      player.heal(value);
    },
  };

  const thunderSword = {
    onAttack: (player: Player, board: Board) => {
      // sound
      soundManager.register(soundStore.thunder);

      const x = player.next.x;
      const y = player.next.y;

      const callback = () => {
        const target = board.findActor(x, y);
        if (target === undefined) return;
        target.damage(20);
      };

      // animation
      const animation = MagicAnimation.ofThunder(x, y, callback);
      animationManager.push(animation);
    },
    onDamage: () => {
      return;
    },
  };

  return {
    PICKAXE: pickaxe,
    CLUB: nothing,
    ASSASSINS_DAGGER: assassinsDagger,
    IRON_SWORD: nothing,
    RAPIER: nothing,
    TRIDENT: nothing,
    KAMAITACHI: kamaitachi,
    GREAT_AXE: nothing,
    DRAGON_KILLER: pickaxe,
    MIRACLE_SWORD: miracleSword,
    THUNDER_SWORD: thunderSword,
    HYPERNOVA_SWORD: nothing,
  };
};

export const swordEffects = SwordEffects();
