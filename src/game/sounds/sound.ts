import { BackgroundSound, SoundEffect } from '.';

export interface Sound {
  file: HTMLAudioElement;
  done: boolean;
  play: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
  isSoundEffect(): this is SoundEffect;
  isBgm(): this is BackgroundSound;
}

export abstract class BaseSound implements Sound {
  constructor(readonly file: HTMLAudioElement, public done = false) {}

  abstract play(): void;
  abstract stop(): void;

  setVolume(volume: number): void {
    this.file.volume = volume;
  }

  mute(): void {
    this.file.muted = true;
  }

  unmute(): void {
    this.file.muted = false;
  }

  isSoundEffect(): this is SoundEffect {
    return false;
  }

  isBgm(): this is BackgroundSound {
    return false;
  }
}
