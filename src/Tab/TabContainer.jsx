import React, { useState, useRef, useEffect } from 'react';
import TabBar from './TabBar';
import TabInfo from './TabInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer() {
  const [tabBars, setTabBars] = useState([<TabBar key={0} deleteTab={deleteTab} id={0} />]);
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.scrollIntoView();
  }, [tabBars]);

  const handleClick = () => {
    setTabBars((prevTabBars) => {
      console.log([...prevTabBars, <TabBar key={prevTabBars.length} deleteTab={deleteTab} id={prevTabBars.length} />]);
      return [...prevTabBars, <TabBar key={prevTabBars.length} deleteTab={deleteTab()} id={prevTabBars.length} />];
    });
  };

  function deleteTab(id) {
    setTabBars((prevTabBars) => {
      let newTabBars = [...prevTabBars];
      console.log('newTabs: ', newTabBars);
      console.log('prevTabs: ', prevTabBars);
      return newTabBars.splice(id, 1);
    });
    console.log(tabBars);
  }

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
