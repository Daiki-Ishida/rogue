import { HerbStatus } from '..';

export class DragonHerbStatus extends HerbStatus {
  static readonly _name = 'ドラゴン草';

  displayName(): string {
    return DragonHerbStatus._identified
      ? DragonHerbStatus._name
      : DragonHerbStatus._tempName;
  }

  get identified(): boolean {
    return DragonHerbStatus._identified;
  }
}
