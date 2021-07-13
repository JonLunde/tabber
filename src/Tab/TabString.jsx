import React from 'react';

function TabString(props) {
  const { tabLine, tuning, id } = props;

  console.log('tabString: ', tuning[id]);

  return (
    <div>
      <span>
        {tuning[id]}
        {tuning[id].length === 2 ? '|' : ' |'}
        {tabLine}
      </span>
    </div>
  );
}

export default TabString;
