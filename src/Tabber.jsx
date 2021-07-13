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
  NEWCHORD: 'shift',
  SETTABINDEX: 'setTabIndex',
};

// React-element keys.
let keyCount = 1;

// Init TabBar state.
const initState = [
  {
    id: 0,
    key: 0,
    title: '',
    tabLines: ['', '', '', '', '', ''],
  },
];

function Tabber() {
  const [legendNotation, setLegendNotation] = useState('');
  const [chordBuilder, setChordBuilder] = useState({ active: false, string: ['', '', '', '', '', ''] });
  const [marker, setMarker] = useState({ tabIdx: 0, yIdx: 3, stringIdx: 0 }); // Sets tab-marker.
  const [tabState, dispatch] = useReducer(reducer, initState);
  const [tuning, setTuning] = useState(['E', 'B', 'G', 'D', 'A', 'E']); // Chosen guitar tuning.

  // Reducer managing TabBar state.
  function reducer(tabState, action) {
    let newTabState = JSON.parse(JSON.stringify(tabState)); // Deepcopy otherwise the tabLines get mutated, causing bugs.

    // User click on "move up"-button. Tab is moved one index backwards.
    switch (action.type) {
      case ACTIONS.MOVEUP:
        if (tabState.length <= 1 || action.payload === 0) return newTabState;
        const [movingUp] = newTabState.splice(action.payload, 1);
        newTabState.splice(action.payload - 1, 0, movingUp);
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: action.payload, yIdx: newTabState[action.payload].tabLines[0].length + 3 };
        });
        return newTabState;

      // User click on "move down"-button. Tab is moved one index forward.
      case ACTIONS.MOVEDOWN:
        if (tabState.length <= 1 || action.payload === newTabState.length) return newTabState;
        const [movingDown] = newTabState.splice(action.payload, 1);
        newTabState.splice(action.payload + 1, 0, movingDown);
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: action.payload, yIdx: newTabState[action.payload].tabLines[0].length + 3 };
        });
        return newTabState;

      // User click "remove"-button. Tab is removed from state.
      case ACTIONS.REMOVE:
        console.log('REMOVE!: ', action.payload);

        // Deleting tab indexed before marker will move marker to match the new index for the marked tab.
        if (action.payload < marker.tabIdx)
          setMarker((prevMarker) => ({
            ...prevMarker,
            tabIdx: prevMarker.tabIdx - 1,
            yIdx: tabState[action.payload].tabLines[0].length + 3,
          }));
        // Deleting the tab marked will remove marker.
        else if (action.payload === marker.tabIdx) {
          setMarker({ tabIdx: -1, stringIdx: -1, yIdx: -1 });
        }
        // setMarker({ tabIdx: action.payload, yIdx: tabState[action.payload].tabLines[0].length + 3 });
        return newTabState.filter((tab, i) => i !== action.payload);

      // User clicks "add"-button. A new tab is added to the state.
      case ACTIONS.ADD:
        keyCount++;
        setMarker((prevMarker) => {
          return { ...prevMarker, tabIdx: tabState.length, yIdx: 3 };
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
        console.log('NEWNOTE');

        // If no tab is marked no changes are done.
        if (marker.tabIdx === -1) return tabState;

        //Handling notes following a notation.
        if (legendNotation !== '') {
          // If note is NOT on same string as the notation the notation is wiped.
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

        // If chordBuilder is turned on.
        else if (chordBuilder === 'shift') {
          // Om vi har en double digit og en single digit skal den line opp med siste digit i double.
          // --12--
          // ---2--

          //

          //If a note is chosen for that string already it will be swapped.
          const line = newTabState[marker.tabIdx].tabLines[action.payload.stringId];
          console.log('LENGTH ', action.payload.fretId.toString().length);

          const replacementNote =
            action.payload.fretId.toString().length > 1
              ? action.payload.fretId.toString()
              : '-' + action.payload.fretId.toString();
          console.log('first Line: ', line);
          const newLine = line.replace(/..$/, replacementNote);
          console.log('new Line: ', newLine);

          // if (newTabState[marker.tabIdx].tabLines[action.payload.stringId].length + 3 > marker.yIdx) {
          //   console.log('SHIFTTT');
          //   // bytte ut noten med den nye.
          //   newTabState[marker.tabIdx].tabLines.map((line) => {
          //     console.log('SHIFT LINE: ', line);
          //     return line;
          //   });
          //   return tabState;
          // }

          // newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map(
          //   (line, i) => (line += i === action.payload.stringId ? action.payload.fretId : ''),
          // );
          return tabState;
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

      case ACTIONS.NEWCHORD:
        console.log('NEW CHORD');
        // Chord skal være på helt til bruker trykker den av. (eller trykker to ganger på samme linje)
        // Marker skal ikke flytte seg før chord er av igjen.

        setChordBuilder((prevChordBuilder) => ({
          active: !prevChordBuilder.active,
        }));

        // If another notation is chosen it will remove it and switch to chordBuilder.
        if (legendNotation !== '') {
          setLegendNotation('');
          newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) =>
            line.substr(0, line.length - 1),
          );
          setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx - 1 }));
        }

        // User click on shift and chord-mode is turned off.
        if (chordBuilder.active === false) {
          console.log('Chord Mode off.');
        }

        // // Adding two lines to each tabLine before chordBuilding.
        // newTabState[marker.tabIdx].tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) => (line += '--'));
        // setMarker((prevMarker) => ({ ...prevMarker, yIdx: prevMarker.yIdx + 2 }));

        return newTabState;

      // Helper method to find index off tab.
      case ACTIONS.SETTABINDEX:
        const newTabIdx = tabState.findIndex((tab) => action.payload.tabId === tab.id);
        if (newTabIdx === -1) return tabState;
        console.log('SETTABIDX: ', newTabIdx);
        setMarker({ tabIdx: newTabIdx, yIdx: tabState[newTabIdx].tabLines[0].length + 3 });
        return tabState;

      // Function to align tabLines to latest digit.
      // case 'alignTabLines':
      //   newTabState.tabLines = newTabState[marker.tabIdx].tabLines.map((line, i) => {
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

  function handleLegendNotation(notation) {
    // If the Chord legend button is clicked.
    if (notation === 'shift') dispatch({ type: ACTIONS.NEWCHORD });
    else dispatch({ type: ACTIONS.NOTATION, payload: { notation: notation } });
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
        chordBuilder={chordBuilder}
      />
      <TabContainer key={1} tabState={tabState} dispatch={dispatch} marker={marker} tuning={tuning} />
      <button onClick={() => dispatch({ type: 'alignTabLines' })}>Align</button>
      <button onClick={() => tabIndex(4)}>tabIndexTest</button>
    </div>
  );
}

export default Tabber;
