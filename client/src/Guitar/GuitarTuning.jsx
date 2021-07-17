import React from 'react';
import Select from 'react-select';

const options = {
  notes: [
    { value: 'A', label: 'A' },
    { value: 'A#', label: 'A#' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'C#', label: 'C#' },
    { value: 'D', label: 'D' },
    { value: 'D#', label: 'D#' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'F#', label: 'F#' },
    { value: 'G', label: 'G' },
    { value: 'G#', label: 'G#' },
  ],
  tunings: [
    {
      value: '1',
      label: 'E Standard',
    },
    {
      value: '2',
      label: 'D Standard',
    },
  ],
};

function GuitarTuning(props) {
  const { tuning, changeTuner, changeTuning } = props;

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#f4bcb3',
        primary: '#e97866',
      },
    };
  }

  const tunerStyle = {
    option: (provided, state) => ({
      ...provided,
      color: '#292929',
      cursor: 'pointer',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#f4bcb3',
      color: '#292929',
      cursor: 'pointer',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#ededed',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor: '#e97866',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#292929',
    }),
  };

  const keyStyle = {
    option: (provided, state) => ({
      ...provided,
      color: '#292929',
      cursor: 'pointer',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#f4bcb3',
      color: '#292929',
      cursor: 'pointer',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#ededed',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      width: '100%',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor: '#e97866',
      width: '55%',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: '#292929',
    }),
  };

  function handleOnChange(event, i) {
    changeTuner(event, i);
  }
  console.log('TUNING ', tuning);

  return (
    <div className="guitar__tuning">
      <div className="guitar__tuning__tuner">
        <Select
          key={100}
          options={options.tunings}
          styles={tunerStyle}
          value={tuning.name === null ? { label: 'Change tuning' } : { value: tuning.name, label: tuning.name }}
          theme={customTheme}
          isSearchable
          onChange={changeTuning}
          noOptionsMessage={() => "Can't find tuning..."}
        />
      </div>
      <div className="guitar__tuning__keys">
        {tuning.values.map((tuner, i) => (
          <div key={i}>
            <Select
              options={options.notes}
              styles={keyStyle}
              value={{ value: tuner, label: tuner }}
              theme={customTheme}
              onChange={(event) => handleOnChange(event, i)}
              isSearchable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuitarTuning;
