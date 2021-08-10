import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TooltipPanel from './TooltipPanel';

const legendButtons = [
  { id: 'hammerOn', value: 'h', text: 'Hammer on' },
  { id: 'pullOff', value: 'p', text: 'Pull off' },
  { id: 'slideUp', value: '/', text: 'Slide up' },
  { id: 'slideDown', value: '\\', text: 'Slide down' },
  { id: 'chord', value: 'shift', text: 'Chord' },
];

function GuitarLegend(props) {
  const { handleNotation, notation, chordBuilder } = props;
  const [tooltipHovered, setTooltipHovered] = useState(false);

  function handleClick(event) {
    handleNotation(event.target.value);
  }

  function handleEnter() {
    setTooltipHovered(true);
  }

  function handleLeave() {
    setTooltipHovered(false);
  }

  return (
    <div className="guitar__legend">
      <div className="guitar__legend__tooltip" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <FontAwesomeIcon key={100} icon="info-circle" />
      </div>

      <div className="guitar__legend__buttons">
        {legendButtons.map((button, i) => (
          <button
            key={button.value}
            type="button"
            className="btn btn--legend"
            value={button.value}
            id={button.id}
            onClick={(event) => handleClick(event)}
            style={{
              backgroundColor:
                (notation === legendButtons[i].value || (button.id === 'chord' && chordBuilder.active)) && '#e97865',
              width: button.id === 'chord' && '100%',
              fontWeight: button.id === 'slideDown' ? '500' : '700',
            }}
          >
            {button.id === 'chord' ? `${button.text} (${button.value})` : button.value}
          </button>
        ))}
      </div>
      {tooltipHovered && <TooltipPanel />}
    </div>
  );
}

export default GuitarLegend;
