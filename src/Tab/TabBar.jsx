import React, { useEffect } from 'react';
import TabString from './TabString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabBar(props) {
  const { dispatch, id, idx, tabLines, title } = props;
  const [tabLine1, tabLine2, tabLine3, tabLine4, tabLine5, tabLine6] = tabLines;
  return (
    <div className="tab-bar">
      <label htmlFor="heading">
        <input
          type="text"
          className="tab-bar__title "
          placeholder="untitled"
          id="heading"
          defaultValue={title}
          autoComplete="off"
          onInput={(event) => dispatch({ type: 'rename', payload: { value: event.target.value, idx: idx } })}
        />
      </label>
      <div className="tab-bar__action-buttons">
        <button className="btn btn--action" onClick={() => dispatch({ type: 'moveUp', payload: idx })}>
          <FontAwesomeIcon key={100} icon="arrow-up" />
        </button>
        <button className="btn btn--action" onClick={() => dispatch({ type: 'moveDown', payload: idx })}>
          <FontAwesomeIcon key={101} icon="arrow-down" />
        </button>
        <button className="btn btn--action" onClick={() => dispatch({ type: 'remove', payload: idx })}>
          <FontAwesomeIcon key={102} icon="trash" />
        </button>
      </div>
      <div className="tab-bar__string-container">
        <TabString key={1} string={'e'} tabLine={tabLine1} />
        <TabString key={2} string={'B'} tabLine={tabLine2} />
        <TabString key={3} string={'G'} tabLine={tabLine3} />
        <TabString key={4} string={'D'} tabLine={tabLine4} />
        <TabString key={5} string={'A'} tabLine={tabLine5} />
        <TabString key={6} string={'E'} tabLine={tabLine6} />
      </div>
    </div>
  );
}

export default TabBar;

// const { deleteTab, moveUp, moveDown, id, tabLines } = props;

// useEffect(() => {
//   console.log('TABBAR: ', tabLines);
// }, [tabLines]);
