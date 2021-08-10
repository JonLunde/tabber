import React from 'react';
import { ACTIONS } from '../../utils/useTabStateReducer';

function TabDetails(props) {
  const { tabDetails, dispatch } = props;
  console.log('tabDetails ', tabDetails);
  return (
    <div className="details">
      <label htmlFor="title" className="details__form-group">
        <span className="details__label">Title</span>
        <input
          className="details__input"
          type="text"
          id="title"
          autoComplete="off"
          value={tabDetails.title}
          onChange={(event) =>
            dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
          }
        />
      </label>
      <label htmlFor="artist" className="details__form-group">
        <span className="details__label">Artist</span>
        <input
          className="details__input"
          type="text"
          id="artist"
          autoComplete="off"
          value={tabDetails.artist}
          onChange={(event) =>
            dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
          }
        />
      </label>
      <label htmlFor="capo" className="details__form-group">
        <span className="details__label">Capo</span>
        <input
          className="details__input"
          type="text"
          id="capo"
          autoComplete="off"
          onChange={(event) =>
            dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
          }
        />
      </label>
      <label htmlFor="source" className="details__form-group">
        <span className="details__label">Source</span>
        <input
          className="details__input"
          type="text"
          id="source"
          autoComplete="off"
          onChange={(event) =>
            dispatch({ type: ACTIONS.CHANGE_DETAILS, payload: { value: event.target.value, id: event.target.id } })
          }
        />
      </label>
    </div>
  );
}

export default TabDetails;
