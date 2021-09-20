import { Condition, Player } from 'game/models/actor';

const FoodEffects = () => {
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
    bread,
    bigBread,
    giantBread,
    rottenBread,
  };
};

export const foodEffects = FoodEffects();
