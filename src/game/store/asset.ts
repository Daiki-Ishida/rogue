import p5, { Font, Image } from 'p5';
import FONT from './font/PixelMplus12-Regular.ttf';
import PLAYER_IMAGE from './image/player/player03.png';
import DRAGON_01 from './image/enemys/dragon_01.png';
import DRAGON_02 from './image/enemys/dragon_02.png';
import DRAGON_03 from './image/enemys/dragon_03.png';
import INSECTOR_01 from './image/enemys/insector_01.png';
import INSECTOR_02 from './image/enemys/insector_02.png';
import INSECTOR_03 from './image/enemys/insector_03.png';
import WOLF_01 from './image/enemys/wolf_01.png';
import WOLF_02 from './image/enemys/wolf_02.png';
import WOLF_03 from './image/enemys/wolf_03.png';
import PIG_MAID_01 from './image/enemys/pig_maid_01.png';
import PIG_MAID_02 from './image/enemys/pig_maid_02.png';
import PIG_MAID_03 from './image/enemys/pig_maid_03.png';
import GOLEM_01 from './image/enemys/golem_01.png';
import GOLEM_02 from './image/enemys/golem_02.png';
import GOLEM_03 from './image/enemys/golem_03.png';
import GRIFFIN_01 from './image/enemys/griffin_01.png';
import GRIFFIN_02 from './image/enemys/griffin_02.png';
import GRIFFIN_03 from './image/enemys/griffin_03.png';
import TATSUNOKO_01 from './image/enemys/tatsunoko_01.png';
import TATSUNOKO_02 from './image/enemys/tatsunoko_02.png';
import TATSUNOKO_03 from './image/enemys/tatsunoko_03.png';
import GOBLIN_01 from './image/enemys/goblin_01.png';
import GOBLIN_02 from './image/enemys/goblin_02.png';
import MOFUMOFU_01 from './image/enemys/mofumofu_01.png';
import MOFUMOFU_02 from './image/enemys/mofumofu_02.png';
import SOLDIER_01 from './image/enemys/soldier_01.png';
import SOLDIER_02 from './image/enemys/soldier_02.png';
import PEGASUS_01 from './image/enemys/pegasus_01.png';
import PEGASUS_02 from './image/enemys/pegasus_02.png';
import SHADOW from './image/enemys/shadow.png';
import MANTICORE from './image/enemys/manticore.png';
import DARK_KNIGHT from './image/enemys/dark_knight.png';
import MAP_BASE from './image/dungeon/map_base.png';
import MAP_CHIP_1 from './image/dungeon/map_chip_01.png';
import MAP_CHIP_2 from './image/dungeon/map_chip_02.png';
import MAP_CHIP_3 from './image/dungeon/map_chip_03.png';
import MAP_CHIP_4 from './image/dungeon/map_chip_04.png';
import ICONS_1 from './image/icons/icon01.png';
import ICONS_2 from './image/icons/icon02.png';
import ICONS_3 from './image/icons/icon03.png';
import SLASH from './image/effects/slash.png';
import FANG from './image/effects/fang.png';
import PIERCE from './image/effects/pierce.png';
import SPELL from './image/effects/magic_circle.png';
import FIRE from './image/effects/fire.png';
import MAGIC_BALL from './image/effects/magic_ball.png';
import ATTACK_SOUND from './sound/attack.mp3';
import CRITICAL_HIT_SOUND from './sound/critical_hit.mp3';
import MISS_SOUND from './sound/miss.mp3';
import MAGIC_SOUND from './sound/magic.mp3';
import EQUIP_SOUND from './sound/equip.mp3';
import PICK_UP_SOUND from './sound/pick_up.mp3';
import EXIT_SOUND from './sound/exit.mp3';
import SELECT_SOUND from './sound/select.mp3';
import LEVEL_UP_SOUND from './sound/level_up.mp3';

interface ImageFiles {
  mapBase: Image;
  map01: Image;
  map02: Image;
  map03: Image;
  map04: Image;
  player: Image;
  dragon01: Image;
  dragon02: Image;
  dragon03: Image;
  insector01: Image;
  insector02: Image;
  insector03: Image;
  wolf01: Image;
  wolf02: Image;
  wolf03: Image;
  golem01: Image;
  golem02: Image;
  golem03: Image;
  tatsunoko01: Image;
  tatsunoko02: Image;
  tatsunoko03: Image;
  griffin01: Image;
  griffin02: Image;
  griffin03: Image;
  pigMaid01: Image;
  pigMaid02: Image;
  pigMaid03: Image;
  goblin01: Image;
  goblin02: Image;
  mofumofu01: Image;
  mofumofu02: Image;
  pegasus01: Image;
  pegasus02: Image;
  soldier01: Image;
  soldier02: Image;
  shadow: Image;
  manticore: Image;
  darkKnight: Image;
  icons01: Image;
  icons02: Image;
  icons03: Image;
  attack01: Image;
  attack02: Image;
  attack03: Image;
  spelling: Image;
  fire: Image;
  magicBall: Image;
}

interface SoundFiles {
  attack: HTMLAudioElement;
  criticalHit: HTMLAudioElement;
  missHit: HTMLAudioElement;
  magic: HTMLAudioElement;
  equip: HTMLAudioElement;
  pickUp: HTMLAudioElement;
  exit: HTMLAudioElement;
  select: HTMLAudioElement;
  levelUp: HTMLAudioElement;
}

