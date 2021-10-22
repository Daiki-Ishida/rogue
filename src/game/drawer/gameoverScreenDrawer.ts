import p5 from 'p5';
import { Game } from 'game/game';
import { Drawer } from '.';

const TITLE = 'GAME OVER';

/**
 * ゲームオーバー時の画面
 */
class GameOverScreenDrawer implements Drawer {
  draw(p: p5, game: Game): void {
    p.push();
    p.background('#082032');

    p.textSize(144);
    p.fill('#FEF1E6');
    p.text(TITLE, 120, 240);

    p.textSize(56);
    p.fill('#FEF1E6');
    p.text(`GOLD  :  ${game.gold}`, 280, 420);
    p.text(`EXP   :  ${game.player.status.exp}`, 280, 520);
    p.text(`FLOOR :  ${game.board.dungeon.level}`, 280, 620);

    p.pop();
  }
}

export const gameOverScreenDrawer = new GameOverScreenDrawer();
