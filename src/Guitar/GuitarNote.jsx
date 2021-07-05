import React, { useEffect } from 'react';
import { playChord } from '../Guitar/guitarPlayer';

function GuitarNote(props) {
  const { note, stringIdx, noteIdx, dispatch } = props;
  let chord = [null, null, null, null, null, null];

  useEffect(() => {
    chord[stringIdx - 1] = noteIdx;
  });
  return (
    <div
      className={noteIdx === 0 ? 'guitar__note guitar__note--first' : 'guitar__note'}
      onClick={() => {
        playChord(chord);
        dispatch({ type: 'newNote', payload: { stringIdx: stringIdx, noteIdx: noteIdx } });
      }}
    >
      {note}
    </div>
  );
}

export default GuitarNote;
