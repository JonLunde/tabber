import React, { useEffect, useState } from 'react';

import GuitarNeck from './GuitarNeck';
import GuitarLegend from './GuitarLegend';
import GuitarTuning from './GuitarTuning';

function Guitar(props) {
  const { dispatch } = props;
  const [tuning, setTuning] = useState(['E', 'B', 'G', 'D', 'A', 'E']);

  useEffect(() => {
    console.log('Updated tunings: ', tuning);
  }, [tuning]);

  function changeTuning(tuningIdx) {
    let chosenTuning = [];
    switch (tuningIdx) {
      case '1':
        chosenTuning = ['E', 'B', 'G', 'D', 'A', 'E'];
        break;
      case '2':
        chosenTuning = ['D', 'A', 'F', 'C', 'G', 'D'];
        break;
      default:
        console.log('GUITARNECK SWITCH ERROR!');
        break;
    }
    setTuning(chosenTuning);
  }

  function changeTuner(note, i) {
    console.log('tuners working ', note, i);
    setTuning((prevTuning) => {
      let newTuning = [...prevTuning];
      newTuning[i] = note;
      return newTuning;
    });
  }

  return (
    <div className="guitar">
      <GuitarTuning key={0} tuning={tuning} changeTuning={changeTuning} changeTuner={changeTuner} />
      <GuitarNeck key={1} dispatch={dispatch} tuning={tuning} />
      <GuitarLegend key={2} />
    </div>
  );
}

export default Guitar;
