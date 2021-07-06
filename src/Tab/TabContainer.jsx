import React, { useState, useRef, useEffect } from 'react';
import TabBar from './TabBar';
import TabInfo from './TabInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let keyCount = 0;
const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer(props) {
  const { dispatch, tabState } = props;
  const btnRef = useRef();
  let tabBars = tabState.map((tab, i) => (
    <TabBar key={i} id={tab.id} idx={tab.idx} dispatch={dispatch} tabLines={tab.tabLines} title={tab.title} />
  ));

  useEffect(() => {
    tabBars = tabState.map((tab, i) => (
      <TabBar key={i} id={tab.id} idx={tab.idx} dispatch={dispatch} tabLines={tab.tabLines} title={tab.title} />
    ));
  }, [tabState]);

  console.log('tabState!', tabState);
  setTimeout(() => {
    console.log('tabBars!', tabBars);
  }, 1000);
  return (
    <div className="u-mt-big container-tab">
      {/* <TabInfo key={998} songProgress="test" /> */}
      <div onContextMenu={preventDefault}>{tabBars}</div>
      <button className="btn btn--add u-mt-big" onClick={() => dispatch({ type: 'add' })} ref={btnRef}>
        <FontAwesomeIcon key={999} icon="plus" />
      </button>
    </div>
  );
}

export default TabContainer;
