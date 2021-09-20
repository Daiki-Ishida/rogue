export interface ItemStatus {
  identified: boolean;
  displayName: string;
}

export interface EquipmentStatus extends ItemStatus {
  equiped: boolean;
  cursed: boolean;
}

export interface UsableStatus extends ItemStatus {
  used: boolean;
}
