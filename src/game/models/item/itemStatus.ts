export interface ItemStatus {
  identified: boolean;
  displayName(): string;
}

export abstract class ItemStatusBase implements ItemStatus {
  static _identified = false;
  static _name: string;
  static _tempName: string;

  abstract get identified(): boolean;
  abstract displayName(): string;
}