export class Asset {
  constructor(
    readonly font: Font,
    readonly imageFiles: ImageFiles,
    readonly soundFiles: SoundFiles
  ) {
    this.font = font;
    this.imageFiles = imageFiles;
    this.soundFiles = soundFiles;
  }

  static preload(p: p5): Asset {
    const font = p.loadFont(FONT);

    const playerImg = p.loadImage(PLAYER_IMAGE);

    const dragon01 = p.loadImage(DRAGON_01);
    const dragon02 = p.loadImage(DRAGON_02);
    const dragon03 = p.loadImage(DRAGON_03);

    const wolf01 = p.loadImage(WOLF_01);
    const wolf02 = p.loadImage(WOLF_02);
    const wolf03 = p.loadImage(WOLF_03);

    const insector01 = p.loadImage(INSECTOR_01);
    const insector02 = p.loadImage(INSECTOR_02);
    const insector03 = p.loadImage(INSECTOR_03);

    const golem01 = p.loadImage(GOLEM_01);
    const golem02 = p.loadImage(GOLEM_02);
    const golem03 = p.loadImage(GOLEM_03);

    const griffin01 = p.loadImage(GRIFFIN_01);
    const griffin02 = p.loadImage(GRIFFIN_02);
    const griffin03 = p.loadImage(GRIFFIN_03);

    const tatsunoko01 = p.loadImage(TATSUNOKO_01);
    const tatsunoko02 = p.loadImage(TATSUNOKO_02);
    const tatsunoko03 = p.loadImage(TATSUNOKO_03);

    const pigMaid01 = p.loadImage(PIG_MAID_01);
    const pigMaid02 = p.loadImage(PIG_MAID_02);
    const pigMaid03 = p.loadImage(PIG_MAID_03);

    const goblin01 = p.loadImage(GOBLIN_01);
    const goblin02 = p.loadImage(GOBLIN_02);

    const mofumofu01 = p.loadImage(MOFUMOFU_01);
    const mofumofu02 = p.loadImage(MOFUMOFU_02);

    const soldier01 = p.loadImage(SOLDIER_01);
    const soldier02 = p.loadImage(SOLDIER_02);

    const pegasus01 = p.loadImage(PEGASUS_01);
    const pegasus02 = p.loadImage(PEGASUS_02);

    const shadow = p.loadImage(SHADOW);
    const manticore = p.loadImage(MANTICORE);
    const darkKnight = p.loadImage(DARK_KNIGHT);

    const mapBase = p.loadImage(MAP_BASE);
    const mapChip1 = p.loadImage(MAP_CHIP_1);
    const mapChip2 = p.loadImage(MAP_CHIP_2);
    const mapChip3 = p.loadImage(MAP_CHIP_3);
    const mapChip4 = p.loadImage(MAP_CHIP_4);

    const icons1 = p.loadImage(ICONS_1);
    const icons2 = p.loadImage(ICONS_2);
    const icons3 = p.loadImage(ICONS_3);

    const slash = p.loadImage(SLASH);
    const fang = p.loadImage(FANG);
    const pierce = p.loadImage(PIERCE);
    const spell = p.loadImage(SPELL);
    const fire = p.loadImage(FIRE);
    const magicBall = p.loadImage(MAGIC_BALL);

    const imageFiles = {
      mapBase: mapBase,
      map01: mapChip1,
      map02: mapChip2,
      map03: mapChip3,
      map04: mapChip4,
      player: playerImg,
      dragon01: dragon01,
      dragon02: dragon02,
      dragon03: dragon03,
      insector01: insector01,
      insector02: insector02,
      insector03: insector03,
      wolf01: wolf01,
      wolf02: wolf02,
      wolf03: wolf03,
      golem01: golem01,
      golem02: golem02,
      golem03: golem03,
      tatsunoko01: tatsunoko01,
      tatsunoko02: tatsunoko02,
      tatsunoko03: tatsunoko03,
      griffin01: griffin01,
      griffin02: griffin02,
      griffin03: griffin03,
      pigMaid01: pigMaid01,
      pigMaid02: pigMaid02,
      pigMaid03: pigMaid03,
      goblin01: goblin01,
      goblin02: goblin02,
      mofumofu01: mofumofu01,
      mofumofu02: mofumofu02,
      pegasus01: pegasus01,
      pegasus02: pegasus02,
      soldier01: soldier01,
      soldier02: soldier02,
      shadow: shadow,
      manticore: manticore,
      darkKnight: darkKnight,
      icons01: icons1,
      icons02: icons2,
      icons03: icons3,
      attack01: slash,
      attack02: fang,
      attack03: pierce,
      spelling: spell,
      fire: fire,
      magicBall: magicBall,
    };

    const soundFiles = {
      attack: new Audio(ATTACK_SOUND),
      criticalHit: new Audio(CRITICAL_HIT_SOUND),
      missHit: new Audio(MISS_SOUND),
      magic: new Audio(MAGIC_SOUND),
      equip: new Audio(EQUIP_SOUND),
      pickUp: new Audio(PICK_UP_SOUND),
      exit: new Audio(EXIT_SOUND),
      select: new Audio(SELECT_SOUND),
      levelUp: new Audio(LEVEL_UP_SOUND),
    };

    return new Asset(font, imageFiles, soundFiles);
  }
}
