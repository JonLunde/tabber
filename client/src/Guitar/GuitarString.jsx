import React, { useState } from 'react';
import GuitarNote from './GuitarNote';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarString(props) {
  const { id, dispatch, stringTuning, activeNote, activeString, chordStrings, notation } = props;
  const firstNote = notes.findIndex((note) => stringTuning === note);
  const activeStyle = { backgroundColor: 'red' };

  let guitarNotes = [];

  //Find a more efficient solution.
  for (let i = 0; i < 25; i++) {
    guitarNotes.push(
      <GuitarNote
        dispatch={dispatch}
        key={i}
        note={notes[(i + firstNote) % 12]}
        fretId={i}
        stringId={id}
        activeNote={activeNote}
        chordString={chordStrings[id]}
      />,
    );
  }

  return (
    <div
      className={`guitar__string guitar__string--${id}`}
      style={activeString === id && notation !== '' ? activeStyle : null}
    >
      {guitarNotes}
    </div>
  );
}

export default GuitarString;
