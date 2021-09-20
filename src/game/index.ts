import p5 from 'p5';

export const rogue = (p: p5): void => {
  p.preload = () => {
    // todo
    return;
  };

  p.setup = () => {
    p.frameRate(30);
    p.createCanvas(1280, 720);
  };

  p.keyPressed = () => {
    // todo
    return;
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
      p.fill(0);
    } else {
      p.fill(255);
    }
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
  };
};
