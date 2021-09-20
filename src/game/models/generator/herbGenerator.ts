import {
  AntidoteHerb,
  ConfusionHerb,
  DragonHerb,
  FortuneSeed,
  GreenHerb,
  Herb,
  LifeHerb,
  PoisonHerb,
  SightHerb,
  SleepyHerb,
  StomachExpander,
  StomachShrinker,
  SuperHerb,
  UnfortuneSeed,
  Weed,
} from '../game/item';
import { itemDataStore } from '../store/itemDataStore';

export class HerbGenerator {
  static generate(): Herb {
    const herbName = itemDataStore.getHerbNameRandomly();
    let herb: Herb;
    switch (herbName) {
      case 'GreenHerb':
        herb = GreenHerb.generate();
        break;
      case 'SuperHerb':
        herb = SuperHerb.generate();
        break;
      case 'PoisonHerb':
        herb = PoisonHerb.generate();
        break;
      case 'ConfusionHerb':
        herb = ConfusionHerb.generate();
        break;
      case 'SleepyHerb':
        herb = SleepyHerb.generate();
        break;
      case 'FortuneSeed':
        herb = FortuneSeed.generate();
        break;
      case 'UnfortuneSeed':
        herb = UnfortuneSeed.generate();
        break;
      case 'StomacExpander':
        herb = StomachExpander.generate();
        break;
      case 'StomachShrinker':
        herb = StomachShrinker.generate();
        break;
      case 'LifeHerb':
        herb = LifeHerb.generate();
        break;
      case 'SightHerb':
        herb = SightHerb.generate();
        break;
      case 'AntidoteHerb':
        herb = AntidoteHerb.generate();
        break;
      case 'DragonHerb':
        herb = DragonHerb.generate();
        break;
      case 'Weed':
        herb = Weed.generate();
        break;
      default:
        throw new Error(`Invalid Id: ${herbName}`);
        break;
    }

    return herb;
  }
}
