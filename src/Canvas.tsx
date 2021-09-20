import React, { useEffect } from 'react';
import p5 from 'p5';

interface Props {
  sketch: (...args: any[]) => any;
}

export const Canvas = (props: Props) => {
  useEffect(() => {
    new p5(props.sketch);
  }, [props.sketch]);

  return <></>;
};
