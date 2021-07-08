import React, { useEffect } from 'react';
import TabString from './TabString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ACTIONS } from '../Tabber';

function TabBar(props) {
  const {
    dispatch,
    id,
    tabLines: [tabLine1, tabLine2, tabLine3, tabLine4, tabLine5, tabLine6],
    title,
    handleMarker,
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
      onClick={() => handleMarker(id, tabLine1.length)}
      style={marker.tabIdx === id ? markerStyle : {}}
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
            onClick={() => dispatch({ type: ACTIONS.MOVEUP, payload: id })}
          >
            <FontAwesomeIcon key={100} icon="arrow-up" />
          </button>
          <button
            className="btn btn--action btn--action--2"
            onClick={() => dispatch({ type: ACTIONS.MOVEDOWN, payload: id })}
          >
            <FontAwesomeIcon key={101} icon="arrow-down" />
          </button>
          <button
            className="btn btn--action btn--action--3"
            onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: id })}
          >
            <FontAwesomeIcon key={102} icon="trash" />
          </button>
        </div>
      </div>
      <div className="tab-bar__string-container">
        <div
          className="tab-bar__string-container__marker"
          hidden={marker.tabIdx !== id ? true : false}
          style={{ left: 0.6 * marker.yIdx + 0.5 + 'em' }}
        />
        <TabString key={0} stringId={0} tabLine={tabLine1} id={id} handleMarker={handleMarker} tuning={tuning} />
        <TabString key={1} stringId={1} tabLine={tabLine2} id={id} handleMarker={handleMarker} tuning={tuning} />
        <TabString key={2} stringId={2} tabLine={tabLine3} id={id} handleMarker={handleMarker} tuning={tuning} />
        <TabString key={3} stringId={3} tabLine={tabLine4} id={id} handleMarker={handleMarker} tuning={tuning} />
        <TabString key={4} stringId={4} tabLine={tabLine5} id={id} handleMarker={handleMarker} tuning={tuning} />
        <TabString key={5} stringId={5} tabLine={tabLine6} id={id} handleMarker={handleMarker} tuning={tuning} />
      </div>
    </div>
  );
}

export default TabBar;
