import { Asset } from 'asset/asset';
import { Image } from 'p5';

interface ActorImages {
  readonly player: Image[];
  readonly healer: Image[];
  readonly blacksmith: Image[];
  readonly priestess: Image[];
  readonly chef: Image[];
  readonly dragon1: Image[];
  readonly dragon2: Image[];
  readonly dragon3: Image[];
  readonly darkKnight: Image[];
  readonly insector1: Image[];
  readonly insector2: Image[];
  readonly insector3: Image[];
  readonly werewolf1: Image[];
  readonly werewolf2: Image[];
  readonly werewolf3: Image[];
  readonly golem1: Image[];
  readonly golem2: Image[];
  readonly golem3: Image[];
  readonly tatsunoko1: Image[];
  readonly tatsunoko2: Image[];
  readonly tatsunoko3: Image[];
  readonly mofumofu1: Image[];
  readonly mofumofu2: Image[];
  readonly shadow: Image[];
  readonly manticore: Image[];
  readonly griffin1: Image[];
  readonly griffin2: Image[];
  readonly griffin3: Image[];
  readonly pegasus1: Image[];
  readonly pegasus2: Image[];
  readonly goblin1: Image[];
  readonly goblin2: Image[];
  readonly pigMaid1: Image[];
  readonly pigMaid2: Image[];
  readonly pigMaid3: Image[];
  readonly maskedSoldier1: Image[];
  readonly maskedSoldier2: Image[];
  readonly boss: Image[];
}

interface ItemImages {
  readonly sword: EquipmentImages;
  readonly shield: EquipmentImages;
  readonly bracelet: Image;
  readonly gold: Image;
  readonly staff: Image;
  readonly scroll: Image;
  readonly bread: Image;
  readonly herb: Image;
  readonly pot: Image;
}

interface EquipmentImages {
  readonly [key: string]: Image;
}

interface TrapImages {
  readonly landMine: Image;
  readonly hunger: Image;
  readonly poison: Image;
  readonly sleep: Image;
  readonly rockSlide: Image;
  readonly spin: Image;
  readonly strip: Image;
  readonly summon: Image;
  readonly warp: Image;
  readonly multiplication: Image;
}

interface MapImages {
  readonly roomA: Image[];
  readonly roomB: Image[];
  readonly roomC: Image[];
  readonly roomD: Image[];
  readonly exit: Image;
}

interface ConditionImages {
  readonly poisoned: Image;
  readonly confused: Image;
  readonly paralyzed: Image;
  readonly asleep: Image;
  readonly blinded: Image;
  readonly sealed: Image;
  readonly enhanced: Image;
}

interface EffectImages {
  readonly spelling: Image[];
  readonly magicBullet: Image[];
  readonly slash: Image[];
  readonly fang: Image[];
  readonly bite: Image[];
  readonly stamp: Image[];
  readonly panch: Image[];
  readonly pierce: Image[];
  readonly fire: Image[];
  readonly ice: Image[];
  readonly thunder: Image[];
  readonly healing: Image[];
  readonly blastwave: Image[];
  readonly rockSlide: Image[];
  readonly explosion: Image[];
  readonly heart: Image[];
  readonly magicCircle: Image[];
}

interface IImageStore {
  readonly bg: Image;
  readonly shootingStar: Image[];
  readonly actors: ActorImages;
  readonly items: ItemImages;
  readonly traps: TrapImages;
  readonly maps: MapImages;
  readonly conditions: ConditionImages;
  readonly effects: EffectImages;
}

export class ImageStore implements IImageStore {
  constructor(
    readonly bg: Image,
    readonly shootingStar: Image[],
    readonly actors: ActorImages,
    readonly items: ItemImages,
    readonly traps: TrapImages,
    readonly maps: MapImages,
    readonly conditions: ConditionImages,
    readonly effects: EffectImages
  ) {}

  static init(asset: Asset): ImageStore {
    const bg = asset.imageFiles.bg;
    const shootingStar = parseImage(
      asset.imageFiles.shootingStar,
      5,
      4,
      192,
      192
    );
    const actors = this.parseActors(asset);
    const items = this.parseItems(asset);
    const traps = this.initTraps(asset);
    const map = this.parseMaps(asset);
    const conditions = this.parseConditions(asset);
    const effects = this.parseEffects(asset);

    return new ImageStore(
      bg,
      shootingStar,
      actors,
      items,
      traps,
      map,
      conditions,
      effects
    );
  }

