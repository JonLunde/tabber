import React from 'react';
import TabString from './TabString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ACTIONS } from '../Tabber';

function TabBar(props) {
  const {
    idx,
    tabState: { id, title, tabLines },
    dispatch,
    marker,
    tuning,
  } = props;

  const markerStyle = {
    transform: 'scale(1.04)',
    boxShadow: '8px 23px 23px 0 rgba(0,0,0, 0.30), 5px 15px 6px 0 rgba(0,0,0, 0.22)',
  };

  return (
    <div
      className="tab-bar"
      onClick={() => dispatch({ type: ACTIONS.SETTABINDEX, payload: { tabId: id } })}
      style={marker.tabIdx === idx ? markerStyle : {}}
    >
      <div className="tab-bar__header">
        <input
          type="text"
          className="tab-bar__title "
          placeholder="Give it a title..."
          id="heading"
          defaultValue={title}
          autoComplete="off"
          onInput={(event) => dispatch({ type: ACTIONS.RENAME, payload: { value: event.target.value, id: id } })}
        />
        <div className="tab-bar__action-buttons">
          <button
            className="btn btn--action btn--action--1"
            onClick={() => dispatch({ type: ACTIONS.MOVEUP, payload: idx })}
          >
            <FontAwesomeIcon key={100} icon="arrow-up" />
          </button>
          <button
            className="btn btn--action btn--action--2"
            onClick={() => dispatch({ type: ACTIONS.MOVEDOWN, payload: idx })}
          >
            <FontAwesomeIcon key={101} icon="arrow-down" />
          </button>
          <button
            className="btn btn--action btn--action--3"
            onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: idx })}
          >
            <FontAwesomeIcon key={102} icon="trash" />
          </button>
        </div>
      </div>
      <div className="tab-bar__string-container">
        <div
          className="tab-bar__string-container__marker"
          hidden={marker.tabIdx !== idx ? true : false}
          style={{ left: 2.3 + 0.6 * marker.yIdx + 'em' }}
        />
        {tabLines.map((tabLine, i) => (
          <TabString key={i} id={i} tabLine={tabLine} tuning={tuning} />
        ))}
      </div>
    </div>
  );
}

export default TabBar;
