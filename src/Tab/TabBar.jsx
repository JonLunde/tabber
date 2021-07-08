import React, { useEffect } from 'react';
import TabString from './TabString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabBar(props) {
  const {
    dispatch,
    id,
    tabIdx,
    tabLines: [tabLine1, tabLine2, tabLine3, tabLine4, tabLine5, tabLine6],
    title,
    handleMarker,
    marker,
    tuning,
  } = props;

  const markerStyle = { transform: 'scale(1.02)', boxShadow: '0.5rem 2rem 3rem 0rem rgba(0,0,0,0.4)' };
  return (
    <div
      className="tab-bar"
      onClick={() => handleMarker(tabIdx, tabLine1.length)}
      style={marker.tabIdx === tabIdx ? markerStyle : {}}
    >
      <div className="tab-bar__header">
        <input
          type="text"
          className="tab-bar__title "
          placeholder="Give it a title..."
          id="heading"
          defaultValue={title}
          autoComplete="off"
          onInput={(event) => dispatch({ type: 'rename', payload: { value: event.target.value, idx: tabIdx } })}
        />
        <div className="tab-bar__action-buttons">
          <button
            className="btn btn--action btn--action--1"
            onClick={() => dispatch({ type: 'moveUp', payload: tabIdx })}
          >
            <FontAwesomeIcon key={100} icon="arrow-up" />
          </button>
          <button
            className="btn btn--action btn--action--2"
            onClick={() => dispatch({ type: 'moveDown', payload: tabIdx })}
          >
            <FontAwesomeIcon key={101} icon="arrow-down" />
          </button>
          <button
            className="btn btn--action btn--action--3"
            onClick={() => dispatch({ type: 'remove', payload: tabIdx })}
          >
            <FontAwesomeIcon key={102} icon="trash" />
          </button>
        </div>
      </div>
      <div className="tab-bar__string-container">
        <div
          className="tab-bar__string-container__marker"
          hidden={marker.tabIdx !== tabIdx ? true : false}
          style={{ left: 0.6 * marker.yIdx + 0.5 + 'em' }}
        />
        <TabString
          key={0}
          stringIdx={0}
          tabLine={tabLine1}
          tabIdx={tabIdx}
          handleMarker={handleMarker}
          tuning={tuning}
        />
        <TabString
          key={1}
          stringIdx={1}
          tabLine={tabLine2}
          tabIdx={tabIdx}
          handleMarker={handleMarker}
          tuning={tuning}
        />
        <TabString
          key={2}
          stringIdx={2}
          tabLine={tabLine3}
          tabIdx={tabIdx}
          handleMarker={handleMarker}
          tuning={tuning}
        />
        <TabString
          key={3}
          stringIdx={3}
          tabLine={tabLine4}
          tabIdx={tabIdx}
          handleMarker={handleMarker}
          tuning={tuning}
        />
        <TabString
          key={4}
          stringIdx={4}
          tabLine={tabLine5}
          tabIdx={tabIdx}
          handleMarker={handleMarker}
          tuning={tuning}
        />
        <TabString
          key={5}
          stringIdx={5}
          tabLine={tabLine6}
          tabIdx={tabIdx}
          handleMarker={handleMarker}
          tuning={tuning}
        />
      </div>
    </div>
  );
}

export default TabBar;
