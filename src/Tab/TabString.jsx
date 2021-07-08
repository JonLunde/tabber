import React, { useEffect } from 'react';

function TabString(props) {
  const { tabLine, handleMarker, tuning, stringId, id } = props;

  return (
    <div>
      <span>
        {tuning[stringId] + ' |'}
        {tabLine}
      </span>
    </div>
  );
}

export default TabString;
