import React, { useState, useReducer, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faTrash, faArrowUp, faArrowDown);

import TabContainer from './Tab/TabContainer';
import GuitarTuning from './Guitar/GuitarTuning';
import GuitarNeck from './Guitar/GuitarNeck';
import GuitarLegend from './Guitar/GuitarLegend';
import GuitarString from './Guitar/GuitarString';
import GuitarDashboard from './Guitar/GuitarDashboard';
import TabBar from './Tab/TabBar';

export const ACTIONS = {
  MOVE_UP: 'moveUp',
  MOVE_DOWN: 'moveDown',
  REMOVE: 'remove',
  ADD: 'add',
  RENAME: 'rename',
  ADD_NOTE: 'addNote',
  NOTATION: 'notation',
  CHORD: 'shift',
  CLICK_TAB: 'setTabIndex',
};

// Init TabBar state.
const initState = {
  tabBar: [
    {
      id: 0,
      key: 0,
      title: '',
      tabLines: ['', '', '', '', '', ''],
    },
  ],
  notation: '',
  marker: { tabIdx: 0, yIdx: 0, stringIdx: 0 },
  keyCounter: 1,
};

function Tabber() {
  const [chordBuilder, setChordBuilder] = useState({ active: false, string: ['', '', '', '', '', ''] });
  const [tabState, dispatch] = useReducer(reducer, initState);
  const [tuning, setTuning] = useState(['E', 'B', 'G', 'D', 'A', 'E']); // Chosen guitar tuning.

  // Reducer managing TabBar state.
  function reducer(tabState, action) {
    console.log('REDUCER START: ', action);
    let newTabState = JSON.parse(JSON.stringify(tabState)); // Deepcopy otherwise the tabLines get mutated, causing bugs.
    const { notation, marker, keyCounter } = newTabState;

    // User click on "move up"-button. Tab is moved one index backwards.
    switch (action.type) {
      case ACTIONS.MOVE_UP:
        if (tabState.tabBar.length <= 1 || action.payload.tabIdx === 0) return newTabState;
        if (notation !== '') {
          newTabState.tabBar[action.payload.tabIdx] = removeTabStringY(tabState.tabBar[action.payload.tabIdx], 1);
          newTabState.notation = '';
        }
        const [movingUp] = newTabState.tabBar.splice(action.payload.tabIdx, 1);
        newTabState.tabBar.splice(action.payload.tabIdx - 1, 0, movingUp);
        newTabState.marker = {
          ...marker,
          tabIdx: action.payload.tabIdx - 1,
          yIdx: newTabState.tabBar[action.payload.tabIdx - 1].tabLines[0].length,
        };

        return newTabState;

      // User click on "move down"-button. Tab is moved one index forward.
      case ACTIONS.MOVE_DOWN:
        if (tabState.tabBar.length <= 1 || action.payload.tabIdx === newTabState.tabBar.length - 1) return newTabState;
        if (notation !== '') {
          newTabState.tabBar[action.payload.tabIdx] = removeTabStringY(tabState.tabBar[action.payload.tabIdx], 1);
          newTabState.notation = '';
        }
        const [movingDown] = newTabState.tabBar.splice(action.payload.tabIdx, 1);
        newTabState.tabBar.splice(action.payload.tabIdx + 1, 0, movingDown);
        newTabState.marker = {
          ...marker,
          tabIdx: action.payload.tabIdx + 1,
          yIdx: newTabState.tabBar[action.payload.tabIdx + 1].tabLines[0].length,
        };

        return newTabState;

      // User click "remove"-button. Tab is removed from state.
      case ACTIONS.REMOVE:
        if (notation !== '') newTabState.notation = '';

        // Deleting tab indexed before marker will move marker to match the new index for the marked tab.
        if (action.payload.tabIdx < marker.tabIdx)
          newTabState.marker = {
            ...marker,
            tabIdx: marker.tabIdx - 1,
            yIdx: newTabState.tabBar[action.payload.tabIdx].tabLines[0].length,
          };
        // Deleting the tab marked will remove marker.
        else if (action.payload.tabIdx === marker.tabIdx) {
          newTabState.marker = { tabIdx: -1, stringIdx: -1, yIdx: -1 };
        }
        newTabState.tabBar = newTabState.tabBar.filter((tabBar, i) => i !== action.payload.tabIdx);
        return newTabState;

      // User clicks "add"-button. A new tab is added to the state.
      case ACTIONS.ADD:
        newTabState.keyCounter++;

        // Remove and toggle notation on previous marked tab off.
        if (notation !== '') {
          newTabState.tabBar[marker.tabIdx] = removeTabStringY(newTabState.tabBar[marker.tabIdx], 1);
          newTabState.notation = '';
        }
        newTabState.marker = { ...marker, tabIdx: tabState.tabBar.length, yIdx: 0 };
        newTabState.tabBar.push({
          id: keyCounter,
          key: keyCounter,
          title: '',
          tabLines: ['', '', '', '', '', ''],
        });
        return newTabState;

      // Updates TabBar title on input-onChange.
      case ACTIONS.RENAME:
        newTabState.tabBar[action.payload.tabIdx].title = action.payload.title;
        return newTabState;

      // Update text in tabs whenever a note on the guitar is clicked.
      case ACTIONS.ADD_NOTE:
        // If no tab is marked no changes are done.
        if (marker.tabIdx === -1) return tabState;

        // Handling notes following a notation.
        if (notation !== '') {
          // If note is NOT on same string as the notation the notation is wiped.
          if (action.payload.stringId !== marker.stringIdx) {
            newTabState.tabBar[marker.tabIdx] = removeTabStringY(newTabState.tabBar[marker.tabIdx], 1);
            newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
          }

          // If note is on the same string as the notation the note is added.
          else {
            // Adds clicked note-fret to targeted tabBar string. Add matching dashes to sibling strings and moves marker.
            newTabState.tabBar[marker.tabIdx] = addFretAndDashes(
              newTabState.tabBar[marker.tabIdx],
              action.payload.fretId,
              action.payload.stringId,
              notation,
            );

            newTabState.marker = {
              ...marker,
              stringIdx: action.payload.stringId,
              yIdx: newTabState.tabBar[marker.tabIdx].tabLines[0].length,
            };
          }
          newTabState.notation = '';
        }

        // Handling notes if ChordBuilder is turned on.
        else if (chordBuilder === 'shift') {
          // Om vi har en double digit og en single digit skal den line opp med siste digit i double.
          // --12--
          // ---2--
        }

        // Handling notes without notation.
        else {
          // Adds clicked note-fret to targeted tabBar string. Add matching dashes to sibling strings and moves marker.
          newTabState.tabBar[marker.tabIdx] = addFretAndDashes(
            newTabState.tabBar[marker.tabIdx],
            action.payload.fretId,
            action.payload.stringId,
            notation,
          );
          newTabState.marker = {
            ...marker,
            stringIdx: action.payload.stringId,
            yIdx: newTabState.tabBar[marker.tabIdx].tabLines[0].length,
          };
        }
        return newTabState;

      case ACTIONS.NOTATION:
        // Not allowed to add notation at the beginning of tabBar.
        if (marker.yIdx <= 0) {
          newTabState.notation = '';
          return newTabState;
        }

        // If user clicks the same notation-button again it will toggle off.
        if (notation === action.payload.notation) {
          newTabState.tabBar[marker.tabIdx] = removeTabStringY(newTabState.tabBar[marker.tabIdx], 1);
          newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
          newTabState.notation = '';
          return newTabState;
        }

        // If user clicks another notationbutton before adding the followup note the notations will swap.
        if (notation !== '' && action.payload.notation !== notation) {
          newTabState.tabBar[marker.tabIdx] = removeTabStringY(newTabState.tabBar[marker.tabIdx], 1);
          newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
        }

        // Adds notation following previous note.
        newTabState.tabBar[marker.tabIdx].tabLines = newTabState.tabBar[marker.tabIdx].tabLines.map(
          (line, i) => (line += i === marker.stringIdx ? action.payload.notation : '-'),
        );
        newTabState.marker = { ...marker, yIdx: marker.yIdx + 1 };
        newTabState.notation = action.payload.notation;
        return newTabState;

      case ACTIONS.CHORD:
        // Chord skal være på helt til bruker trykker den av. (eller trykker to ganger på samme linje)
        // Marker skal ikke flytte seg før chord er av igjen.

        // Toggle ChordBuilder on and off.
        setChordBuilder((prevChordBuilder) => ({
          active: !prevChordBuilder.active,
        }));

        // If another notation is chosen it will remove it and switch to chordBuilder.
        if (notation !== '') {
          newTabState.tabBar[marker.tabIdx] = removeTabStringY(newTabState.tabBar[marker.tabIdx], 1);
          newTabState.notation = '';
          newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
        }

        // Adding two lines to each tabLine before chordBuilding.

        return newTabState;

      // Helper method to find index off tab. CHECK IF THIS CAN BE MOVED OUTSIDE OF REDUCER!
      case ACTIONS.CLICK_TAB:
        // Remove and toggle notation on previous marked tab off.
        if (notation !== '') {
          newTabState.tabBar[marker.tabIdx] = removeTabStringY(newTabState.tabBar[marker.tabIdx], 1);
          newTabState.notation = '';
        }

        // Sets last edited string as marked string. THIS CODEBIT NEEDS REFACTORING.
        let prevStringIdx = -1;
        tabState.tabBar[action.payload.tabIdx].tabLines.forEach((line, i) => {
          if (!line.endsWith('-') && prevStringIdx === -1) prevStringIdx = i;
        });

        newTabState.marker = {
          tabIdx: action.payload.tabIdx,
          stringIdx: prevStringIdx,
          yIdx: tabState.tabBar[action.payload.tabIdx].tabLines[0].length,
        };
        return newTabState;

      // Function to align tabLines to latest digit.
      // case 'alignTabLines':
      //   newTabState.tabBar.tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) => {
      //     line[line.length + i - 1]
      //   });
      //   return newTabState;

      default:
        console.log('REDUCER ERROR!', action);
        return tabState;
    }
  }

  // // When user clicks a TabBar the marker is moved to the end of it.
  // function handleMarker(tabIdx, lineIdx) {
  //   if (tabIdx === marker.tabIdx && lineIdx === marker.yIdx) return;
  //   setMarker({ tabIdx: findTabIndex(), yIdx: lineIdx });
  // }

  useEffect(() => {
    console.log('TabBar Changed: ', tabState.tabBar);
  }, [tabState.tabBar]);

  useEffect(() => {
    console.log('Marker Changed: ', tabState.marker);
  }, [tabState.marker]);

  useEffect(() => {
    console.log('Tuning Changed: ', tuning);
  }, [tuning]);

  useEffect(() => {
    console.log('Notation Changed: ', tabState.notation);
  }, [tabState.notation]);

  useEffect(() => {
    console.log('ChordBuilder Changed: ', chordBuilder);
  }, [chordBuilder]);

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

  function handleNotation(notation) {
    // If the Chord legend button is clicked.
    if (notation === 'shift') dispatch({ type: ACTIONS.CHORD });
    else dispatch({ type: ACTIONS.NOTATION, payload: { notation: notation } });
  }

  // Pure function. Adds fret of note to one string and matching dashes on others. Returns tabBar of tabState.
  function addFretAndDashes(tabBar, fret, string, notation) {
    let newTabBar = JSON.parse(JSON.stringify(tabBar)); // Deep clone for immutability.
    if (notation !== '') {
      if (fret < 10) {
        newTabBar.tabLines = newTabBar.tabLines.map((line, i) => (line += i === string ? fret : '-'));
      } else {
        newTabBar.tabLines = newTabBar.tabLines.map((line, i) => (line += i === string ? fret : '--'));
      }
    } else if (notation === '') {
      if (fret < 10) {
        newTabBar.tabLines = newTabBar.tabLines.map((line, i) => (line += i === string ? '--' + fret : '---'));
      } else {
        newTabBar.tabLines = newTabBar.tabLines.map((line, i) => (line += i === string ? '--' + fret : '----'));
      }
    }
    return newTabBar;
  }

  // Pure function. Removes n-chars from each string of selected tab. Returns tab of tabState
  function removeTabStringY(tabBar, deleteCount) {
    let newTabBar = JSON.parse(JSON.stringify(tabBar)); // Deep clone for immutability.
    newTabBar.tabLines = newTabBar.tabLines.map((line) => line.substr(0, line.length - deleteCount));
    return newTabBar;
  }

  return (
    <div>
      <GuitarDashboard>
        <GuitarTuning key={0} tuning={tuning} changeTuning={changeTuning} changeTuner={changeTuner} />

        <GuitarNeck key={1} dispatch={dispatch} tuning={tuning}>
          {tuning.map((tuning, i) => (
            <GuitarString key={i} id={i} dispatch={dispatch} tuning={tuning} />
          ))}
        </GuitarNeck>

        <GuitarLegend
          key={2}
          handleNotation={handleNotation}
          dispatch={dispatch}
          notation={tabState.notation}
          chordBuilder={chordBuilder}
        />
      </GuitarDashboard>

      <TabContainer key={1} dispatch={dispatch}>
        {/* <TabInfo key={1000} songProgress="test" /> */}
        {tabState.tabBar.map((tabBar, i) => (
          <TabBar
            key={tabBar.key}
            idx={i}
            tabBar={tabBar}
            dispatch={dispatch}
            marker={tabState.marker}
            tuning={tuning}
          />
        ))}
      </TabContainer>

      <button onClick={() => dispatch({ type: 'alignTabLines' })}>Align</button>
      <button onClick={() => dispatch({ type: ACTIONS.MOVE_UP })}>moveUpTest</button>
      <button onClick={() => tabIndex(4)}>tabIndexTest</button>
    </div>
  );
}

export default Tabber;
