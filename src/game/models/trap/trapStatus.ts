export class TrapStatus {
  private constructor(public hidden: boolean) {}

  static init(): TrapStatus {
    return new TrapStatus(false);
  }
}
