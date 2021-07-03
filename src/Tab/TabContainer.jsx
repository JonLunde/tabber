import React, { useState, useRef, useEffect } from 'react';
import TabBar from './TabBar';
import TabInfo from './TabInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer() {
  const [tabBars, setTabBars] = useState([<TabBar key={0} deleteTab={deleteTab} />]);
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.scrollIntoView();
  }, [tabBars]);

  const handleClick = () => {
    setTabBars((prevTabBars) => {
      return [...prevTabBars, <TabBar key={prevTabBars.length + 1} deleteTab={deleteTab} />];
    });
  };

  const deleteTab = (i) => {
    setTabBars((prevTabBars) => {
      return { ...prevTabBars }.splice(i, 1);
    });
  };

  return (
    <div className="u-mt-big container-tab">
      <TabInfo songProgress="test" />
      <div onContextMenu={preventDefault}>{tabBars}</div>
      <button className="btn btn--add u-mt-big" onClick={handleClick} ref={btnRef}>
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}

export default TabContainer;
