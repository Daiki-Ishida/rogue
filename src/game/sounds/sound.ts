export interface Sound {
  file: HTMLAudioElement;
  done: boolean;
  play: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
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
}
