import { DirectionKey } from 'game/models/actor/direction';

interface DirectionMapping {
  a: DirectionKey;
  A: DirectionKey;
  w: DirectionKey;
  W: DirectionKey;
  d: DirectionKey;
  D: DirectionKey;
  s: DirectionKey;
  S: DirectionKey;
}

class _KeyConfig {
  directionMapping: DirectionMapping = {
    a: 'LEFT',
    A: 'LEFT',
    w: 'UP',
    W: 'UP',
    d: 'RIGHT',
    D: 'RIGHT',
    s: 'DOWN',
    S: 'DOWN',
  };
}

export const KeyConfig = new _KeyConfig();
