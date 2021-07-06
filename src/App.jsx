import React, { useState, useReducer, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrash, faArrowUp, faArrowDown);

import Guitar from './Guitar/Guitar';
import TabContainer from './Tab/TabContainer';

// React-element keys.
let keyCount = 0;

// Init TabBar state.
const initState = [
  {
    id: keyCount,
    key: keyCount,
    idx: 0,
    title: '',
    tabLines: ['e |', 'B |', 'D |', 'G |', 'A |', 'E |'],
  },
];

function App() {
  const [focus, setFocus] = useState({ tabIdx: 0, lineIdx: 3 }); // Decides which TabBar is focused. Also on the Y-axis.
  const [tabState, dispatch] = useReducer(reducer, initState);

  // Reducer managing TabBar state.
  function reducer(tabState, action) {
    let newTabState = JSON.parse(JSON.stringify(tabState)); // Deepcopy otherwise the tabLines get mutated, causing bugs.
    let index;
    let shiftingTabBar;

    // User click on "move up"-button. Tab is moved one index backwards.
    switch (action.type) {
      case 'moveUp':
        setFocus({
          tabIdx: action.payload,
          lineIdx: tabState[action.payload].tabLines[0].length,
        });
        if (tabState.length <= 1) return tabState;
        index = tabState.findIndex((tab) => tab.id == action.payload);
        if (index === 0) return tabState;
        [shiftingTabBar] = newTabState.splice(index, 1);
        newTabState.splice(index - 1, 0, shiftingTabBar);
        return newTabState;

      // User click on "move down"-button. Tab is moved one index forward.
      case 'moveDown':
        setFocus({
          tabIdx: action.payload,
          lineIdx: tabState[action.payload].tabLines[0].length,
        });
        if (tabState.length <= 1) return tabState;
        index = tabState.findIndex((tab) => tab.id == action.payload);
        if (index === tabState.length - 1) return tabState;
        [shiftingTabBar] = newTabState.splice(index, 1);
        newTabState.splice(index + 1, 0, shiftingTabBar);
        return newTabState;

      // User click "remove"-button. Tab is removed from state.
      case 'remove':
        if (tabState.length === 1) return [];
        index = tabState.findIndex((tab) => tab.id == action.payload);
        newTabState.splice(index, 1);
        return newTabState;

      // User clicks "add"-button. A new tab is added to the state.
      case 'add':
        keyCount++;
        console.log(action.payload);
        setFocus({
          tabIdx: tabState.length,
          lineIdx: 3,
        });
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
        return newTabState;

      // Will update on TabBar "title"-input onChange.
      case 'rename':
        if (action.payload === undefined) return newTabState;
        newTabState[action.payload.idx].title = action.payload.value;
        return newTabState;

      // Update text in tabs whenever a note on the guitar is clicked.
      case 'newNote':
        setFocus((prevFocus) => ({ ...prevFocus, lineIdx: tabState[prevFocus.tabIdx].tabLines[0].length + 3 }));
        newTabState[focus.tabIdx].tabLines = newTabState[focus.tabIdx].tabLines.map(
          (line, i) => (line += i === action.payload.stringIdx - 1 ? '--' + action.payload.noteIdx : '---'),
        );
        return newTabState;

      default:
        console.log('REDUCER ERROR!', action);
        return tabState;
    }
  }

  // When user clicks a TabBar the focus is moved to the end of it.
  function handleFocus(tabIdx, lineIdx) {
    if (tabIdx === focus.tabIdx && lineIdx === focus.lineIdx) return;
    setFocus({ tabIdx: tabIdx, lineIdx: lineIdx });
  }

  useEffect(() => {
    console.log('tabState Changed: ', tabState);
  }, [tabState]);

  useEffect(() => {
    console.log('focus Changed: ', focus);
  }, [focus]);

  return (
    <div>
      <Guitar key={0} dispatch={dispatch} />
      <TabContainer key={1} tabState={tabState} dispatch={dispatch} handleFocus={handleFocus} focus={focus} />
    </div>
  );
}

export default App;
