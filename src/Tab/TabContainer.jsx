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
  let tabBars;
  console.log('TabState: ', tabState);

  useEffect(() => {
    console.log('Container: Updateed ', tabState);
    tabBars = tabState.map((tab, i) => (
      <TabBar key={i} id={tab.id} idx={tab.idx} dispatch={dispatch} tabLines={tab.tabLines} />
    ));
  }, [tabState]);

  return (
    <div className="u-mt-big container-tab">
      {/* <TabInfo key={998} songProgress="test" /> */}
      <div onContextMenu={preventDefault}>
        {tabState.map((tab, i) => (
          <TabBar key={i} id={tab.id} idx={tab.idx} dispatch={dispatch} tabLines={tab.tabLines} title={tab.title} />
        ))}
        {tabBars}
        {/* {tabBars.map((bar) => (
          <TabBar
          key={bar.key}
          tabLines={bar.tabLines}
          id={bar.id}
          moveUp={moveUp}
          moveDown={moveDown}
          deleteTab={deleteTab}
          />
        ))} */}
      </div>
      <button className="btn btn--add u-mt-big" onClick={() => dispatch({ type: 'add' })} ref={btnRef}>
        <FontAwesomeIcon key={999} icon="plus" />
      </button>
    </div>
  );
}

export default TabContainer;

// const { tabText, newTextTab } = props;
// const [tabBars, setTabBars] = useState([
//   { key: 0, tabLines: tabText.find((tabText) => tabText.id === 0).tabLines, id: 0 },
// ]);

// useEffect(() => {
//   setTabBars((prevTabBars) =>
//     prevTabBars.map((bar) => ({ ...bar, tabLines: tabText.find((tabText) => tabText.id === bar.id).tabLines })),
//   );
// }, [tabText]);
// console.log('TabContainer: ', tabBars);
// console.log('TabContainer: ', tabText);

// // Delete TabBar.
// const deleteTab = (id) => {
//   setTabBars((prevTabBars) => {
//     if (prevTabBars.length === 1) return [];
//     const index = prevTabBars.findIndex((tab) => tab.id == id);
//     const newTabBars = [...prevTabBars];
//     newTabBars.splice(index, 1);
//     return newTabBars;
//   });
// };

// // Move TabBar one place up.
// const moveUp = (id) => {
//   setTabBars((prevTabBars) => {
//     if (prevTabBars.length <= 1) return prevTabBars;
//     const index = prevTabBars.findIndex((tab) => tab.id == id);
//     if (index === 0) return prevTabBars;
//     let newTabBars = [...prevTabBars];
//     const [shiftingTabBar] = newTabBars.splice(index, 1);
//     newTabBars.splice(index - 1, 0, shiftingTabBar);

//     return newTabBars;
//   });
// };

// // Move TabBar one place down.
// const moveDown = (id) => {
//   setTabBars((prevTabBars) => {
//     if (prevTabBars.length <= 1) return prevTabBars;
//     const index = prevTabBars.findIndex((tab) => tab.id == id);
//     if (index === prevTabBars.length - 1) return prevTabBars;
//     let newTabBars = [...prevTabBars];
//     const [shiftingTabBar] = newTabBars.splice(index, 1);
//     newTabBars.splice(index + 1, 0, shiftingTabBar);

//     return newTabBars;
//   });
// };

// const handleClick = () => {
//   keyCount++;

//   newTextTab(tabBars.length);

//   setTabBars((prevTabBars) => {
//     const newTabBars = [
//       ...prevTabBars,
//       {
//         key: keyCount,
//         tabLines: tabText.find((tabText) => tabText.id === prevTabBars.length).tabLines,
//         id: prevTabBars.length,
//       },
//     ];
//     return newTabBars;
//   });

//   setTimeout(() => {
//     btnRef.current.scrollIntoView();
//   }, 50);
// };
