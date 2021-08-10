import React from 'react';
import { playChord } from '../utils/guitarPlayer';
import { ACTIONS } from '../useTabStateReducer';

function GuitarNote(props) {
  const {
    note,
    stringId,
    fretId,
    dispatch,
    activeNote: { string, fret },
    chordString,
  } = props;
  const chord = [null, null, null, null, null, null];
  const activeStyle = { backgroundColor: 'rgba(211,211,211,0.8)', borderRadius: '10px', color: 'rgba(41,41,41)' };

  let isChordNote;
  chordString.forEach((chordNote) => {
    if (chordNote === fretId) isChordNote = true;
  });

  return (
    <div
      className={fretId === 0 ? 'guitar__note guitar__note--first' : 'guitar__note'}
      style={isChordNote || (string === stringId && fret === fretId) ? activeStyle : null}
      role="button"
      tabIndex={0}
      onClick={() => {
        chord[5 - stringId] = fretId;
        playChord(chord);
        dispatch({ type: ACTIONS.ADD_NOTE, payload: { stringId, fretId } });
      }}
      onKeyPress={() => {
        chord[5 - stringId] = fretId;
        playChord(chord);
        dispatch({ type: ACTIONS.ADD_NOTE, payload: { stringId, fretId } });
      }}
    >
      {note}
    </div>
  );
}

export default GuitarNote;
