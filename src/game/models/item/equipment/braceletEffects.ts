import { Board } from 'game/board';
import { Condition, Player } from 'game/models/actor';

const BraceletEffects = () => {
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

  return {
    antiConfusion,
    antiPoison,
    protection,
    strengthen,
    scout,
    autoIdentify,
    trapMaster,
    fortune,
    heal,
    warp,
  };
};

export const braceletEffects = BraceletEffects();
