import React from 'react';

const legendButtons = [
  { id: 'pullOff', value: 'p' },
  { id: 'hammerOn', value: 'h' },
  { id: 'slideUp', value: '/' },
  { id: 'slideDown', value: '\\' },
];

function GuitarLegend(props) {
  const { handleLegendNotation, legendNotation } = props;

  function handleClick(event) {
    handleLegendNotation(event.target.value);
  }

  for (let i = 0; i < 6; i++) {}

  return (
    <div className="guitar__legend">
      <h3 className="heading-tertiary u-center-text">Legend</h3>
      <div className="guitar__legend__buttons">
        {legendButtons.map((button, i) => {
          return (
            <button
              key={button.value}
              className="btn btn--legend"
              value={button.value}
              id={button.id}
              onClick={(event) => handleClick(event)}
              style={{ backgroundColor: legendNotation === legendButtons[i].value ? 'green' : 'red' }}
            >
              {button.id} ({button.value})
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GuitarLegend;

// <div>
//   <input type="checkbox" className="guitar__legend__checkbox" id={button.id} defaultValue={button.value} />
//   <label htmlFor={button.id} className="guitar__legend__button" onClick={() => handleClick()}>
//     <span className="navigation__icon">
//       {button.id} ({button.value})
//     </span>
//   </label>
// </div>
