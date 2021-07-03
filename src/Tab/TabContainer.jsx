import React, { useState, useRef, useEffect } from 'react';
import TabBar from './TabBar';
import TabInfo from './TabInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let keyCount = 0;
const preventDefault = (e) => {
  e.preventDefault();
};

function TabContainer() {
  const deleteTab = (id) => {
    setTabBars((prevTabBars) => {
      if (prevTabBars.length === 1) return [];
      const index = prevTabBars.findIndex((tab) => tab.props.id == id);
      const newTabBars = [...prevTabBars];
      newTabBars.splice(index, 1);
      return newTabBars;
    });
  };

  const moveUp = (id) => {
    setTabBars((prevTabBars) => {
      if (prevTabBars.length <= 1) return prevTabBars;
      const index = prevTabBars.findIndex((tab) => tab.props.id == id);
      if (index === 0) return prevTabBars;
      let newTabBars = [...prevTabBars];
      const [shiftingTabBar] = newTabBars.splice(index, 1);
      newTabBars.splice(index - 1, 0, shiftingTabBar);

      return newTabBars;
    });
  };

  const moveDown = (id) => {
    setTabBars((prevTabBars) => {
      if (prevTabBars.length <= 1) return prevTabBars;
      const index = prevTabBars.findIndex((tab) => tab.props.id == id);
      if (index === prevTabBars.length - 1) return prevTabBars;
      let newTabBars = [...prevTabBars];
      const [shiftingTabBar] = newTabBars.splice(index, 1);
      newTabBars.splice(index + 1, 0, shiftingTabBar);

      return newTabBars;
    });
  };

  const [tabBars, setTabBars] = useState([
    <TabBar key={keyCount} deleteTab={deleteTab} moveUp={moveUp} moveDown={moveDown} id={0} />,
  ]);
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.scrollIntoView();
  }, [tabBars]);

  useEffect(() => {
    console.log('Render tabBars: ', tabBars);
  });

  const handleClick = () => {
    keyCount++;
    setTabBars((prevTabBars) => {
      return [
        ...prevTabBars,
        <TabBar key={keyCount} deleteTab={deleteTab} moveUp={moveUp} moveDown={moveDown} id={prevTabBars.length} />,
      ];
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
