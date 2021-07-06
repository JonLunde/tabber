import React, { useState, useReducer, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrash, faArrowUp, faArrowDown);

import Guitar from './Guitar/Guitar';
import TabContainer from './Tab/TabContainer';

let keyCount = 0;

function reducer(tabState, action) {
  let newTabState = [...tabState];
  switch (action.type) {
    case 'moveUp':
      if (tabState.length <= 1) return tabState;
      const index = tabState.findIndex((tab) => tab.id == action.payload);
      if (index === 0) return tabState;
      const [shiftingTabBar] = newTabState.splice(index, 1);
      newTabState.splice(index - 1, 0, shiftingTabBar);
      console.log('MOVEUP: ', newTabState);

      return newTabState;
    case 'moveDown':
      console.log('moveDown');
      return newTabState;
    case 'remove':
      console.log('remove');
      return newTabState;
    case 'add':
      keyCount++;
      newTabState = [
        ...tabState,
        {
          id: keyCount,
          key: keyCount,
          idx: tabState.length,
          title: '',
          tabLines: ['e |', 'B |', 'D |', 'G |', 'A |', 'E |'],
        },
      ];
      console.log('add: ', newTabState);

    case 'rename':
      console.log('Payload: ', action.payload);
      if (action.payload === undefined) return newTabState;
      newTabState[action.payload.idx].title = action.payload.value;
      return newTabState;

    case 'newNote':
      console.log('newNote', action.payload);
      newTabState[0].tabLines = newTabState[0].tabLines.map((line, i) =>
        i === action.payload.stringIdx - 1 ? (line += '--' + action.payload.noteIdx) : (line += '---'),
      );
      return newTabState;

    default:
      console.log('REDUCER ERROR!', action);
      return tabState;
  }
}

function App() {
  const [focusTab, setFocusTab] = useState(0);
  const [tabState, dispatch] = useReducer(reducer, [
    {
      id: keyCount,
      key: keyCount,
      idx: 0,
      title: '',
      tabLines: ['e |', 'B |', 'D |', 'G |', 'A |', 'E |'],
    },
  ]);

  useEffect(() => {
    console.log('App: Updated ', tabState);
  }, [tabState]);

  return (
    <div>
      <Guitar key={0} dispatch={dispatch} />
      <TabContainer key={1} tabState={tabState} dispatch={dispatch} />
    </div>
  );
}

export default App;
