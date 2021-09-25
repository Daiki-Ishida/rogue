import { Asset } from 'asset/asset';
import { Image } from 'p5';

interface ActorImages {
  readonly player: Image[];
  readonly dragon: Image[];
  readonly darkKnight: Image[];
  readonly insector: Image[];
  readonly werewolf: Image[];
  readonly golem: Image[];
  readonly tatsunoko: Image[];
  readonly mofumofu: Image[];
  readonly shadow: Image[];
  readonly manticore: Image[];
  readonly griffin: Image[];
  readonly pegasus: Image[];
  readonly goblin: Image[];
  readonly pigMaid: Image[];
  readonly maskedSoldier: Image[];
}

interface ItemImages {
  readonly sward: Image;
  readonly shield: Image;
  readonly bracelet: Image;
  readonly gold: Image;
  readonly staff: Image;
  readonly scroll: Image;
  readonly bread: Image;
  readonly herb: Image;
  readonly pot: Image;
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
  readonly mapBase: Image;
  readonly roomEdge: Image[];
  readonly roomSide: Image[];
  readonly roomInside: Image[];
  readonly wallEdge: Image[];
  readonly wallSide: Image[];
  readonly corridor: Image[];
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
  readonly magicBall: Image[];
  readonly slash: Image[];
  readonly fang: Image[];
  readonly pierce: Image[];
  readonly fire: Image[];
}

interface IImageStore {
  readonly actors: ActorImages;
  readonly items: ItemImages;
  readonly traps: TrapImages;
  readonly maps: MapImages;
  readonly conditions: ConditionImages;
  readonly effects: EffectImages;
}

export class ImageStore implements IImageStore {
  constructor(
    readonly actors: ActorImages,
    readonly items: ItemImages,
    readonly traps: TrapImages,
    readonly maps: MapImages,
    readonly conditions: ConditionImages,
    readonly effects: EffectImages
  ) {}

  static init(asset: Asset): ImageStore {
    const actors = this.parseActors(asset);
    const items = this.parseItems(asset);
    const traps = this.initTraps(asset);
    const map = this.parseMaps(asset);
    const conditions = this.parseConditions(asset);
    const effects = this.parseEffects(asset);

    return new ImageStore(actors, items, traps, map, conditions, effects);
  }

  static parseActors(asset: Asset): ActorImages {
    const imgs = asset.imageFiles;
    const player = parseImage(imgs.player, 3, 5, 64, 64);
    const dragon = parseImage(imgs.dragon01, 3, 4, 80, 64);
    const darkKnight = parseImage(imgs.darkKnight, 3, 4, 60, 70);
    const insector = parseImage(imgs.insector01, 3, 4, 41, 36);
    const werewolf = parseImage(imgs.wolf01, 3, 4, 61, 47);
    const golem = parseImage(imgs.golem01, 3, 4, 42, 42);
    const tatsunokoKnight = parseImage(imgs.tatsunoko01, 3, 4, 42, 42);
    const mofumofu = parseImage(imgs.mofumofu01, 3, 4, 72, 72);
    const shadow = parseImage(imgs.shadow, 3, 4, 60, 60);
    const manticore = parseImage(imgs.manticore, 3, 4, 64, 64);
    const griffin = parseImage(imgs.griffin01, 3, 4, 45, 50);
    const pegasus = parseImage(imgs.pegasus01, 3, 4, 67, 47);
    const goblin = parseImage(imgs.goblin01, 3, 4, 32, 32);
    const pigMaid = parseImage(imgs.pigMaid01, 3, 4, 32, 32);
    const maskedSoldier = parseImage(imgs.soldier01, 3, 4, 32, 32);

    return {
      player: player,
      dragon: dragon,
      darkKnight: darkKnight,
      insector: insector,
      werewolf: werewolf,
      golem: golem,
      tatsunoko: tatsunokoKnight,
      mofumofu: mofumofu,
      shadow: shadow,
      manticore: manticore,
      griffin: griffin,
      pegasus: pegasus,
      goblin: goblin,
      pigMaid: pigMaid,
      maskedSoldier: maskedSoldier,
    };
  }

