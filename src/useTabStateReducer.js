/* eslint-disable no-case-declarations */
import { useReducer } from 'react';

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
  CHANGE_DETAILS: 'changeDetails',
};

// Init TabBar state.
const initState = {
  tabDetails: { title: '', artist: '', capo: '', source: '' },
  tabBars: [
    {
      id: 0,
      key: 0,
      title: '',
      tabLines: ['', '', '', '', '', ''],
    },
  ],
  notation: null,
  chordBuilder: { active: false, strings: [[], [], [], [], [], []] },
  marker: { tabIdx: 0, yIdx: 0, stringIdx: 0 },
  keyCounter: 1,
  activeNote: { string: null, fret: null },
  activeString: null,
};

function addChord(tabBar, chord) {
  const newTabBar = JSON.parse(JSON.stringify(tabBar)); // Deep clone for immutability.

  // Checks if any of the chordNotes are double digit.
  let isDoubleDigit = false;
  chord.strings.forEach((string) => {
    string.forEach((chordNote) => {
      if (chordNote > 10) isDoubleDigit = true;
    });
  });

  if (isDoubleDigit) {
    // Gå gjennom array og skrive verdi til tabLine med --
    chord.strings.forEach((string, i) => {
      if (string.length > 0) {
        newTabBar.tabLines[i] += string[0] < 10 ? `-${string[0]}` : string[0];
      } else {
        newTabBar.tabLines[i] += '--';
      }
    });
  } else {
    chord.strings.forEach((string, i) => {
      if (string.length > 0) {
        newTabBar.tabLines[i] += string[0];
      } else {
        newTabBar.tabLines[i] += '-';
      }
    });
  }
  return newTabBar;
}

// Pure function. Adds fret of note to one string and matching dashes on others. Returns tabBar of tabState.
function addFretAndDashes(tabBar, notation = null, noteFret = null, string = null) {
  const newTabBar = JSON.parse(JSON.stringify(tabBar)); // Deep clone for immutability.

  // If no note is provided it adds dashes only.
  if (noteFret === null || undefined || string === null || undefined) {
    newTabBar.tabLines = newTabBar.tabLines.map((line, i) => {
      let newLine = line;
      newLine += i === string ? noteFret : '--';
      return newLine;
    });
    return newTabBar;
  }

  // If there is a notation it adds note directly after it.
  if (notation !== null) {
    if (noteFret < 10) {
      newTabBar.tabLines = newTabBar.tabLines.map((line, i) => {
        let newLine = line;
        newLine += i === string ? noteFret : '-';
        return newLine;
      });
    } else {
      newTabBar.tabLines = newTabBar.tabLines.map((line, i) => {
        let newLine = line;
        newLine += i === string ? noteFret : '--';
        return newLine;
      });
    }
  }
  // Otherwise it adds two dashes before note for separation.
  else if (notation === null) {
    if (noteFret < 10) {
      newTabBar.tabLines = newTabBar.tabLines.map((line, i) => {
        let newLine = line;
        newLine += i === string ? `--${noteFret}` : '---';
        return newLine;
      });
    } else {
      newTabBar.tabLines = newTabBar.tabLines.map((line, i) => {
        let newLine = line;
        newLine += i === string ? `--${noteFret}` : '----';
        return newLine;
      });
    }
  }
  return newTabBar;
}

// Pure function. Removes n-chars from each string of selected tab. Returns tab of tabState
function removeTabStringY(tabBar, deleteCount) {
  const newTabBar = JSON.parse(JSON.stringify(tabBar)); // Deep clone for immutability.
  newTabBar.tabLines = newTabBar.tabLines.map((line) => line.substr(0, line.length - deleteCount));
  return newTabBar;
}

