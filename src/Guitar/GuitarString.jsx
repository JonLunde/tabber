import React, { useState } from 'react';
import GuitarNote from './GuitarNote';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

function GuitarString(props) {
  const { idx, dispatch, tuning } = props;
  const firstNote = notes.findIndex((note) => tuning[idx - 1] === note);

  function handleChange(event) {
    setTuning(event.target.value);
  }

  function findFirstNote() {
    return notes.findIndex((note) => tuning[idx] === note);
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
        <select name="tuner" id="tuner" onChange={handleChange}>
          {notes.map((note, i) => (
            <option value={note} key={i}>
              {tuning[idx - 1]}
            </option>
          ))}
        </select>
      </div>
      <div className={`guitar__string guitar__string--${idx}`}>{guitarNotes}</div>
    </div>
  );
}

export default GuitarString;
