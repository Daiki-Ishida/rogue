import p5, { Graphics } from 'p5';
import { Asset } from 'asset';
import { Game } from './game';
import { ImageStore, SoundStore } from './store';
import { Drawer } from './view';
import { Controller } from './controller';
import { WindowManager } from './view/gui';
import { AnimationManager } from './animation';
import { PlaylogManager } from './log';
import { IndicatorManager } from './view/indicator';
import { SoundManager } from './sounds';

export let overlay: Graphics;

let asset: Asset;
export let controller: Controller;
export let game: Game;
export let drawer: Drawer;
export let imageStore: ImageStore;
export let soundStore: SoundStore;
export let windowManager: WindowManager;
export let animationManager: AnimationManager;
export let soundManager: SoundManager;
export let playlogManager: PlaylogManager;
export let indicatorManager: IndicatorManager;

export const rogue = (p: p5): void => {
  p.preload = () => {
    asset = Asset.preload(p);
    overlay = p.createGraphics(1280, 720);
  };

  p.setup = () => {
    p.frameRate(30);
    p.createCanvas(1280, 720);
    p.textFont(asset.font);
    p.imageMode('center');

    imageStore = ImageStore.init(asset);
    soundStore = SoundStore.init(asset);

    game = Game.init();
    drawer = Drawer.init();
    controller = Controller.init();
    animationManager = AnimationManager.init();
    soundManager = SoundManager.init();
    windowManager = WindowManager.init(game);
    playlogManager = PlaylogManager.init();
    indicatorManager = IndicatorManager.init();
  };

  p.keyPressed = () => {
    if (game.state === 'BRIDGE') {
      return;
    }

    if (moveKeyIsDown(game, p)) {
      return;
    }

    controller.proc(p.key, game);
  };

  p.draw = () => {
    if (moveKeyIsDown(game, p)) {
      if (game.state === 'BRIDGE') {
        return;
      }

      controller.proc(p.key, game);
    }

    game.skip ? p.frameRate(120) : p.frameRate(30);

    game.proc();

    playlogManager.proc();
    indicatorManager.proc();

    soundManager.play();
    drawer.draw(game, p);
  };
};

const moveKeyIsDown = (game: Game, p: p5) => {
  if (windowManager.inventoryWindow.display) return false;
  if (windowManager.selectWindow) return false;
  // if (game.potContentsWindow) return false;

  return (
    p.key !== 'A' &&
    p.key !== 'W' &&
    p.key !== 'S' &&
    p.key !== 'D' &&
    (p.keyIsDown(65) || p.keyIsDown(87) || p.keyIsDown(83) || p.keyIsDown(68))
  );
};
