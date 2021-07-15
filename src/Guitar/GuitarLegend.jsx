import React from 'react';

const legendButtons = [
  { id: 'pullOff', value: 'p', text: 'Pull off' },
  { id: 'hammerOn', value: 'h', text: 'Hammer on' },
  { id: 'slideUp', value: '/', text: 'Slide up' },
  { id: 'slideDown', value: '\\', text: 'Slide down' },
  { id: 'chord', value: 'shift', text: 'Chord' },
];

function GuitarLegend(props) {
  const { handleNotation, notation, chordBuilder } = props;

  function handleClick(event) {
    handleNotation(event.target.value);
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
              style={{
                backgroundColor:
                  (notation === legendButtons[i].value || (button.id === 'chord' && chordBuilder.active)) && '#e97865',
                width: button.id === 'chord' && '100%',
              }}
            >
              {button.text} <br /> ({button.value})
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GuitarLegend;
