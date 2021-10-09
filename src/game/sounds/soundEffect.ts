import { BaseSound } from '.';

export class SoundEffect extends BaseSound {
  play(): void {
    this.file.currentTime = 0;
    this.file.play();
    this.done = true;
  }

  stop(): void {
    this.file.pause();
    this.file.currentTime = 0;
  }

  isSoundEffect(): this is SoundEffect {
    return true;
  }
}
