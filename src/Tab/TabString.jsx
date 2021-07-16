import React from 'react';

function TabString(props) {
  const { tabLine, tuning, id } = props;

  return (
    <div>
      <span>
        {tuning.values[id]}
        {tuning.values[id].length === 2 ? '|' : ' |'}
        {tabLine}
      </span>
    </div>
  );
}

export default TabString;
