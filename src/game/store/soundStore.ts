import { Asset } from 'asset/asset';
import { BackgroundSound, Sound, SoundEffect } from 'game/sounds';

interface IImageStore {
  readonly attack: Sound;
  readonly criticalHit: Sound;
  readonly missHit: Sound;
  readonly magic: Sound;
  readonly equip: Sound;
  readonly pickUp: Sound;
  readonly exit: Sound;
  readonly select: Sound;
  readonly levelUp: Sound;
  readonly levelDown: Sound;
  readonly fire: Sound;
  readonly ice: Sound;
  readonly thunder: Sound;
  readonly healing: Sound;
  readonly eating: Sound;
  readonly bridgeEffect: Sound;
  readonly startScreenBgm: Sound;
  readonly dungeonBgm: Sound;
}

export class SoundStore implements IImageStore {
  constructor(
    readonly attack: Sound,
    readonly criticalHit: Sound,
    readonly missHit: Sound,
    readonly magic: Sound,
    readonly equip: Sound,
    readonly pickUp: Sound,
    readonly exit: Sound,
    readonly select: Sound,
    readonly levelUp: Sound,
    readonly levelDown: Sound,
    readonly fire: Sound,
    readonly ice: Sound,
    readonly thunder: Sound,
    readonly healing: Sound,
    readonly eating: Sound,
    readonly bridgeEffect: Sound,
    readonly startScreenBgm: BackgroundSound,
    readonly dungeonBgm: BackgroundSound
  ) {}

  static init(asset: Asset): SoundStore {
    const attack = new SoundEffect(asset.soundFiles.attack);
    const criticalHit = new SoundEffect(asset.soundFiles.criticalHit);
    const missHit = new SoundEffect(asset.soundFiles.missHit);
    const magic = new SoundEffect(asset.soundFiles.magic);
    const equip = new SoundEffect(asset.soundFiles.equip);
    const pickUp = new SoundEffect(asset.soundFiles.pickUp);
    const exit = new SoundEffect(asset.soundFiles.exit);
    const select = new SoundEffect(asset.soundFiles.select);
    const levelUp = new SoundEffect(asset.soundFiles.levelUp);
    const levelDown = new SoundEffect(asset.soundFiles.levelDown);
    const fire = new SoundEffect(asset.soundFiles.fire);
    const ice = new SoundEffect(asset.soundFiles.ice);
    const thunder = new SoundEffect(asset.soundFiles.thunder);
    const healing = new SoundEffect(asset.soundFiles.healing);
    const eating = new SoundEffect(asset.soundFiles.eating);
    const bridgeEffect = new SoundEffect(asset.soundFiles.bridge);

    const startScreenBgm = new BackgroundSound(asset.soundFiles.start);
    const dungeonBgm = new BackgroundSound(asset.soundFiles.dungeon);

    return new SoundStore(
      attack,
      criticalHit,
      missHit,
      magic,
      equip,
      pickUp,
      exit,
      select,
      levelUp,
      levelDown,
      fire,
      ice,
      thunder,
      healing,
      eating,
      bridgeEffect,
      startScreenBgm,
      dungeonBgm
    );
  }
}
