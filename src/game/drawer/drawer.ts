import p5 from 'p5';
import { Camera } from '.';
import { Game } from 'game/game';

export interface Drawer {
  draw: (p: p5, game: Game, camera: Camera) => void;
}
