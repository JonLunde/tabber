import React, { useEffect } from 'react';

function TabString(props) {
  const { tabLine, tabIdx, handleMarker, tuning, stringIdx } = props;

  return (
    <div>
      <span>
        {tuning[stringIdx] + ' |'}
        {tabLine}
      </span>
    </div>
  );
}

export default TabString;
