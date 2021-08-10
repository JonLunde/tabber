import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ACTIONS } from '../useTabStateReducer';

const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer(props) {
  const { dispatch, children } = props;
  const btnRef = useRef();

  return (
    <div className="tab-container" onContextMenu={preventDefault}>
      {children}
      <div className="tab-container__buttons u-mt-huge">
        <button className="btn btn--add " type="button" onClick={() => dispatch({ type: ACTIONS.ADD })} ref={btnRef}>
          <FontAwesomeIcon key={999} icon="plus" />
        </button>
      </div>
    </div>
  );
}

export default TabContainer;
