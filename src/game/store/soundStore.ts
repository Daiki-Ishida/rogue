import { Asset } from 'asset/asset';
import { Sound, SoundEffect } from 'game/sounds';

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
  readonly fire: Sound;
  readonly ice: Sound;
  readonly thunder: Sound;
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
    readonly fire: Sound,
    readonly ice: Sound,
    readonly thunder: Sound
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
    const fire = new SoundEffect(asset.soundFiles.fire);
    const ice = new SoundEffect(asset.soundFiles.ice);
    const thunder = new SoundEffect(asset.soundFiles.thunder);

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
      fire,
      ice,
      thunder
    );
  }
}
