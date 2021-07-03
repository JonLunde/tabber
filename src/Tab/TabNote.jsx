import React, { useReducer, useEffect } from 'react';

// Reducer to handle all events.
const reducer = (fret, action) => {
  if (action.type === 'increment') {
    if (fret === (undefined || null)) return frets[0];
    return frets.findIndex((n) => n === fret) === 11 ? null : frets[frets.findIndex((n) => n === fret) + 1];
  }

  if (action.type === 'decrement') {
    if (fret === (undefined || null)) return frets[11];
    return frets.findIndex((n) => n === fret) === 0 ? null : frets[frets.findIndex((n) => n === fret) - 1];
  }

  return fret;
};

// Clickable TabNotesComponent to increment and decrement note.
function TabNote() {
  // const [fret, dispatch] = useReducer(reducer, null);

  // // Increment with mouse left click. Decrement with right click.
  // const handleClick = (e) => {
  //   if (e.button === 0) dispatch({ type: 'increment' });
  //   if (e.button === 2) dispatch({ type: 'decrement' });
  // };

  // // Increment with arrow up. Decrement with arrow down.
  // const handleKeyDown = (e) => {
  //   if (e.code === 'ArrowUp') dispatch({ type: 'increment' });
  //   if (e.code === 'ArrowDown') dispatch({ type: 'decrement' });
  // };

  return <input type="number" className="tab-bar__note" />;
}

export default TabNote;