  static parseItems(asset: Asset): ItemImages {
    const imgs = asset.imageFiles;
    const iconSize = 24;
    const icon01 = parseImage(imgs.icons01, 12, 8, iconSize, iconSize);
    const icon02 = parseImage(imgs.icons02, 12, 8, iconSize, iconSize);
    const icon03 = parseImage(imgs.icons03, 12, 6, iconSize, iconSize);
    return {
      sward: icon02[25],
      shield: icon02[48],
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

    const dungeonSize = 16;

    const mapBase = imgs.mapBase;
    const { roomEdge, roomSide, roomInside } = parseRoom(
      imgs.map01,
      dungeonSize
    );
    const { wallEdge, wallSide } = parseWall(imgs.map02, dungeonSize);
    const corridor = parseImage(imgs.map03, 2, 3, dungeonSize, dungeonSize);
    const exit = imgs.map04;

    return {
      mapBase: mapBase,
      roomEdge: roomEdge,
      roomSide: roomSide,
      roomInside: roomInside,
      wallEdge: wallEdge,
      wallSide: wallSide,
      corridor: corridor,
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
    const magicBall = parseImage(imgs.magicBall, 12, 1, 240, 240);
    const slash = parseImage(imgs.attack01, 5, 1, 240, 240);
    const fang = parseImage(imgs.attack02, 5, 1, 192, 192);
    const pierce = parseImage(imgs.attack03, 7, 1, 120, 120);
    const fire = parseImage(imgs.fire, 8, 1, 120, 120);

    return {
      spelling: spelling,
      magicBall: magicBall,
      slash: slash,
      fang: fang,
      pierce: pierce,
      fire: fire,
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

const parseRoom = (
  baseImage: Image,
  size: number
): {
  roomEdge: Image[];
  roomSide: Image[];
  roomInside: Image[];
} => {
  const edge: Image[] = [];
  const side: Image[] = [];
  const inside: Image[] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      // 上の辺
      if (i === 0) {
        if (j === 0 || j === 3) {
          edge.push(baseImage.get(j * size, i * size, size, size));
        } else {
          side.push(baseImage.get(j * size, i * size, size, size));
        }
      } else if (i === 3) {
        if (j === 0 || j === 3) {
          edge.push(baseImage.get(j * size, i * size, size, size * 2));
        } else {
          side.push(baseImage.get(j * size, i * size, size, size * 2));
        }
      } else {
        if (j === 0 || j === 3) {
          side.push(baseImage.get(j * size, i * size, size, size));
        } else {
          inside.push(baseImage.get(j * size, i * size, size, size));
        }
      }
    }
  }

  return {
    roomEdge: edge,
    roomSide: side,
    roomInside: inside,
  };
};

const parseWall = (baseImage: Image, size: number) => {
  const edge: Image[] = [];
  const side: Image[] = [];
  const block: Image[] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 6; j++) {
      switch (i) {
        case 0:
          switch (j) {
            case 0:
            case 4:
              edge.push(baseImage.get(j * size, i * size, size * 2, size * 4));
              break;
            case 1:
            case 5:
              break;
            case 2:
            case 3:
              side.push(baseImage.get(j * size, i * size, size, size * 4));
              break;
          }
          break;
        case 1:
        case 2:
        case 3:
        case 7:
          break;
        case 4:
        case 5:
          switch (j) {
            case 0:
            case 4:
              side.push(baseImage.get(j * size, i * size, size * 2, size));
              break;
            case 1:
            case 5:
              break;
            case 2:
            case 3:
              block.push(baseImage.get(j * size, i * size, size, size));
              break;
          }
          break;
        case 6:
          switch (j) {
            case 0:
            case 4:
              edge.push(baseImage.get(j * size, i * size, size * 2, size * 2));
              break;
            case 1:
            case 5:
              break;
            case 2:
            case 3:
              side.push(baseImage.get(j * size, i * size, size, size * 2));
              break;
          }
          break;
      }
    }
  }

  return {
    wallEdge: edge,
    wallSide: side,
  };
};
