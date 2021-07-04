import React from 'react';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarTuner(props) {
  const { idx } = props;

  return (
    <div className={`guitar__tuner guitar__tuner--${idx}`}>
      <select name="tuner" id="tuner">
        Tuner
      </select>
    </div>
  );
}

export default GuitarTuner;
