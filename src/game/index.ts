import p5, { Element, Graphics } from 'p5';
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

export let textBox: Element;
export let volumeSlider: Element;
export let volumeIcon: Element;

let asset: Asset;
export let imageStore: ImageStore;
export let soundStore: SoundStore;

export let game: Game;
export let controller: Controller;
export let drawer: Drawer;

export let windowManager: WindowManager;
export let animationManager: AnimationManager;
export let soundManager: SoundManager;
export let playlogManager: PlaylogManager;
export let indicatorManager: IndicatorManager;

const PLAY_SPEED = 30;
const SKIP_SPEED = 120;

export const rogue = (p: p5): void => {
  p.preload = () => {
    asset = Asset.preload(p);
    overlay = p.createGraphics(1280, 720);
  };

  p.setup = () => {
    p.createCanvas(1280, 720);
    p.textFont(asset.font);
    p.imageMode('center');

    textBox = p.createInput('ASUKA');
    textBox.hide();
    volumeSlider = p.createSlider(0, 100, 50, 5);
    volumeIcon = p.createSpan('🔊');

    imageStore = ImageStore.init(asset);
    soundStore = SoundStore.init(asset);

    soundManager = SoundManager.init();

    game = Game.init();
    drawer = Drawer.init();
    controller = Controller.init();

    animationManager = AnimationManager.init();
    windowManager = WindowManager.init(game);
    playlogManager = PlaylogManager.init();
    indicatorManager = IndicatorManager.init();
  };

  p.keyPressed = () => {
    controller.press(game, p);
  };

  p.keyReleased = () => {
    controller.release(game, p);
  };

  p.draw = () => {
    controller.hold(game, p);

    game.isSkipMode ? p.frameRate(SKIP_SPEED) : p.frameRate(PLAY_SPEED);
    game.proc();

    playlogManager.proc();
    indicatorManager.proc();

    const vol = (volumeSlider.value() as number) / 100;
    soundManager.setVolume(vol);

    soundManager.play();
    drawer.draw(game, p);
  };
};
