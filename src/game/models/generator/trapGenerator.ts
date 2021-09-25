import { trapDataStore } from 'game/store';

export class TrapGenerator {
  static generate(): void {
    const name = trapDataStore.getTrapNameRandomly();
    console.log(name);
    // let trap: Trap;
    // switch (name) {
    //   case 'LANDMINE':
    //     trap = LandmineTrap.generate();
    //     break;
    //   case 'HUNGER':
    //     trap = HungerTrap.generate();
    //     break;
    //   case 'ROCK_SLIDE':
    //     trap = RockSlideTrap.generate();
    //     break;
    //   case 'POISON':
    //     trap = PoisonTrap.generate();
    //     break;
    //   case 'SLEEP':
    //     trap = SleepTrap.generate();
    //     break;
    //   case 'SPIN':
    //     trap = SpinTrap.generate();
    //     break;
    //   case 'STRIP':
    //     trap = StripTrap.generate();
    //     break;
    //   case 'SUMMON':
    //     trap = SummonTrap.generate();
    //     break;
    //   case 'WARP':
    //     trap = WarpTrap.generate();
    //     break;
    //   case 'MULTIPLICATION':
    //     trap = MultiplicationTrap.generate();
    //     break;
    //   default:
    //     throw new Error('something went wrong...');
    // }
    // return trap;
  }
}
