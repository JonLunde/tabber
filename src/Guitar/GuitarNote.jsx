import React, { useEffect } from 'react';
import { playChord } from '../Guitar/guitarPlayer';
import { ACTIONS } from '../Tabber';

function GuitarNote(props) {
  const { note, stringId, fretId, dispatch } = props;
  let chord = [null, null, null, null, null, null];

  return (
    <div
      className={fretId === 0 ? 'guitar__note guitar__note--first' : 'guitar__note'}
      onClick={() => {
        // chord[6 - stringId] = noteIdx;
        // playChord(chord);
        dispatch({ type: ACTIONS.NEWNOTE, payload: { stringId: stringId, fretId: fretId } });
      }}
    >
      {note}
    </div>
  );
}

export default GuitarNote;
