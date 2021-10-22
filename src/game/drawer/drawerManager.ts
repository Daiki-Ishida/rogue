import p5 from 'p5';
import { Drawer } from './drawer';
import { Camera } from './camera';
import { Game } from 'game/game';
import { startScreenDrawer } from './startScreenDrawer';
import { setupScreenDrawer } from './setupScreenDrawer';
import { titleScreenDrawer } from './titleScreenDrawer';
import { playScreenDrawer } from './playScreenDrawer';
import { gameOverScreenDrawer } from './gameoverScreenDrawer';

const ZOOM = 80;

/**
 * 画面描画処理を担うクラス
 */
export class DrawerManager {
  private constructor(readonly camera: Camera, private drawer: Drawer) {}

  static init(): DrawerManager {
    const camera = Camera.init(ZOOM);
    return new DrawerManager(camera, startScreenDrawer);
  }

  proc(p: p5, game: Game): void {
    this.drawer.draw(p, game, this.camera);
  }

  setDrawer(drawer: Drawer): void {
    this.drawer = drawer;
  }

  changeDrawer(game: Game): void {
    let drawer: Drawer;
    switch (game.state) {
      case 'START':
        drawer = startScreenDrawer;
        break;
      case 'SET_UP':
        drawer = setupScreenDrawer;
        break;
      case 'PROLOGUE':
        drawer = titleScreenDrawer;
        break;
      case 'PLAY':
      case 'BRIDGE':
        drawer = playScreenDrawer;
        break;
      case 'GAME_OVER':
        drawer = gameOverScreenDrawer;
        break;
      case 'GAME_CLEAR':
        drawer = gameOverScreenDrawer;
        break;
    }

    this.setDrawer(drawer);
  }
}
