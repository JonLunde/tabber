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
    <div className="tab-container" onContextMenu={preventDefault}>
      {children}
      <div className="tab-container__buttons u-mt-huge">
        <button className="btn btn--add " onClick={() => dispatch({ type: ACTIONS.ADD })} ref={btnRef}>
          <FontAwesomeIcon key={999} icon="plus" />
        </button>
    
      </div>
    </div>
  );
}

export default TabContainer;
