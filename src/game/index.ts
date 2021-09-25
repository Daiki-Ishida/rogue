import p5, { Graphics } from 'p5';
import { Asset } from 'asset';
import { Game } from './game';
import { ImageStore } from './store';
import { Drawer } from './view';
import { Controller } from './controller';
import { WindowManager } from './view/gui';
import { AnimationManager } from './animation';

let asset: Asset;
let controller: Controller;
export let overlay: Graphics;
export let game: Game;
export let drawer: Drawer;
export let imageStore: ImageStore;
export let windowManager: WindowManager;
export let animationManager: AnimationManager;

export const rogue = (p: p5): void => {
  p.preload = () => {
    // todo
    asset = Asset.preload(p);
    imageStore = ImageStore.init(asset);

    overlay = p.createGraphics(1280, 720);
  };

  p.setup = () => {
    p.frameRate(30);
    p.createCanvas(1280, 720);
    p.textFont(asset.font);

    game = Game.init();
    drawer = Drawer.init();
    controller = Controller.init();

    animationManager = AnimationManager.init();
    windowManager = WindowManager.init(game);
  };

  p.keyPressed = () => {
    if (moveKeyIsDown(game, p)) {
      return;
    }

    controller.proc(p.key, game);
  };

  p.draw = () => {
    drawer.draw(game, p);
  };
};

const moveKeyIsDown = (game: Game, p: p5) => {
  // if (game.inventory.display) return false;
  // if (game.selectWindow) return false;
  // if (game.potContentsWindow) return false;

  return (
    p.key !== 'A' &&
    p.key !== 'W' &&
    p.key !== 'S' &&
    p.key !== 'D' &&
    (p.keyIsDown(65) || p.keyIsDown(87) || p.keyIsDown(83) || p.keyIsDown(68))
  );
};
