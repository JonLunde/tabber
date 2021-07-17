import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrash, faArrowUp, faArrowDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import useTabStateReducer, { ACTIONS } from './useTabStateReducer';

library.add(faPlus, faTrash, faArrowUp, faArrowDown, faInfoCircle);

import TabContainer from './Tab/TabContainer';
import GuitarTuning from './Guitar/GuitarTuning';
import GuitarNeck from './Guitar/GuitarNeck';
import GuitarLegend from './Guitar/GuitarLegend';
import GuitarString from './Guitar/GuitarString';
import GuitarDashboard from './Guitar/GuitarDashboard';
import TabBar from './Tab/TabBar';
import TabExport from './Tab/TabExport';
import TabDetails from './Tab/TabDetails';

function Tabber() {
  const [tabState, dispatch] = useTabStateReducer();
  const [tuning, setTuning] = useState({ name: 'E Standard', values: ['E', 'B', 'G', 'D', 'A', 'E'] }); // Chosen guitar tuning.
  console.log(tabState.tabBars);

  useEffect(() => {
    console.log('TabState Changed: ', tabState);
  }, [tabState]);

  useEffect(() => {
    console.log('Tuning Changed: ', tuning);
  }, [tuning]);

  function changeTuning(selected) {
    switch (selected.value) {
      case '0':
        setTuning((prevTuning) => ({ ...prevTuning, name: null }));
        break;
      case '1':
        setTuning({ name: 'E Standard', values: ['E', 'B', 'G', 'D', 'A', 'E'] });
        break;
      case '2':
        setTuning({ name: 'D Standard', values: ['D', 'A', 'F', 'C', 'G', 'D'] });
        break;
      default:
        console.log('GUITARNECK SWITCH ERROR!');
        break;
    }
  }

  function changeTuner(note, i) {
    changeTuning({ value: '0' });
    setTuning((prevTuning) => {
      let newTuning = { ...prevTuning };
      newTuning.values[i] = note.value;
      return newTuning;
    });
  }

  function handleNotation(notation) {
    // If the Chord legend button is clicked.
    if (notation === 'shift') dispatch({ type: ACTIONS.CHORD });
    else dispatch({ type: ACTIONS.NOTATION, payload: { notation: notation } });
  }

  return (
    <div>
      <GuitarDashboard key={0}>
        <GuitarTuning key={0} tuning={tuning} changeTuning={changeTuning} changeTuner={changeTuner} />

        <GuitarNeck key={1} dispatch={dispatch} tuning={tuning}>
          {tuning.values.map((stringTuning, i) => (
            <GuitarString
              key={i}
              id={i}
              dispatch={dispatch}
              stringTuning={stringTuning}
              activeNote={tabState.activeNote}
              activeString={tabState.activeString}
              chordStrings={tabState.chordBuilder.strings}
              notation={tabState.notation}
            />
          ))}
        </GuitarNeck>

        <GuitarLegend
          key={2}
          handleNotation={handleNotation}
          dispatch={dispatch}
          notation={tabState.notation}
          chordBuilder={tabState.chordBuilder}
        />
      </GuitarDashboard>

      <TabContainer key={2} dispatch={dispatch} tabState={tabState} tuning={tuning}>
        <TabDetails key={1000} tabDetails={tabState.tabDetails} dispatch={dispatch} />
        {tabState.tabBars.map((tabBar, i) => (
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
    </div>
  );
}

export default Tabber;
