import React, { useState, useEffect } from 'react';
import FileSaver, { saveAs } from 'file-saver';
import generateTextFile from './generateTextFile';

function TabExport(props) {
  const [data, setData] = useState();
  const {
    tabState: { tabBars, tabDetails },
    tuning,
    exportButtonStyle,
  } = props;

  useEffect(() => {
    console.log('Data: ', data);
  }, [data]);

  // Download a text file generated from the app state.
  function handleClick() {
    const tabToFile = { tabBars, tabDetails, tuning };
    var blob = new Blob([generateTextFile(tabToFile)], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, tabDetails.title + ' - ' + tabDetails.artist + '.txt');
  }

  return (
    <button onClick={handleClick} className="btn btn--export" style={exportButtonStyle}>
      Export
    </button>
  );
}

export default TabExport;
