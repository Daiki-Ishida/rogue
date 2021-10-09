import { BackgroundSound, Sound } from '.';

export class SoundManager {
  private constructor(
    public sounds: Sound[],
    public muted: boolean,
    public volume: number,
    public bgm?: BackgroundSound
  ) {}

  static init(): SoundManager {
    return new SoundManager([], false, 1);
  }

  play(): void {
    this.sounds.forEach((sound) => sound.play());
    this.sounds = this.sounds.filter((sound) => !sound.done);
  }

  register(sound: Sound): void {
    if (this.muted) {
      sound.mute();
    }
    sound.setVolume(this.volume);

    if (sound.isBgm()) {
      this.bgm = sound;
      this.bgm.play();
    }

    if (sound.isSoundEffect()) {
      this.sounds.push(sound);
    }
  }

  deregisterBgm(): void {
    this.bgm?.stop();
    this.bgm = undefined;
  }

  mute(): void {
    this.muted = true;
    this.bgm?.mute();
    this.sounds.forEach((sound) => sound.mute());
  }

  unmute(): void {
    this.muted = false;
    this.bgm?.unmute();
    this.sounds.forEach((sound) => sound.unmute());
  }

  setVolume(volume: number): void {
    this.volume = volume;
    this.bgm?.setVolume(volume);
    this.sounds.forEach((sound) => sound.setVolume(volume));
  }
}
