import React, { useEffect } from 'react';
import p5 from 'p5';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sketch: (...args: any[]) => any;
}

export const Screen = (props: Props): JSX.Element => {
  useEffect(() => {
    new p5(props.sketch);
  }, [props.sketch]);

  return <></>;
};
