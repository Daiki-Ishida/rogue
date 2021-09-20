import p5 from 'p5';
import { Game } from '../game/game';
import { Camera } from './camera';
import { overlay, player, windowManager } from '..';
import { messageManager } from '../message';
import { Board, Tile } from '../game/board';
import { ActorSymbol, Player } from '../game/actor';
import { TrapSymbol } from '../game/trap';
import { ItemSymbol } from '../game/item';
import { GridUtil } from '../util';
import { animationManager } from '.';

const ZOOM = 20;

export class Drawer {
  constructor(readonly camera: Camera) {}

  static init(): Drawer {
    const camera = Camera.init(ZOOM);
    return new Drawer(camera);
  }

  draw(game: Game, p: p5): void {
    this.camera.track(player);

    // ダンジョンマップ描画
    this.drawBoard(game.board, p);

    // シンボル描画
    this.drawSymbols(game.board, p);

    // 視野範囲描画
    this.drawVisibility(p);

    // ミニマップ描画
    this.drawMiniMap(game.board, p);

    // アニメーション描画
    this.drawAnimations(p);

    // インジケーター描画
    this.drawIndicators(game.board, player, p);

    // インベントリ描画
    this.drawInventory(p);

    // メッセージウィンドウ描画
    this.drawMessageWindow(p);
  }

  private drawBoard(board: Board, p: p5): void {
    board.draw(p, this.camera);
  }

  private drawSymbols(board: Board, p: p5): void {
    // プレイヤー視野内のシンボル
    const { traps, items, actors } =
      player.visibility.listSymbolsInRange(board);

    this.drawTraps(traps, p);
    this.drawItems(items, p);
    this.drawActors(actors, p);
  }

  private drawTraps(traps: TrapSymbol[], p: p5): void {
    for (const trap of traps) {
      trap.draw(p, this.camera);
    }
  }

  private drawItems(items: ItemSymbol[], p: p5): void {
    for (const item of items) {
      item.draw(p, this.camera);
    }
  }

  private drawActors(actors: ActorSymbol[], p: p5): void {
    for (const actor of actors) {
      actor.draw(p, this.camera);
    }
  }

  private drawVisibility(p: p5): void {
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

  private drawIndicators(board: Board, player: Player, p: p5): void {
    p.push();
    p.rectMode('corner');

    p.fill('white');
    p.textSize(20);
    p.textStyle('bold');

    const y = 40;
    const x = 50;
    const status = player.status;

    p.text(`${board.dungeon.level} F`, x, y);
    p.text(`Lv ${status.level}`, x + 100, y);
    p.text(`HP ${status.hp} / ${status.maxHp}`, x + 200, y);
    p.text(`満腹度 ${status.fullness} / ${status.maxFullness}`, x + 600, y);

    const w = 200;
    const h = 25;
    const rx = 400;
    const ry = 20;
    const hp = w * (status.hp / status.maxHp);
    const fullness = w * (status.fullness / status.maxFullness);

    p.fill('rgba(52,61,70, 0.75)');
    p.rect(rx, ry, w, h);
    p.rect(rx + 450, ry, w, h);

    p.fill('#00FFBF');
    p.rect(rx, ry, hp, h);
    p.fill('#00D8FF');
    p.rect(rx + 450, ry, fullness, h);

    p.pop();
  }

  private drawInventory(p: p5): void {
    windowManager.inventoryWindow.draw(p);
  }

  // todo: refactor
  private drawMessageWindow(p: p5): void {
    if (messageManager.timer > 180) {
      messageManager.close();
    }

    if (!messageManager.display) {
      return;
    }

    messageManager.timer++;

    p.push();
    p.rectMode('corner');

    const x = 100;
    const y = 520;
    const w = 700;
    const h = 150;
    const l = 40;

    p.fill('rgba(61,61,61,0.7)');
    p.stroke('grey');
    p.strokeWeight(2);
    p.rect(x, y, w, h, 10);

    p.fill('white');
    p.textSize(25);

    messageManager.messages.forEach((message, idx) => {
      p.text(message, x + 50, y + 40 + l * idx);
    });

    p.pop();
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
      if (actor?.isPlayer) {
        p.fill('#BF0000');
        p.rect(s + x * n, s + y * n, n, n);
        continue;
      }
      // enemyマス
      if (actor?.isEnemy) {
        p.fill('#EADD36');
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
}
