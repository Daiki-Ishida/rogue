export interface TrapStatus {
  hidden: boolean;
}

export class TrapStatusBase implements TrapStatus {
  constructor(public hidden: boolean = false) {}
}