  static parseActors(asset: Asset): ActorImages {
    const imgs = asset.imageFiles;
    const player = parseImage(imgs.player, 3, 5, 64, 64);
    const healer = parseImage(imgs.healer, 3, 5, 64, 64);
    const blacksmith = parseImage(imgs.blacksmith, 3, 5, 64, 64);
    const priestess = parseImage(imgs.priestess, 3, 5, 64, 64);
    const chef = parseImage(imgs.chef, 3, 5, 64, 64);
    const dragon1 = parseImage(imgs.dragon01, 3, 4, 80, 64);
    const dragon2 = parseImage(imgs.dragon02, 3, 4, 80, 64);
    const dragon3 = parseImage(imgs.dragon03, 3, 4, 80, 64);
    const darkKnight = parseImage(imgs.darkKnight, 3, 4, 60, 70);
    const insector1 = parseImage(imgs.insector01, 3, 4, 41, 36);
    const insector2 = parseImage(imgs.insector02, 3, 4, 41, 36);
    const insector3 = parseImage(imgs.insector03, 3, 4, 41, 36);
    const werewolf1 = parseImage(imgs.wolf01, 3, 4, 61, 47);
    const werewolf2 = parseImage(imgs.wolf02, 3, 4, 61, 47);
    const werewolf3 = parseImage(imgs.wolf03, 3, 4, 61, 47);
    const golem1 = parseImage(imgs.golem01, 3, 4, 42, 42);
    const golem2 = parseImage(imgs.golem02, 3, 4, 42, 42);
    const golem3 = parseImage(imgs.golem03, 3, 4, 42, 42);
    const tatsunoko1 = parseImage(imgs.tatsunoko01, 3, 4, 42, 42);
    const tatsunoko2 = parseImage(imgs.tatsunoko02, 3, 4, 42, 42);
    const tatsunoko3 = parseImage(imgs.tatsunoko03, 3, 4, 42, 42);
    const mofumofu1 = parseImage(imgs.mofumofu01, 3, 4, 72, 72);
    const mofumofu2 = parseImage(imgs.mofumofu02, 3, 4, 72, 72);
    const shadow = parseImage(imgs.shadow, 3, 4, 60, 60);
    const manticore = parseImage(imgs.manticore, 3, 4, 64, 64);
    const griffin1 = parseImage(imgs.griffin01, 3, 4, 45, 50);
    const griffin2 = parseImage(imgs.griffin02, 3, 4, 45, 50);
    const griffin3 = parseImage(imgs.griffin03, 3, 4, 45, 50);
    const pegasus1 = parseImage(imgs.pegasus01, 3, 4, 67, 47);
    const pegasus2 = parseImage(imgs.pegasus02, 3, 4, 67, 47);
    const goblin1 = parseImage(imgs.goblin01, 3, 4, 32, 32);
    const goblin2 = parseImage(imgs.goblin02, 3, 4, 32, 32);
    const pigMaid1 = parseImage(imgs.pigMaid01, 3, 4, 32, 32);
    const pigMaid2 = parseImage(imgs.pigMaid02, 3, 4, 32, 32);
    const pigMaid3 = parseImage(imgs.pigMaid03, 3, 4, 32, 32);
    const maskedSoldier1 = parseImage(imgs.soldier01, 3, 4, 32, 32);
    const maskedSoldier2 = parseImage(imgs.soldier02, 3, 4, 32, 32);
    const boss = parseImage(imgs.boss, 3, 4, 100, 70);

    return {
      player: player,
      healer: healer,
      blacksmith: blacksmith,
      priestess: priestess,
      chef: chef,
      dragon1: dragon1,
      dragon2: dragon2,
      dragon3: dragon3,
      darkKnight: darkKnight,
      insector1: insector1,
      insector2: insector2,
      insector3: insector3,
      werewolf1: werewolf1,
      werewolf2: werewolf2,
      werewolf3: werewolf3,
      golem1: golem1,
      golem2: golem2,
      golem3: golem3,
      tatsunoko1: tatsunoko1,
      tatsunoko2: tatsunoko2,
      tatsunoko3: tatsunoko3,
      mofumofu1: mofumofu1,
      mofumofu2: mofumofu2,
      shadow: shadow,
      manticore: manticore,
      griffin1: griffin1,
      griffin2: griffin2,
      griffin3: griffin3,
      pegasus1: pegasus1,
      pegasus2: pegasus2,
      goblin1: goblin1,
      goblin2: goblin2,
      pigMaid1: pigMaid1,
      pigMaid2: pigMaid2,
      pigMaid3: pigMaid3,
      maskedSoldier1: maskedSoldier1,
      maskedSoldier2: maskedSoldier2,
      boss: boss,
    };
  }

