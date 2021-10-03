import { Game } from 'game/game';
import p5 from 'p5';

export class StatusIndicator {
  draw(p: p5, game: Game): void {
    const player = game.player;
    const board = game.board;

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
}
