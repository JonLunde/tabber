import React, { useState } from 'react';
import GuitarNote from './GuitarNote';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarString(props) {
  const { id, dispatch, tuning } = props;
  const firstNote = notes.findIndex((note) => tuning[id] === note);

  let guitarNotes = [];
  for (let i = 0; i < 25; i++) {
    guitarNotes.push(
      <GuitarNote dispatch={dispatch} key={i} note={notes[(i + firstNote) % 12]} fretId={i} stringId={id} />,
    );
  }

  return <div className={`guitar__string guitar__string--${id}`}>{guitarNotes}</div>;
}

export default GuitarString;
