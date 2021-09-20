export class PlayLogs {
  constructor(
    public logs: string[] = [],
    public display: boolean = false,
    public timer: number = 0
  ) {}

  open(): void {
    this.display = true;
    this.timer = 0;
  }

  close(): void {
    this.logs = [];
    this.display = false;
    this.timer = 0;
  }

  push(message: string): void {
    if (this.logs.length > 2) {
      this.logs.shift();
    }

    this.logs.push(message);
    this.open();
  }
}
