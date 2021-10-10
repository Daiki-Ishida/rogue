import { BaseSound } from '.';

export class BackgroundSound extends BaseSound {
  playing: boolean;

  constructor(file: HTMLAudioElement) {
    file.loop = true;
    super(file);
    this.playing = false;
  }

  play(): void {
    if (this.playing) {
      return;
    }
    this.file.play();
  }

  stop(): void {
    this.file.pause();
    this.file.currentTime = 0;
    this.playing = false;
    this.done = true;
  }

  isBgm(): this is BackgroundSound {
    return true;
  }
}
