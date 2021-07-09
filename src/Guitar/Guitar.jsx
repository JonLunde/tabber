import React, { useEffect, useState } from 'react';

import GuitarNeck from './GuitarNeck';
import GuitarLegend from './GuitarLegend';
import GuitarTuning from './GuitarTuning';

function Guitar(props) {
  const { dispatch, tuning, changeTuner, changeTuning, handleLegendNotation, legendNotation, chordBuilder } = props;

  return (
    <div className="guitar">
      <GuitarTuning key={0} tuning={tuning} changeTuning={changeTuning} changeTuner={changeTuner} />
      <GuitarNeck key={1} dispatch={dispatch} tuning={tuning} />
      <GuitarLegend
        key={2}
        handleLegendNotation={handleLegendNotation}
        dispatch={dispatch}
        legendNotation={legendNotation}
        chordBuilder={chordBuilder}
      />
    </div>
  );
}

export default Guitar;
