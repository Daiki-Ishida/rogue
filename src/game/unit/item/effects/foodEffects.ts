import { Condition, Player } from 'game/unit/actor';

interface FoodEffectProps {
  [key: string]: (user: Player) => void;
}

const FoodEffects = (): FoodEffectProps => {
  const bread = (user: Player): void => {
    user.status.maxFullness += 1;
  };

  const bigBread = (user: Player): void => {
    user.status.maxFullness += 2;
  };

  const giantBread = (user: Player): void => {
    user.status.maxFullness += 5;
  };

  const rottenBread = (user: Player): void => {
    const poison = Condition.ofPoison(20);
    user.conditions.push(poison);
  };

  return {
    BREAD: bread,
    BIG_BREAD: bigBread,
    GIANT_BREAD: giantBread,
    ROTTEN_BREAD: rottenBread,
  };
};

export const foodEffects = FoodEffects();
