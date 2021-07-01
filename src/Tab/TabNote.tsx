import React, { DispatchWithoutAction, useEffect, useReducer, useState } from 'react';

interface State {
  note: string;
}

const notes: string[] = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

const reducer: any = (state: State, action: Event) => {
  if (action.type === 'increment') {
    return notes.findIndex((note: string) => note === state.note) > 11
      ? notes[0]
      : notes.findIndex((note: string) => note === state.note);
  }
  return state;
};

type Reduce = [State, DispatchWithoutAction];

const TabNote: React.Component<null, null> = () => {
  const [state, dispatch]: Reduce = useReducer(reducer, { note: undefined });

  const handleClick = () => {
    dispatch({ type: 'increment' });
  };

  return (
    <div className="tab-bar__note" role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
      <span>{state}</span>
    </div>
  );
};

export default TabNote;
