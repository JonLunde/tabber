import React, { useState, useReducer, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrash, faArrowUp, faArrowDown);

import Guitar from './Guitar/Guitar';
import TabContainer from './Tab/TabContainer';

export const ACTIONS = {
  MOVEUP: 'moveUp',
  MOVEDOWN: 'moveDown',
  REMOVE: 'remove',
  ADD: 'add',
  RENAME: 'rename',
  NEWNOTE: 'newNote',
  NOTATION: 'notation',
};

// React-element keys.
let keyCount = 0;

// Init TabBar state.
const initState = [
  {
    id: keyCount,
    key: keyCount,
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
      case ACTIONS.MOVEUP:
        const iMoveUp = newTabState.findIndex((tab) => tab.id == action.payload);
        if (tabState.length <= 1 || iMoveUp === 0) return tabState;
        const [movingUp] = newTabState.splice(iMoveUp, 1);
        newTabState.splice(iMoveUp - 1, 0, movingUp);
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: action.payload, yIdx: newTabState[iMoveUp].tabLines[0].length + 3 };
        });
        return newTabState;

      // User click on "move down"-button. Tab is moved one index forward.
      case ACTIONS.MOVEDOWN:
        const iMoveDown = newTabState.findIndex((tab) => tab.id == action.payload);
        if (tabState.length <= 1 || iMoveDown === newTabState.length) return tabState;
        const [movingDown] = newTabState.splice(iMoveDown, 1);
        newTabState.splice(iMoveDown + 1, 0, movingDown);
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: action.payload, yIdx: newTabState[iMoveDown].tabLines[0].length + 3 };
        });
        return newTabState;

      // User click "remove"-button. Tab is removed from state.
      case ACTIONS.REMOVE:
        return newTabState.filter((tab) => tab.id !== action.payload);

      // User clicks "add"-button. A new tab is added to the state.
      case ACTIONS.ADD:
        keyCount++;
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: newTabState.length, yIdx: 3 };
        });
        return (newTabState = [
          ...tabState,
          {
            id: keyCount,
            key: keyCount,
            title: '',
            tabLines: ['', '', '', '', '', ''],
          },
        ]);

      // Updates TabBar title on input-onChange.
      case ACTIONS.RENAME:
        return newTabState.map((tab) => {
          if (tab.id === action.payload.id) return { ...tab, title: action.payload.title };
          return tab;
        });

      // Update text in tabs whenever a note on the guitar is clicked.
      case ACTIONS.NEWNOTE:
        //Handling notes following a notation.
        if (legendNotation !== '') {
          // If note is not on same string as the notation the notation is wiped.
          if (action.payload.stringId !== marker.stringIdx) {
            newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) =>
              line.substr(0, line.length - 1),
            );
            setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx - 1 }));
          }

          // If note is on the same string as the notation the note is added.
          else {
            //Handles double digit notes with extra dashes on the other strings. And correct marker.
            if (action.payload.fretId < 10) {
              newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
                (line, i) => (line += i === action.payload.stringId ? action.payload.fretId : '-'),
              );
              setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx + 1 }));
            } else {
              newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
                (line, i) => (line += i === action.payload.stringId ? action.payload.fretId : '--'),
              );
              setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx + 2 }));
            }
          }
          setLegendNotation('');
        }

        // Handling notes without notation.
        else {
          // Handling double digit notes.
          if (action.payload.fretId < 10) {
            newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
              (line, i) => (line += i === action.payload.stringId ? '--' + action.payload.fretId : '---'),
            );
            setMarker((prevMarker) => ({
              ...prevMarker,
              stringIdx: action.payload.stringId,
              yIdx: newTabState[marker.tabIdx].tabLines[0].length + 3,
            }));
          } else {
            newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
              (line, i) => (line += i === action.payload.stringId ? '--' + action.payload.fretId : '----'),
            );
            setMarker((prevMarker) => ({
              ...prevMarker,
              stringIdx: action.payload.stringId,
              yIdx: newTabState[marker.tabIdx].tabLines[0].length + 3,
            }));
          }
        }
        return newTabState;

      case ACTIONS.NOTATION:
        // Not allowed to add notation at the beginning of tabBar.
        if (marker.yIdx <= 3) {
          setLegendNotation('');
          return newTabState;
        }

        // If user clicks the same notationbutton again it will toggle off.
        if (legendNotation === action.payload.notation) {
          newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) =>
            line.substr(0, line.length - 1),
          );
          setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx - 1 }));
          setLegendNotation('');
          return newTabState;
        }

        // If user clicks another notationbutton before adding the followup note the notations will swap.
        if (legendNotation !== '' && action.payload.notation !== legendNotation) {
          newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) =>
            line.substr(0, line.length - 1),
          );
          setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx - 1 }));
        }
        // Adds notation following previous note.
        newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
          (line, i) => (line += i === marker.stringIdx ? action.payload.notation : '-'),
        );
        setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx + 1 }));
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
  }, [legendNotation]);

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
    dispatch({ type: ACTIONS.NOTATION, payload: { notation: notation } });
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
