import React, { useEffect } from 'react';

function TabString(props) {
  const { tabLine, tuning, stringId, id } = props;

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
