import React from 'react';
import { ACTIONS } from '../useTabStateReducer';

function TabDetails(props) {
  const { tabDetails, dispatch } = props;
  console.log('tabDetails ', tabDetails);
  return (
    <div className="header-tab">
      <div className="tab-info">
        <label htmlFor="title" className="tab-info__form-group">
          <span className="heading-tertiary">Title</span>
          <input
            type="text"
            id="title"
            className="tab-info__input"
            autoComplete="off"
            value={tabDetails.title}
            onChange={(event) =>
              dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
            }
          />
        </label>
        <label htmlFor="artist" className="tab-info__form-group">
          <span className="heading-tertiary">Artist</span>
          <input
            type="text"
            id="artist"
            className="tab-info__input"
            autoComplete="off"
            value={tabDetails.artist}
            onChange={(event) =>
              dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
            }
          />
        </label>
        <label htmlFor="capo" className="tab-info__form-group">
          <span className="heading-tertiary">Capo</span>
          <input
            type="text"
            id="capo"
            className="tab-info__input"
            autoComplete="off"
            onChange={(event) =>
              dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
            }
          />
        </label>
        <label htmlFor="source" className="tab-info__form-group">
          <span className="heading-tertiary">Source</span>
          <input
            type="text"
            id="source"
            className="tab-info__input"
            autoComplete="off"
            onChange={(event) =>
              dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
            }
          />
        </label>
      </div>
    </div>
  );
}

export default TabDetails;
