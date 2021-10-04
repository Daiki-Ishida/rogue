import p5 from 'p5';
import { Camera } from './camera';
import {
  animationManager,
  indicatorManager,
  overlay,
  playlogManager,
  windowManager,
} from 'game';
import { Game } from 'game/game';
import { Board } from 'game/board';
import { Actor, Player } from 'game/models/actor';
import { Trap } from 'game/models/trap';
import { Tile } from 'game/board/layer';
import { GridUtil } from 'game/util';
import { Item } from 'game/models/item';

const ZOOM = 60;

let BRIDGE_EFFECT_FRAME = 0;

export class Drawer {
  constructor(readonly camera: Camera) {}

  static init(): Drawer {
    const camera = Camera.init(ZOOM);
    return new Drawer(camera);
  }

  draw(game: Game, p: p5): void {
    switch (game.state) {
      case 'PLAY':
        this.drawGamePlay(game, p);
        break;
      case 'BRIDGE':
        this.drawGamePlay(game, p);
        this.drawBridgeEffect(game, p);
        break;
      default:
        throw new Error('something went wrong...');
    }
  }

  private drawGamePlay(game: Game, p: p5): void {
    this.camera.track(game.player);

    // ダンジョンマップ描画
    this.drawBoard(game.board, p);

    // シンボル描画
    this.drawSymbols(game.player, game.board, p);

    // 視野範囲描画
    this.drawVisibility(game.player, p);

    // ミニマップ描画
    this.drawMiniMap(game.board, p);

    // アニメーション描画
    this.drawAnimations(p);

    // インジケーター描画
    this.drawIndicators(game, p);

    // ログ描画
    this.drawLogs(p);

    // ウィンドウ描画
    this.drawWindow(p);
  }

  private drawBoard(board: Board, p: p5): void {
    board.draw(p, this.camera);
  }

  private drawSymbols(player: Player, board: Board, p: p5): void {
    // プレイヤー視野内のシンボル
    const { traps, items, actors } =
      player.visibility.listSymbolsInRange(board);

    actors.sort((a, b) => a.y - b.y);

    this.drawTraps(traps, p);
    this.drawItems(items, p);
    this.drawActors(actors, p);
  }

  private drawTraps(traps: Trap[], p: p5): void {
    for (const trap of traps) {
      trap.draw(p, this.camera);
    }
  }

  private drawItems(items: Item[], p: p5): void {
    for (const item of items) {
      item.draw(p, this.camera);
    }
  }

  private drawActors(actors: Actor[], p: p5): void {
    for (const actor of actors) {
      actor.draw(p, this.camera);
    }
  }

  private drawVisibility(player: Player, p: p5): void {
    p.push();
    p.noFill();
    p.noStroke();
    p.rectMode('corner');
    p.imageMode('corner');

    const v = player.visibility;
    const cam = this.camera;
    const o = cam.adjust(0, 0);
    const c = cam.adjust(cam.x, cam.y);

    // 初期化
    overlay.erase();
    overlay.rect(0, 0, overlay.width, overlay.height);
    overlay.noErase();
    overlay.fill(p.color(0, 0, 0, 200));
    overlay.rect(0, 0, overlay.width, overlay.height);

    // 視野の切り抜き
    overlay.erase();
    overlay.rect(
      o.x + v.x * cam.zoom - cam.zoom / 2,
      o.y + v.y * cam.zoom - cam.zoom / 2,
      cam.zoom * v.w,
      cam.zoom * v.h,
      20
    );
    overlay.noErase();

    p.image(overlay, c.x, c.y);
    p.pop();
  }

  // アニメーション描画
  private drawAnimations(p: p5): void {
    animationManager.draw(p, this.camera);
  }

  private drawIndicators(game: Game, p: p5): void {
    indicatorManager.draw(game, p, this.camera);
  }

  private drawWindow(p: p5): void {
    windowManager.inventoryWindow.draw(p);
    windowManager.selectWindow?.draw(p);
  }

  private drawLogs(p: p5): void {
    playlogManager.draw(p);
  }

  private drawMiniMap(board: Board, p: p5): void {
    p.push();
    p.noStroke();
    p.rectMode('corner');

    const n = 5;
    const s = 200;

    const tiles = board.baseLayer.tiles;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== Tile.VISITED) continue;

      const xy = GridUtil.indexToGrid(i);
      const x = xy[0];
      const y = xy[1];

      const actor = board.findActor(x, y);
      // playerマス
      if (actor?.isPlayer()) {
        p.fill('#EADD36');
        p.rect(s + x * n, s + y * n, n, n);
        continue;
      }
      // enemyマス
      if (actor?.isEnemy()) {
        p.fill('#BF0000');
        p.rect(s + x * n, s + y * n, n, n);
        continue;
      }

      const item = board.findItem(x, y);
      // itemマス
      if (item) {
        p.fill('rgb(0,153,255)');
        p.rect(s + x * n, s + y * n, n, n);
        continue;
      }

      // 空白マス
      p.fill('rgba(6,29,143,0.8)');
      p.rect(s + x * n, s + y * n, n, n);
    }

    p.pop();
  }

  private drawBridgeEffect(game: Game, p: p5): void {
    p.push();

    if (BRIDGE_EFFECT_FRAME < 50) {
      p.background(0, 0, 0);

      p.textSize(144);
      p.strokeWeight(12);

      const fade = BRIDGE_EFFECT_FRAME * 15;
      p.fill(243, 240, 215, fade);
      p.stroke(49, 107, 131, fade);

      p.text(`Floor ${game.board.dungeon.level}`, 360, 400);
    }

    if (BRIDGE_EFFECT_FRAME >= 50) {
      const fade = 255 - (BRIDGE_EFFECT_FRAME - 50) * 25.5;
      p.background(0, 0, 0, fade);
    }

    BRIDGE_EFFECT_FRAME++;
    if (BRIDGE_EFFECT_FRAME > 60) {
      BRIDGE_EFFECT_FRAME = 0;
      game.state = 'PLAY';
    }

    p.pop();
  }
}
