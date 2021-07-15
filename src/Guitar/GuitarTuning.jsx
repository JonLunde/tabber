import React, { useEffect } from 'react';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarTuning(props) {
  const { tuning, changeTuner, changeTuning } = props;

  function findFirstNote(inNote) {
    return notes.findIndex((note) => inNote === note);
  }

  return (
    <div className="guitar__tuning">
      <div className="guitar__tuning__picker">
        <select name="tuning" id="tuning" onChange={(event) => changeTuning(event.target.value)}>
          <option value="0" hidden>
            Change Tuning
          </option>
          <option value="1">E Standard</option>
          <option value="2">D Standard</option>
        </select>
      </div>
      <div className="guitar__tuning__keys">
        {tuning.map((tuner, i) => (
          <div key={i} className={`guitar__tuning__key--${i}`}>
            <select
              name="tuner"
              id="tuner"
              value={notes[findFirstNote(tuner)]}
              onChange={(event) => changeTuner(event.target.value, i)}
            >
              {notes.map((note, i) => (
                <option value={notes[i % 12]} key={i}>
                  {notes[i % 12]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuitarTuning;
