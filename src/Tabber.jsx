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
    tabLines: ['', '', '', '', '', ''],
  },
];

function Tabber() {
  const [legendNotation, setLegendNotation] = useState('');
  const [marker, setMarker] = useState({ tabIdx: 0, yIdx: 3, stringIdx: 0 }); // Sets marker.
  const [tabState, dispatch] = useReducer(reducer, initState);
  const [tuning, setTuning] = useState(['E', 'B', 'G', 'D', 'A', 'E']); // Chosen guitar tuning.

  // Reducer managing TabBar state.
  function reducer(tabState, action) {
    let newTabState = JSON.parse(JSON.stringify(tabState)); // Deepcopy otherwise the tabLines get mutated, causing bugs.
    let index;
    let shiftingTabBar;

    // User click on "move up"-button. Tab is moved one index backwards.
    switch (action.type) {
      case 'moveUp':
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: action.payload, yIdx: tabState[action.payload].tabLines[0].length };
        });
        if (tabState.length <= 1) return tabState;
        index = tabState.findIndex((tab) => tab.id == action.payload);
        if (index === 0) return tabState;
        [shiftingTabBar] = newTabState.splice(index, 1);
        newTabState.splice(index - 1, 0, shiftingTabBar);
        return newTabState;

      // User click on "move down"-button. Tab is moved one index forward.
      case 'moveDown':
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: action.payload, yIdx: tabState[action.payload].tabLines[0].length };
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
        setMarker({
          tabIdx: tabState.length,
          yIdx: 3,
        });
        newTabState = [
          ...tabState,
          {
            id: keyCount,
            key: keyCount,
            idx: tabState.length,
            title: '',
            tabLines: ['', '', '', '', '', ''],
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
        console.log('Reduce newNote');

        if (legendNotation !== '') {
          console.log('TEST: ', tabState);
          if (marker.stringIdx !== action.payload.stringIdx) return newTabState;
          newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
            (line, i) =>
              action.payload.fretIdx < 10
                ? (line += i === action.payload.stringIdx ? action.payload.fretIdx : '-') // Puts a note on the string according to the note clicked and corresponding dashes on other strings.
                : (line += i === action.payload.stringIdx ? action.payload.fretIdx : '--'), // Handles double digit notes.
          );
        } else {
          newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
            (line, i) =>
              action.payload.fretIdx < 10
                ? (line += i === action.payload.stringIdx ? '--' + action.payload.fretIdx : '---') // Puts a note on the string according to the note clicked and corresponding dashes on other strings.
                : (line += i === action.payload.stringIdx ? '--' + action.payload.fretIdx : '----'), // Handles double digit notes.
          );
        }

        setMarker((prevMarker) => {
          let dashes = action.payload.fretIdx < 10 ? 6 : 7; // Correct marker for double digit notes.
          if (legendNotation !== '') dashes -= 2; // Handles marker for notations.

          const newMarker = {
            ...prevMarker,
            yIdx: tabState[prevMarker.tabIdx].tabLines[0].length + dashes,
            stringIdx: action.payload.stringIdx,
          };
          return newMarker;
        });

        setLegendNotation('');
        return newTabState;

      case 'notation':
        console.log('Reduce notation: ', legendNotation, marker);
        if (marker.yIdx < 4) {
          setLegendNotation('');
          console.log('testTabState: ', tabState);
          return tabState;
        }
        if (legendNotation !== '') {
          return tabState;
        }
        setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx + 1 }));
        newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
          (line, i) => (line += i === marker.stringIdx ? action.payload.notation : '-'), // Puts a note on the string according to the note clicked and corresponding dashes on other strings.
        );
        setLegendNotation(action.payload.notation);
        return newTabState;

      default:
        console.log('REDUCER ERROR!', action);
        return tabState;
    }
  }

  // When user clicks a TabBar the marker is moved to the end of it.
  function handleMarker(tabIdx, lineIdx) {
    if (tabIdx === marker.tabIdx && lineIdx === marker.yIdx) return;
    setMarker({ tabIdx: tabIdx, yIdx: lineIdx });
  }

  useEffect(() => {
    console.log('TabState Changed: ', tabState);
  }, [tabState]);

  useEffect(() => {
    console.log('Marker Changed: ', marker);
  }, [marker]);

  useEffect(() => {
    console.log('Tuning Changed: ', tuning);
  }, [tuning]);

  useEffect(() => {
    console.log('Notation Changed: ', legendNotation);
  }, [tuning]);

  function changeTuning(tuningIdx) {
    let chosenTuning = [];
    switch (tuningIdx) {
      case '1':
        chosenTuning = ['E', 'B', 'G', 'D', 'A', 'E'];
        break;
      case '2':
        chosenTuning = ['D', 'A', 'F', 'C', 'G', 'D'];
        break;
      default:
        console.log('GUITARNECK SWITCH ERROR!');
        break;
    }
    setTuning(chosenTuning);
  }

  function changeTuner(note, i) {
    setTuning((prevTuning) => {
      let newTuning = [...prevTuning];
      newTuning[i] = note;
      return newTuning;
    });
  }

  function handleLegendNotation(notation) {
    dispatch({ type: 'notation', payload: { notation: notation } });
    console.log('handleNotation:  ', legendNotation);
  }

  return (
    <div>
      <Guitar
        key={0}
        dispatch={dispatch}
        tuning={tuning}
        changeTuning={changeTuning}
        changeTuner={changeTuner}
        handleLegendNotation={handleLegendNotation}
        legendNotation={legendNotation}
      />
      <TabContainer
        key={1}
        tabState={tabState}
        dispatch={dispatch}
        handleMarker={handleMarker}
        marker={marker}
        tuning={tuning}
      />
    </div>
  );
}

export default Tabber;
