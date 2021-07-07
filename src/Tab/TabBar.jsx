import React, { useEffect } from 'react';
import TabString from './TabString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabBar(props) {
  const { dispatch, id, idx, tabLines, title, handleFocus, focus } = props;
  const [tabLine1, tabLine2, tabLine3, tabLine4, tabLine5, tabLine6] = tabLines;

  const focusStyle = { transform: 'scale(1.02)', boxShadow: '0.5rem 2rem 3rem 0rem rgba(0,0,0,0.4)' };
  return (
    <div
      className="tab-bar"
      onClick={() => handleFocus(idx, tabLine1.length)}
      style={focus.tabIdx === idx ? focusStyle : {}}
    >
      <div className="tab-bar__header">
        <input
          type="text"
          className="tab-bar__title "
          placeholder="Give it a title..."
          id="heading"
          defaultValue={title}
          autoComplete="off"
          onInput={(event) => dispatch({ type: 'rename', payload: { value: event.target.value, idx: idx } })}
        />
        <div className="tab-bar__action-buttons">
          <button className="btn btn--action btn--action--1" onClick={() => dispatch({ type: 'moveUp', payload: idx })}>
            <FontAwesomeIcon key={100} icon="arrow-up" />
          </button>
          <button
            className="btn btn--action btn--action--2"
            onClick={() => dispatch({ type: 'moveDown', payload: idx })}
          >
            <FontAwesomeIcon key={101} icon="arrow-down" />
          </button>
          <button className="btn btn--action btn--action--3" onClick={() => dispatch({ type: 'remove', payload: idx })}>
            <FontAwesomeIcon key={102} icon="trash" />
          </button>
        </div>
      </div>
      <div className="tab-bar__string-container">
        <div
          className="tab-bar__string-container__marker"
          hidden={focus.tabIdx !== idx ? true : false}
          style={{ left: 0.6 * focus.lineIdx + 'em' }}
        />
        <TabString key={1} string={'e'} tabLine={tabLine1} tabIdx={idx} handleFocus={handleFocus} />
        <TabString key={2} string={'B'} tabLine={tabLine2} tabIdx={idx} handleFocus={handleFocus} />
        <TabString key={3} string={'G'} tabLine={tabLine3} tabIdx={idx} handleFocus={handleFocus} />
        <TabString key={4} string={'D'} tabLine={tabLine4} tabIdx={idx} handleFocus={handleFocus} />
        <TabString key={5} string={'A'} tabLine={tabLine5} tabIdx={idx} handleFocus={handleFocus} />
        <TabString key={6} string={'E'} tabLine={tabLine6} tabIdx={idx} handleFocus={handleFocus} />
      </div>
    </div>
  );
}

export default TabBar;
