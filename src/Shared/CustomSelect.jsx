import React from 'react';
import Select from 'react-select';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];

function CustomSelect(props) {
  const { options } = props;
  return (
    <div>
      <Select options={options} />
    </div>
  );
}

export default CustomSelect;
