import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabDetails from './TabDetails';
import TabExport from './TabExport';

export default function TabSidebar(props) {
  const { tabDetails, dispatch, tabState, tuning } = props;

  const [expanded, setExpanded] = useState(true);

  const collapseStyle = expanded ? null : { width: '2%', marginRight: '-3rem' };
  const collapseButtonStyle = expanded
    ? null
    : {
        borderRadius: 0,
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        transform: 'translate(-1.9rem, -50%)',
        backgroundColor: '#2f0302',
        color: '#f8f8f8',
      };
  const exportButtonStyle = expanded ? null : { transform: 'translateX(5rem)' };

  function handleClick() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

  return (
    <div className="sidebar" style={collapseStyle}>
      <button className="btn btn--sidebar" type="button" onClick={handleClick} style={collapseButtonStyle}>
        <FontAwesomeIcon key={100} icon={expanded ? 'angle-right' : 'angle-left'} />
      </button>
      <TabDetails key={1000} tabDetails={tabDetails} dispatch={dispatch} />
      <TabExport key={1} tabState={tabState} tuning={tuning} exportButtonStyle={exportButtonStyle} />
    </div>
  );
}