// Reducer managing TabBar state.
function reducer(tabState, action) {
  console.log('REDUCER START: ', action);
  const newTabState = JSON.parse(JSON.stringify(tabState)); // Deepcopy otherwise the tabLines get mutated, causing bugs.
  const { tabBars, notation, chordBuilder, marker, keyCounter, activeNote, activeString } = newTabState;
  const { payload, type } = action;

  // User click on "move up"-button. Tab is moved one index backwards.
  switch (type) {
    case ACTIONS.MOVE_UP:
      if (tabState.tabBars.length <= 1 || payload.tabIdx === 0) return tabState;
      if (notation !== null) {
        newTabState.tabBars[payload.tabIdx] = removeTabStringY(tabState.tabBars[payload.tabIdx], 1);
        newTabState.notation = null;
      }
      const [movingUp] = newTabState.tabBars.splice(payload.tabIdx, 1);
      newTabState.tabBars.splice(payload.tabIdx - 1, 0, movingUp);
      newTabState.marker = {
        ...marker,
        tabIdx: payload.tabIdx - 1,
      };

      return newTabState;

    // User click on "move down"-button. Tab is moved one index forward.
    case ACTIONS.MOVE_DOWN:
      if (tabState.tabBars.length <= 1 || payload.tabIdx === newTabState.tabBars.length - 1) return tabState;
      if (notation !== null) {
        newTabState.tabBars[payload.tabIdx] = removeTabStringY(tabState.tabBars[payload.tabIdx], 1);
        newTabState.notation = null;
      }
      const [movingDown] = newTabState.tabBars.splice(payload.tabIdx, 1);
      newTabState.tabBars.splice(payload.tabIdx + 1, 0, movingDown);
      newTabState.marker = {
        ...marker,
        tabIdx: payload.tabIdx + 1,
      };

      return newTabState;

    // User click "remove"-button. Tab is removed from state.
    case ACTIONS.REMOVE:
      // Reset notation and activeNote if marked tab is removed.
      if (payload.tabIdx === marker.tabIdx) {
        if (notation !== null) {
          newTabState.notation = null;
        }

        if (activeNote.string !== null) {
          newTabState.activeNote = { string: null, fret: null };
        }
      }

      // Deleting tab indexed before marker will move marker to match the new index for the marked tab.
      if (payload.tabIdx < marker.tabIdx)
        newTabState.marker = {
          ...marker,
          tabIdx: marker.tabIdx - 1,
        };
      // Deleting the tab marked will remove marker.
      else if (payload.tabIdx === marker.tabIdx) {
        newTabState.marker = { tabIdx: -1, stringIdx: -1, yIdx: -1 };
      }
      newTabState.tabBars = newTabState.tabBars.filter((tabBar, i) => i !== payload.tabIdx);
      return newTabState;

    // User clicks "add"-button. A new tab is added to the state.
    case ACTIONS.ADD:
      newTabState.keyCounter++;

      // Remove activeNote.
      if (activeNote.string !== null) newTabState.activeNote = { string: null, fret: null };

      // Remove and toggle notation on previous marked tab off.
      if (notation !== null) {
        newTabState.tabBars[marker.tabIdx] = removeTabStringY(newTabState.tabBars[marker.tabIdx], 1);
        newTabState.notation = null;
      }
      newTabState.marker = { ...marker, tabIdx: tabState.tabBars.length, yIdx: 0 };
      newTabState.tabBars.push({
        id: keyCounter,
        key: keyCounter,
        title: '',
        tabLines: ['', '', '', '', '', ''],
      });
      return newTabState;

    // Updates TabBar title on input-onChange.
    case ACTIONS.RENAME:
      newTabState.tabBars[payload.tabIdx].title = payload.title;
      return newTabState;

    // Update text in tabs whenever a note on the guitar is clicked.
    case ACTIONS.ADD_NOTE:
      // If no tab is marked no changes are done.
      if (marker.tabIdx === -1) return tabState;

      // Handling notes if ChordBuilder is turned on.
      if (chordBuilder.active) {
        // Om vi har en double digit og en single digit skal den line opp med siste digit i double.
        // --12--
        // ---2--
        if (notation !== null) newTabState.notation = null;

        if (newTabState.chordBuilder.strings[payload.stringId].length > 0) {
          newTabState.chordBuilder.strings[payload.stringId].splice(0, 1, payload.fretId);
        } else {
          newTabState.chordBuilder.strings[payload.stringId].push(payload.fretId);
        }
        return newTabState;
      }

      // Handling notes following a notation.
      else if (notation !== null) {
        // If note is NOT on same string as the notation the notation is wiped.
        if (payload.stringId !== marker.stringIdx) {
          newTabState.tabBars[marker.tabIdx] = removeTabStringY(newTabState.tabBars[marker.tabIdx], 1);
          newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
          newTabState.notation = null;
        }

        newTabState.tabBars[marker.tabIdx] = addFretAndDashes(
          newTabState.tabBars[marker.tabIdx],
          newTabState.notation,
          payload.fretId,
          payload.stringId,
        );

        newTabState.marker = {
          ...marker,
          stringIdx: payload.stringId,
          yIdx: newTabState.tabBars[marker.tabIdx].tabLines[0].length,
        };
        newTabState.notation = null;
      }

      // Handling notes without notation.
      else {
        // Adds clicked note-fret to targeted tabBar string. Add matching dashes to sibling strings and moves marker.
        newTabState.tabBars[marker.tabIdx] = addFretAndDashes(
          newTabState.tabBars[marker.tabIdx],
          notation,
          payload.fretId,
          payload.stringId,
        );
        newTabState.marker = {
          ...marker,
          stringIdx: payload.stringId,
          yIdx: newTabState.tabBars[marker.tabIdx].tabLines[0].length,
        };
      }
      newTabState.activeNote = { string: payload.stringId, fret: payload.fretId };
      return newTabState;

    case ACTIONS.NOTATION:
      // Not allowed to add notation at the beginning of tabBar.
      if (marker.yIdx <= 0) {
        newTabState.notation = null;
        return newTabState;
      }

      // If user clicks the same notation again it will toggle off.
      if (notation === payload.notation) {
        newTabState.tabBars[marker.tabIdx] = removeTabStringY(newTabState.tabBars[marker.tabIdx], 1);
        newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
        newTabState.notation = null;
        return newTabState;
      }

      // If user clicks another notation before adding the followup note the notations will swap.
      if (notation !== null && payload.notation !== notation) {
        newTabState.tabBars[marker.tabIdx] = removeTabStringY(newTabState.tabBars[marker.tabIdx], 1);
        newTabState.tabBars[marker.tabIdx].tabLines = newTabState.tabBars[marker.tabIdx].tabLines.map((line, i) => {
          let newLine = line;
          newLine += i === marker.stringIdx ? payload.notation : '-';
          return newLine;
        });
        newTabState.notation = payload.notation;
        return newTabState;
      }

      // Adds notation following previous note.
      newTabState.tabBars[marker.tabIdx].tabLines = newTabState.tabBars[marker.tabIdx].tabLines.map((line, i) => {
        let newLine = line;
        newLine += i === marker.stringIdx ? payload.notation : '-';
        return newLine;
      });
      newTabState.marker = { ...marker, yIdx: marker.yIdx + 1 };
      newTabState.notation = payload.notation;
      newTabState.activeString = marker.stringIdx;
      return newTabState;

    case ACTIONS.CHORD:
      // Chord skal være på helt til bruker trykker den av. (eller trykker to ganger på samme linje)
      // Marker skal ikke flytte seg før chord er av igjen.

      // Toggle ChordBuilder off and add notes.
      if (newTabState.chordBuilder.active) {
        if (chordBuilder.strings.some((string) => string.length > 0)) {
          newTabState.tabBars[marker.tabIdx] = addFretAndDashes(tabBars[marker.tabIdx]);
          newTabState.tabBars[marker.tabIdx] = addChord(tabBars[marker.tabIdx], chordBuilder);
          newTabState.marker = { ...marker, yIdx: newTabState.tabBars[marker.tabIdx].tabLines[0].length };
          newTabState.chordBuilder.strings = [[], [], [], [], [], []];
        }
      }
      // Toggle ChordBuilder on.
      else {
        newTabState.activeNote = { string: null, fret: null };
        // If a notation is toggled on it will remove it.
        if (notation !== null) {
          newTabState.tabBars[marker.tabIdx] = removeTabStringY(newTabState.tabBars[marker.tabIdx], 1);
          newTabState.notation = null;
          newTabState.marker = { ...marker, yIdx: marker.yIdx - 1 };
        }
      }
      newTabState.chordBuilder.active = !chordBuilder.active;
      return newTabState;

    // Moves marker to the tab clicked.
    case ACTIONS.CLICK_TAB:
      // Remove activeNote.
      if (activeNote.string !== null && payload.tabIdx !== marker.tabIdx) {
        newTabState.activeNote = { string: null, fret: null };
      }

      // Remove and toggle notation on previous marked tab off.
      if (notation !== null) {
        newTabState.tabBars[marker.tabIdx] = removeTabStringY(newTabState.tabBars[marker.tabIdx], 1);
        newTabState.notation = null;
      }

      // Sets last edited string as marked string. THIS CODEBIT NEEDS REFACTORING.
      let prevStringIdx = -1;
      tabState.tabBars[payload.tabIdx].tabLines.forEach((line, i) => {
        if (!line.endsWith('-') && prevStringIdx === -1) prevStringIdx = i;
      });

      newTabState.marker = {
        tabIdx: payload.tabIdx,
        stringIdx: prevStringIdx,
        yIdx: tabState.tabBars[payload.tabIdx].tabLines[0].length,
      };
      return newTabState;

    case ACTIONS.CHANGE_DETAILS:
      switch (payload.id) {
        case 'title':
          newTabState.tabDetails.title = payload.value;
          return newTabState;
        case 'artist':
          newTabState.tabDetails.artist = payload.value;
          return newTabState;
        case 'capo':
          newTabState.tabDetails.capo = payload.value;
          return newTabState;
        case 'source':
          newTabState.tabDetails.source = payload.value;
          return newTabState;
        default:
          return tabState;
      }

    default:
      console.log('REDUCER ERROR!', action);
      return tabState;
  }
}

export default function useTabStateReducer() {
  return useReducer(reducer, initState);
}
