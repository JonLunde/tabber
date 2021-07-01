import React from 'react';
import TabNote from './TabNote';

interface Props {
  i: number;
}

const TabString: React.FC<Props> = (props) => {
  const { i } = props;
  return (
    <div className={`tab-bar__string tab-bar__string--${i}`}>
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
      <TabNote />
    </div>
  );
};

export default TabString;
