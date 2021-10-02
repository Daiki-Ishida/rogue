import p5 from 'p5';

export class Playlog {
  private constructor(
    private message: string,
    private fade: number,
    private timer: number,
    public done: boolean
  ) {}

  static generate(message: string): Playlog {
    return new Playlog(message, 0, 0, false);
  }

  proc(): void {
    // fade in
    if (this.timer <= 120 && this.fade < 255) {
      this.fade += 50;
    }

    // fade out
    if (this.timer > 120 && this.fade > 0) {
      this.fade -= 30;
    }

    this.timer++;
    if (this.timer > 130) {
      this.done = true;
    }
  }

  draw(x: number, y: number, p: p5): void {
    p.push();
    p.fill(255, 255, 255, this.fade);
    p.text(this.message, x, y);
    p.pop();
  }
}
