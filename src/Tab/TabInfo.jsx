import React from 'react';

function TabInfo(props) {
  const { songProgress } = props;
  return (
    <div className="header-tab">
      <h1 className="heading-primary">Heading</h1>
      <div className="tab-info">
        <label htmlFor="title" className="tab-info__form-group">
          <span className="heading-tertiary">Title</span>
          <input type="text" id="title" className="tab-info__input" autoComplete="off" />
        </label>
        <label htmlFor="artist" className="tab-info__form-group">
          <span className="heading-tertiary">Artist</span>
          <input type="text" id="artist" className="tab-info__input" autoComplete="off" />
        </label>
        <label htmlFor="capo" className="tab-info__form-group">
          <span className="heading-tertiary">Capo</span>
          <input type="text" id="capo" className="tab-info__input" autoComplete="off" />
        </label>
        <label htmlFor="tuning" className="tab-info__form-group">
          <span className="heading-tertiary">Tuning</span>
          <input type="text" id="tuning" className="tab-info__input" autoComplete="off" />
        </label>
        <label htmlFor="source" className="tab-info__form-group">
          <span className="heading-tertiary">Source</span>
          <input type="text" id="source" className="tab-info__input" autoComplete="off" />
        </label>
      </div>
    </div>
  );
}

export default TabInfo;
