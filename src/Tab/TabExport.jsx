import React from 'react';
import FileSaver from 'file-saver';
import generateTextFile from '../utils/generateTextFile';

function TabExport(props) {
  const {
    tabState: { tabBars, tabDetails },
    tuning,
    exportButtonStyle,
  } = props;

  // Download a text file generated from the app state.
  function handleClick() {
    const tabToFile = { tabBars, tabDetails, tuning };
    const blob = new Blob([generateTextFile(tabToFile)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, `${tabDetails.title} - ${tabDetails.artist}.txt`);
  }

  return (
    <button onClick={handleClick} type="submit" className="btn btn--export" style={exportButtonStyle}>
      Export
    </button>
  );
}

export default TabExport;
