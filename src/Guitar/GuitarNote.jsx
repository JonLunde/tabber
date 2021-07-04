import React from 'react';

function GuitarNote(props) {
  const { note } = props;
  return <div className="guitar__note">{note}</div>;
}

export default GuitarNote;
