import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabString from './TabString';
import { ACTIONS } from '../../utils/useTabStateReducer';

function TabBar(props) {
  const {
    idx,
    tabBar: { title, tabLines },
    marker,
    dispatch,
    tuning,
  } = props;

  const markerStyle = {
    transform: 'scale(1.04)',
    boxShadow: '8px 23px 23px 0 rgba(0,0,0, 0.30), 5px 15px 6px 0 rgba(0,0,0, 0.22)',
  };

  return (
    <div
      className="tab-bar"
      role="button"
      tabIndex={0}
      // Moves focus marker to clicked tab.
      onClick={() => dispatch({ type: ACTIONS.CLICK_TAB, payload: { tabIdx: idx } })}
      onKeyPress={() => dispatch({ type: ACTIONS.CLICK_TAB, payload: { tabIdx: idx } })}
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
          onInput={(event) => {
            event.stopPropagation();
            dispatch({ type: ACTIONS.RENAME, payload: { title: event.target.value, tabIdx: idx } });
          }}
        />
        <div className="tab-bar__action-buttons">
          <button
            className="btn btn--action btn--action--1"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              dispatch({ type: ACTIONS.MOVE_UP, payload: { tabIdx: idx } });
            }}
          >
            <FontAwesomeIcon key={100} icon="arrow-up" />
          </button>
          <button
            className="btn btn--action btn--action--2"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              dispatch({ type: ACTIONS.MOVE_DOWN, payload: { tabIdx: idx } });
            }}
          >
            <FontAwesomeIcon key={101} icon="arrow-down" />
          </button>
          <button
            className="btn btn--action btn--action--3"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              dispatch({ type: ACTIONS.REMOVE, payload: { tabIdx: idx } });
            }}
          >
            <FontAwesomeIcon key={102} icon="trash" />
          </button>
        </div>
      </div>
      <div className="tab-bar__string-container">
        <div
          className="tab-bar__string-container__marker"
          hidden={marker.tabIdx !== idx}
          style={{ left: `${2.3 + 0.6 * marker.yIdx}em` }}
        />
        {tabLines.map((tabLine, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TabString key={i} id={i} tabLine={tabLine} tuning={tuning} />
        ))}
      </div>
    </div>
  );
}

export default TabBar;
