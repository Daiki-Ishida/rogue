import { Sound } from '.';

export class SoundManager {
  private constructor(
    public sounds: Sound[],
    public muted: boolean,
    public volume: number
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
    this.sounds.push(sound);
  }

  mute(): void {
    this.muted = true;
    this.sounds.forEach((sound) => sound.mute());
  }

  unmute(): void {
    this.muted = false;
    this.sounds.forEach((sound) => sound.unmute());
  }

  setVolume(volume: number): void {
    this.volume = volume;
    this.sounds.forEach((sound) => sound.setVolume(volume));
  }
}
