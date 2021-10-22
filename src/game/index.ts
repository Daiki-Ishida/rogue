import p5, { Element, Graphics } from 'p5';
import { Asset } from 'asset';
import { Game } from './game';
import { ImageStore, SoundStore } from './store';
import { DrawerManager } from './drawer';
import { actionController, ControllerManager } from './controller';
import { WindowManager } from './view/window';
import { AnimationManager } from './animation';
import { PlaylogManager } from './log';
import { IndicatorManager } from './view/indicator';
import { SoundManager } from './sounds';

export let overlay: Graphics;

export let textBox: Element;
export let fileInput: Element;
export let volumeSlider: Element;
export let volumeIcon: Element;

let asset: Asset;
export let imageStore: ImageStore;
export let soundStore: SoundStore;

export let game: Game;
export let controller: ControllerManager;
export let drawer: DrawerManager;

export let windowManager: WindowManager;
export let animationManager: AnimationManager;
export let soundManager: SoundManager;
export let playlogManager: PlaylogManager;
export let indicatorManager: IndicatorManager;

export const savedata: {
  status: 'NONE' | 'SAVED' | 'EXPORTED';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
} = {
  status: 'NONE',
  data: {},
};
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

    // プレイヤー名入力ボックス
    textBox = p.createInput('アスカ');
    textBox.hide();

    // ボリューム調整フォーム
    volumeSlider = p.createSlider(0, 100, 50, 5);
    volumeIcon = p.createSpan('🔊');

    // セーブファイルロードボタン
    fileInput = p.createFileInput((file) => {
      game.load(file.data);
      controller.changeState(actionController);
      fileInput.hide();
    });
    fileInput.hide();

    imageStore = ImageStore.init(asset);
    soundStore = SoundStore.init(asset);

    soundManager = SoundManager.init();

    game = Game.init();
    drawer = DrawerManager.init();
    controller = ControllerManager.init();

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
    if (savedata.status === 'SAVED') {
      p.saveJSON(savedata.data, 'save.json');
      savedata.status = 'EXPORTED';
    }

    p.background(0, 0, 0);
    controller.hold(game, p);

    game.isSkipMode ? p.frameRate(SKIP_SPEED) : p.frameRate(PLAY_SPEED);
    game.proc();

    playlogManager.proc();
    indicatorManager.proc();

    const vol = (volumeSlider.value() as number) / 100;
    soundManager.setVolume(vol);

    // 音声再生処理
    soundManager.play();

    // 画面描画処理
    drawer.proc(p, game);
  };
};
