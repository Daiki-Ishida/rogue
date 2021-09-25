import { enemyDataStore } from 'game/store';

export class EnemyGenerator {
  static generate(level: number): void {
    const id = enemyDataStore.getEnemyIdInLevelRandomly(level);
    console.log(id);
    // switch (id) {
    //   case 'DRAGON_01':
    //   case 'DRAGON_02':
    //   case 'DRAGON_03':
    // enemy = Dragon.generate(id);
    // break;
    // case 'INSECTOR_01':
    // case 'INSECTOR_02':
    // case 'INSECTOR_03':
    //   enemy = Insector.generate();
    //   break;
    //   enemy = Insector.generate();
    //   break;
    //   enemy = Insector.generate();
    //   break;
    // case 'WEREWOLF_01':
    //   enemy = Werewolf.generate();
    //   break;
    // case 'WEREWOLF_02':
    //   enemy = Werewolf.generate();
    //   break;
    // case 'WEREWOLF_03':
    //   enemy = Werewolf.generate();
    //   break;
    // case 'GOLEM_01':
    //   enemy = Golem.generate();
    //   break;
    // case 'GOLEM_02':
    //   enemy = Golem.generate();
    //   break;
    // case 'GOLEM_03':
    //   enemy = Golem.generate();
    //   break;
    // case 'TATSUNOKO_01':
    //   enemy = Tatsunoko.generate();
    //   break;
    // case 'TATSUNOKO_02':
    //   enemy = Tatsunoko.generate();
    //   break;
    // case 'TATSUNOKO_03':
    //   enemy = Tatsunoko.generate();
    //   break;
    // case 'GRIFFIN_01':
    //   enemy = Griffin.generate();
    //   break;
    // case 'GRIFFIN_02':
    //   enemy = Griffin.generate();
    //   break;
    // case 'GRIFFIN_03':
    //   enemy = Griffin.generate();
    //   break;
    // case 'PIG_MAID_01':
    //   enemy = PigMaid.generate();
    //   break;
    // case 'PIG_MAID_02':
    //   enemy = PigMaid.generate();
    //   break;
    // case 'PIG_MAID_03':
    //   enemy = PigMaid.generate();
    //   break;
    // case 'GOBLIN_01':
    //   enemy = Goblin.generate();
    //   break;
    // case 'GOBLIN_02':
    //   enemy = Goblin.generate();
    //   break;
    // case 'MOFUMOFU_01':
    //   enemy = Mofumofu.generate();
    //   break;
    // case 'MOFUMOFU_02':
    //   enemy = Mofumofu.generate();
    //   break;
    // case 'SOLDIER_01':
    //   enemy = MaskedSoldier.generate();
    //   break;
    // case 'SOLDIER_02':
    //   enemy = MaskedSoldier.generate();
    //   break;
    // case 'PEGASUS_01':
    //   enemy = Pegasus.generate();
    //   break;
    // case 'PEGASUS_02':
    //   enemy = Pegasus.generate();
    //   break;
    // case 'SHADOW':
    //   enemy = Shadow.generate();
    //   break;
    // case 'MANTICORE':
    //   enemy = Manticore.generate();
    //   break;
    // case 'DARK_KNIGHT':
    //   enemy = DarkKnight.generate();
    //   break;
    //   default:
    //     throw new Error(`Enemy With Id ${id} Not Found.`);
    // }

    // return enemy;
  }
}
