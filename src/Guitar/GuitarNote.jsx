import React, { useEffect } from 'react';
import { playChord } from '../Guitar/guitarPlayer';

function GuitarNote(props) {
  const { note, stringIdx, fretIdx, dispatch } = props;
  let chord = [null, null, null, null, null, null];

  return (
    <div
      className={fretIdx === 0 ? 'guitar__note guitar__note--first' : 'guitar__note'}
      onClick={() => {
        // chord[6 - stringIdx] = noteIdx;
        // playChord(chord);
        dispatch({ type: 'newNote', payload: { stringIdx: stringIdx, fretIdx: fretIdx } });
      }}
    >
      {note}
    </div>
  );
}

export default GuitarNote;
