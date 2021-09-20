import React from 'react';
import { Screen } from './page/Screen';
import { rogue } from './game';

export const App = (): JSX.Element => {
  return <Screen sketch={rogue} />;
};
