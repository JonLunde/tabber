import React, { useState, useRef, useEffect } from 'react';
import TabBar from './TabBar';
import TabInfo from './TabInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let keyCount = 0;
const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer(props) {
  const { dispatch, tabState, handleFocus, focus } = props;
  const btnRef = useRef();
  let tabBars = tabState.map((tab, i) => (
    <TabBar key={i} id={tab.id} idx={tab.idx} dispatch={dispatch} tabLines={tab.tabLines} title={tab.title} />
  ));

  return (
    <div className="u-mt-big container-tab" onContextMenu={preventDefault}>
      {/* <TabInfo key={998} songProgress="test" /> */}
      {tabState.map((tab, i) => {
        return (
          <TabBar
            key={tab.key}
            id={tab.id}
            idx={tab.idx}
            dispatch={dispatch}
            tabLines={tab.tabLines}
            title={tab.title}
            handleFocus={() => handleFocus(tab.idx, tab.tabLines[0].length)}
            focus={focus}
          />
        );
      })}

      <button className="btn btn--add u-mt-huge" onClick={() => dispatch({ type: 'add' })} ref={btnRef}>
        <FontAwesomeIcon key={999} icon="plus" />
      </button>
    </div>
  );
}

export default TabContainer;
