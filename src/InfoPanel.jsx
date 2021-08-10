import React, { useState } from 'react';

export default function InfoPanel() {
  const [expanded, setExpanded] = useState(false);

  //   const collapseStyle = expanded ? null : { height: '1rem', marginTop: '-10rem' };
  const collapseStyle = expanded ? null : { height: '1rem', marginTop: '-10rem' };
  const collapseButtonStyle = expanded
    ? null
    : {
        borderRadius: 0,
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        transform: 'translate(-50%, 100%)',
        backgroundColor: '#2f0302',
        color: '#f8f8f8',
      };

  function handleClick() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

  return (
    <div className="info-panel" style={collapseStyle}>
      <div className="info-panel__content-container">
        <h3 className="heading-secondary info-panel__title">Info Panel</h3>
        <ul className="info-panel__list">
          <li className="info-panel__list-item">Click on the guitar neck to add a fret to the tab.</li>
          <li className="info-panel__list-item">
            Add notation: Click on a fret, then on desired notation, and then the follow-up fret on the same string.
          </li>
          <li className="info-panel__list-item">
            Add chord: Click on the Chord button and form your chord on the neck, then click the chord button again to
            add it to the tab.
          </li>
          <li className="info-panel__list-item">
            Tuning can be changed at each string, or from the tuning drop-down in the top left corner.
          </li>
          <li className="info-panel__list-item" />
          <li className="info-panel__list-item">
            Tab details added in the sidebar will be printed to the exported file.
          </li>
          <li className="info-panel__list-item">
            Export your tab to a text file with the &apos;EXPORT&apos; button in the sidebar.
          </li>
          <li className="info-panel__list-item">Click the &apos;+&apos; button to add a new tab row.</li>
          <li className="info-panel__list-item">Each tab row can be renamed, reordered, and deleted.</li>
          <li className="info-panel__list-item">
            The focused tab row will have a marker and be slightly larger than the others.
          </li>
        </ul>
      </div>
      <div className="info-panel__button-container" />
      <button className="btn btn--info-panel" type="button" onClick={handleClick} style={collapseButtonStyle}>
        HELP
      </button>
    </div>
  );
}
