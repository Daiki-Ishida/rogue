import p5, { Image } from 'p5';
import { imageStore } from 'game';
import { Camera } from 'game/view';
import { ActorSymbol } from '.';
import { DirectionKey } from '../direction';

export class EnemySymbol extends ActorSymbol {
  constructor(
    public chips: Image[],
    public attackEffect: Image[],
    readonly resizeFactor: number,
    public idx: number,
    public x: number = 0,
    public y: number = 0,
    public active: boolean = true
  ) {
    super(chips, attackEffect, idx, x, y, active);
  }

  static init(id: string): EnemySymbol {
    let img: Image[];
    let attackImg: Image[];
    let resize: number;
    switch (id) {
      case 'DRAGON_01':
        img = imageStore.actors.dragon;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'DRAGON_02':
        img = imageStore.actors.dragon;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'DRAGON_03':
        img = imageStore.actors.dragon;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'INSECTOR_01':
        img = imageStore.actors.insector;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'INSECTOR_02':
        img = imageStore.actors.insector;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'INSECTOR_03':
        img = imageStore.actors.insector;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'WEREWOLF_01':
        img = imageStore.actors.werewolf;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'WEREWOLF_02':
        img = imageStore.actors.werewolf;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'WEREWOLF_03':
        img = imageStore.actors.werewolf;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'GOLEM_01':
        img = imageStore.actors.golem;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'GOLEM_02':
        img = imageStore.actors.golem;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'GOLEM_03':
        img = imageStore.actors.golem;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'TATSUNOKO_01':
        img = imageStore.actors.tatsunoko;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'TATSUNOKO_02':
        img = imageStore.actors.tatsunoko;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'TATSUNOKO_03':
        img = imageStore.actors.tatsunoko;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'GRIFFIN_01':
        img = imageStore.actors.griffin;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'GRIFFIN_02':
        img = imageStore.actors.griffin;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'GRIFFIN_03':
        img = imageStore.actors.griffin;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'PIG_MAID_01':
        img = imageStore.actors.pigMaid;
        attackImg = imageStore.effects.fang;
        resize = 1;
        break;
      case 'PIG_MAID_02':
        img = imageStore.actors.pigMaid;
        attackImg = imageStore.effects.fang;
        resize = 1;
        break;
      case 'PIG_MAID_03':
        img = imageStore.actors.pigMaid;
        attackImg = imageStore.effects.fang;
        resize = 1;
        break;
      case 'GOBLIN_01':
        img = imageStore.actors.goblin;
        attackImg = imageStore.effects.fang;
        resize = 1;
        break;
      case 'GOBLIN_02':
        img = imageStore.actors.goblin;
        attackImg = imageStore.effects.fang;
        resize = 1;
        break;
      case 'MOFUMOFU_01':
        img = imageStore.actors.mofumofu;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'MOFUMOFU_02':
        img = imageStore.actors.mofumofu;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'SOLDIER_01':
        img = imageStore.actors.maskedSoldier;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'SOLDIER_02':
        img = imageStore.actors.maskedSoldier;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'PEGASUS_01':
        img = imageStore.actors.pegasus;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'PEGASUS_02':
        img = imageStore.actors.pegasus;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'SHADOW':
        img = imageStore.actors.shadow;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'MANTICORE':
        img = imageStore.actors.manticore;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      case 'DARK_KNIGHT':
        img = imageStore.actors.darkKnight;
        attackImg = imageStore.effects.fang;
        resize = 2;
        break;
      default:
        throw new Error(`Invalid ID: ${id}`);
    }
    return new EnemySymbol(img, attackImg, resize, 0);
  }

  turnTo(direction: DirectionKey): void {
    switch (direction) {
      case 'LEFT':
        this.idx = 3;
        break;
      case 'UP':
        this.idx = 9;
        break;
      case 'RIGHT':
        this.idx = 6;
        break;
      case 'DOWN':
        this.idx = 0;
        break;
    }
  }

  draw(p: p5, camera: Camera): void {
    this.proc(p);
    const { x, y } = camera.adjust(this.x, this.y);
    const size = camera.zoom * this.resizeFactor;
    p.image(this.currentChip, x, y - camera.zoom * 0.2, size, size);
  }
}
