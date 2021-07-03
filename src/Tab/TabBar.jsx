import React, { useEffect } from 'react';
import TabString from './TabString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabBar(props) {
  const { deleteTab } = props;
  console.log(props);
  return (
    <div className="tab-bar">
      <label htmlFor="title">
        <input type="text" className="tab-bar__title" placeholder="untitled" id="title" />
      </label>
      <div className="tab-bar__action-buttons">
        <button className="btn btn--action">
          <FontAwesomeIcon icon="arrow-up" />
        </button>
        <button className="btn btn--action">
          <FontAwesomeIcon icon="arrow-down" />
        </button>
        <button className="btn btn--action" onClick={deleteTab}>
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
      <div className="tab-bar__string-container">
        <TabString i={1} />
        <TabString i={2} />
        <TabString i={3} />
        <TabString i={4} />
        <TabString i={5} />
        <TabString i={6} />
      </div>
    </div>
  );
}

export default TabBar;
