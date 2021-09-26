export interface ItemStatus {
  id: string;
  displayName: string;
  identified: boolean;
  identify(): void;
}

export interface EquipmentStatus extends ItemStatus {
  equiped: boolean;
  cursed: boolean;
}

export interface UsableStatus extends ItemStatus {
  used: boolean;
}
