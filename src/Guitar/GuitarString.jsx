import React, { useState } from 'react';
import GuitarNote from './GuitarNote';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarString(props) {
  const { idx, dispatch } = props;
  const [tuning, setTuning] = useState(() => {
    switch (idx) {
      case 1:
        return 'e';

      case 2:
        return 'b';

      case 3:
        return 'g';

      case 4:
        return 'd';

      case 5:
        return 'a';

      case 6:
        return 'e';

      default:
        console.log('TUNING ERROR!');
        break;
    }
  });

  const firstNote = notes.findIndex((note) => note === tuning.toUpperCase());

  function handleChange(event) {
    setTuning(event.target.value);
  }

  let guitarNotes = [];
  for (let i = 0; i < 25; i++) {
    guitarNotes.push(
      <GuitarNote dispatch={dispatch} key={i} note={notes[(i + firstNote) % 12]} noteIdx={i} stringIdx={idx} />,
    );
  }

  return (
    <div>
      <div className={`guitar__tuner guitar__tuner--${idx}`}>
        <select name="tuner" id="tuner" value={tuning.toUpperCase()} onChange={handleChange}>
          {notes.map((note, i) => (
            <option value={note} key={i}>
              {note}
            </option>
          ))}
        </select>
      </div>
      <div className={`guitar__string guitar__string--${idx}`}>{guitarNotes}</div>
    </div>
  );
}

export default GuitarString;
