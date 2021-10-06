import React from 'react';
import { Screen } from './page/Screen';
import { rogue } from './game';
import './asset/main.css';

export const App = (): JSX.Element => {
  return (
    <div className="main">
      <Screen sketch={rogue} />
    </div>
  );
};
