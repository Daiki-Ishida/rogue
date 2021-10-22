import { Board } from 'game/board';
import { Condition, Player } from 'game/unit/actor';
import { EnemyGenerator, TrapGenerator } from 'game/unit/generator';
import { RandomUtil } from 'game/util';

interface IBraceletEffects {
  [key: string]: (player: Player, board: Board) => void;
}

const BraceletEffects = (): IBraceletEffects => {
  const antiConfusion = (player: Player): void => {
    const condition = Condition.ofAntiConfusion(1);
    player.conditions.push(condition);
  };

  const antiPoison = (player: Player): void => {
    const condition = Condition.ofPoisonFree(1);
    player.conditions.push(condition);
  };

  const autoIdentify = (player: Player): void => {
    const condition = Condition.ofAutoIdentify(1);
    player.conditions.push(condition);
  };

  const trapMaster = (player: Player): void => {
    const condition = Condition.ofTrapMaster(1);
    player.conditions.push(condition);
  };

  const protection = (player: Player): void => {
    const condition = Condition.ofProtection(1);
    player.conditions.push(condition);
  };

  const strengthen = (player: Player): void => {
    const condition = Condition.ofStrengthen(1);
    player.conditions.push(condition);
  };

  const scout = (player: Player): void => {
    const condition = Condition.ofClearSighted(1);
    player.conditions.push(condition);
  };

  const fortune = (player: Player): void => {
    player.gainExp(1);
  };

  const heal = (player: Player): void => {
    const HEAL_VALUE = 2;
    const HUNGER_VALUE = 1;

    player.heal(HEAL_VALUE);
    player.addHunger(HUNGER_VALUE);
  };

  const warp = (player: Player, board: Board): void => {
    const { x, y } = board.getRandomEmpty();
    player.setAt(x, y);
  };

  const trap = (player: Player, board: Board): void => {
    const random = RandomUtil.getRandomIntInclusive(0, 2);
    if (random === 0) {
      TrapGenerator.generate(1)[0].spawn(board);
    }
  };

  const monsterSummoner = (player: Player, board: Board): void => {
    const random = RandomUtil.getRandomIntInclusive(0, 2);
    if (random === 0) {
      EnemyGenerator.generate(1, board);
    }
  };

  return {
    ANTI_CONFUSION_BRACELET: antiConfusion,
    ANTI_POISON_BRACELET: antiPoison,
    PROTECTION_BRACELET: protection,
    STRENGTH_BRACELET: strengthen,
    SCOUT_BRACELET: scout,
    BRACELET_OF_ITEM_DETECTOR: autoIdentify,
    BRACELET_OF_TRAP_MASTER: trapMaster,
    FORTUNE_BRACELET: fortune,
    HEAL_BRACELET: heal,
    WARP_BRACELET: warp,
    TRAP_BRACELET: trap,
    MONSTER_SUMMONER_BRACELET: monsterSummoner,
  };
};

export const braceletEffects = BraceletEffects();
