import React, { useState, useRef, useEffect } from 'react';
import TabExport from './TabExport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ACTIONS } from '../useTabStateReducer';

const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer(props) {
  const { dispatch, children, tabState, tuning } = props;
  const btnRef = useRef();

  return (
    <div className="container-tab" onContextMenu={preventDefault}>
      {children}

      <button className="btn btn--add u-mt-huge" onClick={() => dispatch({ type: ACTIONS.ADD })} ref={btnRef}>
        <FontAwesomeIcon key={999} icon="plus" />
      </button>
      <TabExport key={1} tabState={tabState} tuning={tuning} />
    </div>
  );
}

export default TabContainer;
