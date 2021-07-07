import React from 'react';

function GuitarLegend() {
  return (
    <div className="guitar__legend">
      <h3 className="heading-tertiary u-center-text">Legend</h3>
      <div className="guitar__legend__buttons">
        <button className="btn btn--legend">Hammer on (h)</button>
        <button className="btn btn--legend">Pull off (p)</button>
        <button className="btn btn--legend">Slide up (/)</button>
        <button className="btn btn--legend">Slide down (\)</button>
        <button className="btn btn--legend">Vibrato (~)</button>
        <button className="btn btn--legend">Muted note (x)</button>
        <button className="btn btn--legend">Percussive slap (X)</button>
        <button className="btn btn--legend">Harmonic (+)</button>
      </div>
    </div>
  );
}

export default GuitarLegend;
