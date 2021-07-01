import React from 'react';
import TabString from './TabString';

function TabBar() {
  return (
    <div className="tab-bar">
      <TabString i={1} />
      <TabString i={2} />
      <TabString i={3} />
      <TabString i={4} />
      <TabString i={5} />
      <TabString i={6} />
    </div>
  );
}

export default TabBar;
