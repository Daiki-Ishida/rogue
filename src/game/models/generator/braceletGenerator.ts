import {
  AntiConfusionBracelet,
  AntiPoisonBracelet,
  BraceletOfItemDetector,
  BraceletOfTrapMaster,
  FortuneBracelet,
  HealBracelet,
  MonsterSummonerBracelet,
  ProtectionBracelet,
  ScoutBracelet,
  StrengthBracelet,
  TrapBracelet,
  WarpBracelet,
} from '../game/item/equipment/bracelet';
import { Bracelet } from '../game/item/equipment/iEquipment';
import { itemDataStore } from '../store/itemDataStore';

export class BraceletGenerator {
  static generate(): Bracelet {
    const name = itemDataStore.getBraceletNameRandomly();
    let bracelet: Bracelet;
    switch (name) {
      case 'AntiConfusionBracelet':
        bracelet = AntiConfusionBracelet.generate();
        break;
      case 'AntiPoisonBracelet':
        bracelet = AntiPoisonBracelet.generate();
        break;
      case 'BraceletOfItemDetector':
        bracelet = BraceletOfItemDetector.generate();
        break;
      case 'BraceletOfTrapMaster':
        bracelet = BraceletOfTrapMaster.generate();
        break;
      case 'FortuneBracelet':
        bracelet = FortuneBracelet.generate();
        break;
      case 'HealBracelet':
        bracelet = HealBracelet.generate();
        break;
      case 'MonsterSummonerBracelet':
        bracelet = MonsterSummonerBracelet.generate();
        break;
      case 'ProtectionBracelet':
        bracelet = ProtectionBracelet.generate();
        break;
      case 'ScoutBracelet':
        bracelet = ScoutBracelet.generate();
        break;
      case 'StrengthBracelet':
        bracelet = StrengthBracelet.generate();
        break;
      case 'TrapBracelet':
        bracelet = TrapBracelet.generate();
        break;
      case 'WarpBracelet':
        bracelet = WarpBracelet.generate();
        break;
      default:
        throw new Error(`Bracelet named ${name} is not found.`);
        break;
    }

    return bracelet;
  }
}
