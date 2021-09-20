import { HerbStatus } from '..';

export class ConfusionHerbStatus extends HerbStatus {
  static readonly _name = '混乱草';

  displayName(): string {
    return ConfusionHerbStatus._identified
      ? ConfusionHerbStatus._name
      : ConfusionHerbStatus._tempName;
  }

  get identified(): boolean {
    return ConfusionHerbStatus._identified;
  }
}
