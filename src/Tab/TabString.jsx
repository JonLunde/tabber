import React, { useEffect } from 'react';

function TabString(props) {
  const { tabLine, tabIdx, handleFocus } = props;

  return (
    <div>
      <span>{tabLine}</span>
    </div>
  );
}

export default TabString;
