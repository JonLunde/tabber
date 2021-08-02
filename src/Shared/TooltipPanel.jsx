import React from 'react';

function TooltipPanel() {
  return (
    <div className="tooltip-panel">
      <h3>
        Legend: <br />
      </h3>
      <span>
        h = Hammer on <br />
      </span>
      <span>
        p = Pull off <br />
      </span>
      <span>
        / = Slide up <br />
      </span>
      <span>\ = Slide down</span>
    </div>
  );
}

export default TooltipPanel;
