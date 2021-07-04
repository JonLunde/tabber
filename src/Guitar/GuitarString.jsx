import React from 'react';
import GuitarNote from './GuitarNote';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarString(props) {
  const { idx } = props;

  let guitarNotes = [];
  for (let i = 0; i < 24; i++) {
    guitarNotes.push(<GuitarNote key={i} note={notes[i % 12]} />);
  }

  return <div className={`guitar__string guitar__string--${idx}`}>{guitarNotes}</div>;
}

export default GuitarString;
