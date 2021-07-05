import React from 'react';

import GuitarNeck from './GuitarNeck';

function Guitar(props) {
  const { dispatch } = props;

  return (
    <div className="guitar">
      <GuitarNeck dispatch={dispatch} />
    </div>
  );
}

export default Guitar;