  static parseItems(asset: Asset): ItemImages {
    const imgs = asset.imageFiles;
    const iconSize = 24;
    const icon01 = parseImage(imgs.icons01, 12, 8, iconSize, iconSize);
    const icon02 = parseImage(imgs.icons02, 12, 8, iconSize, iconSize);
    const icon03 = parseImage(imgs.icons03, 12, 6, iconSize, iconSize);

    const swordImgs = {
      PICKAXE: icon01[81],
      CLUB: icon02[13],
      ASSASSINS_DAGGER: icon03[49],
      IRON_SWORD: icon02[1],
      RAPIER: icon02[2],
      TRIDENT: icon02[4],
      KAMAITACHI: icon02[8],
      GREAT_AXE: icon02[5],
      DRAGON_KILLER: icon02[9],
      MIRACLE_SWORD: icon03[52],
      THUNDER_SWORD: icon03[53],
      HYPERNOVA_SWORD: icon03[48],
    };

    const shieldImgs = {
      WOODEN_SHIELD: icon01[92],
      IRON_SHIELD: icon02[48],
      KINGHT_SHIELD: icon03[57],
      HEAVY_SHIELD: icon03[58],
      SILVER_SHIELD: icon02[49],
      PHANTASM_SHIELD: icon03[59],
    };

    return {
      sword: swordImgs,
      shield: shieldImgs,
      bracelet: icon02[53],
      gold: icon03[1],
      staff: icon02[19],
      scroll: icon01[47],
      bread: icon01[67],
      herb: icon02[70],
      pot: icon02[65],
    };
  }

  static initTraps(asset: Asset): TrapImages {
    const imgs = asset.imageFiles;
    const iconSize = 24;
    const icon01 = parseImage(imgs.icons01, 12, 8, iconSize, iconSize);
    const icon02 = parseImage(imgs.icons02, 12, 8, iconSize, iconSize);
    // const icon03 = parseImage(imgs.icons03, 12, 6, iconSize, iconSize);
    return {
      landMine: icon01[83],
      hunger: icon01[2],
      poison: icon02[63],
      sleep: icon01[17],
      rockSlide: icon01[8],
      spin: icon01[16],
      strip: icon01[36],
      summon: icon02[88],
      warp: icon01[53],
      multiplication: icon02[95],
    };
  }

  static parseMaps(asset: Asset): MapImages {
    const imgs = asset.imageFiles;

    const roomA = parseImage(imgs.roomA, 3, 4, 32, 32);
    const roomB = parseImage(imgs.roomB, 3, 4, 32, 32);
    const roomC = parseImage(imgs.roomC, 3, 4, 32, 32);
    const roomD = parseImage(imgs.roomD, 3, 4, 32, 32);
    const exit = imgs.exit;

    return {
      roomA: roomA,
      roomB: roomB,
      roomC: roomC,
      roomD: roomD,
      exit: exit,
    };
  }

  static parseConditions(asset: Asset): ConditionImages {
    const imgs = asset.imageFiles;
    const iconSize = 24;
    const icon = parseImage(imgs.icons03, 12, 6, iconSize, iconSize);

    return {
      poisoned: icon[18],
      confused: icon[21],
      paralyzed: icon[23],
      asleep: icon[22],
      blinded: icon[19],
      sealed: icon[20],
      enhanced: icon[24],
    };
  }

  static parseEffects(asset: Asset): EffectImages {
    const imgs = asset.imageFiles;
    const spelling = parseImage(imgs.spelling, 1, 7, 320, 120);
    const magicBullet = parseImage(imgs.magicBullet, 12, 1, 210, 210);
    const slash = parseImage(imgs.slash, 5, 1, 240, 240);
    const fang = parseImage(imgs.fang, 5, 1, 192, 192);
    const bite = parseImage(imgs.bite, 5, 1, 120, 240);
    const stamp = parseImage(imgs.stamp, 7, 1, 120, 120);
    const panch = parseImage(imgs.panch, 9, 1, 120, 120);
    const pierce = parseImage(imgs.pierce, 7, 1, 120, 120);
    const fire = parseImage(imgs.fire, 8, 1, 240, 240);
    const ice = parseImage(imgs.ice, 8, 1, 240, 240);
    const thunder = parseImage(imgs.thunder, 8, 1, 240, 240);
    const healing = parseImage(imgs.healing, 8, 1, 240, 240);
    const blastwave = parseImage(imgs.blastwave, 1, 8, 640, 240);
    const rockSlide = parseImage(imgs.rockSlide, 8, 1, 240, 240);
    const explosion = parseImage(imgs.explosion, 7, 1, 240, 240);
    const heart = parseImage(imgs.heart, 8, 1, 240, 240);
    const magicCircle = parseImage(imgs.magicCircle, 11, 1, 480, 480);

    return {
      spelling: spelling,
      magicBullet: magicBullet,
      slash: slash,
      fang: fang,
      bite: bite,
      stamp: stamp,
      panch: panch,
      pierce: pierce,
      fire: fire,
      ice: ice,
      thunder: thunder,
      healing: healing,
      blastwave: blastwave,
      rockSlide: rockSlide,
      explosion: explosion,
      heart: heart,
      magicCircle: magicCircle,
    };
  }
}

const parseImage = (
  baseImage: Image,
  nw: number,
  nh: number,
  sw: number,
  sh: number
): Image[] => {
  const images: Image[] = [];

  for (let i = 0; i < nh; i++) {
    for (let j = 0; j < nw; j++) {
      images.push(baseImage.get(j * sw, i * sh, sw, sh));
    }
  }

  return images;
};
