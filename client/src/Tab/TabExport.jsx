import React, { useState, useEffect } from 'react';

function TabExport(props) {
  const [data, setData] = useState();
  const {
    tabState: { tabBars, tabDetails },
    tuning,
  } = props;

  useEffect(() => {
    console.log('Data: ', data);
  }, [data]);

  // Align all tabs to the according to the widest tab.
  function alignTabs(tabBars) {
    let widestTabBar = 0;

    tabBars.forEach((tabBar) => {
      if (tabBar.tabLines[0].length > widestTabBar) widestTabBar = tabBar.tabLines[0].length;
    });

    tabBars.forEach((tabBar) => {
      const dashesToAdd = widestTabBar - tabBar.tabLines[0].length;
      tabBar.tabLines = tabBar.tabLines.map((line) => (line += '-'.repeat(dashesToAdd)));
    });

    return tabBars;
  }

  // Post tabs to server and get the generated text-file as response.
  function handleClick() {
    const alignedTabs = alignTabs(tabBars);
    const textTab = { alignedTabs, tabDetails, tuning };
    fetch('http://localhost:5000/export', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(textTab),
    })
      .then((res) => res)
      .then(() => getTextFile())
      .catch((error) => console.log('Request failed: ', error));
  }

  // Get text file from server.
  function getTextFile() {
    fetch('http://localhost:5000/export')
      .then((res) => res.blob())
      .then((data) => fileDownload(data))
      .catch((error) => console.log('Request failed: ', error));
  }

  // Using anchortag to download file from server.
  function fileDownload(blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = tabDetails.title + ' - ' + tabDetails.artist + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  return (
    <button onClick={handleClick} className="btn btn--export">
      Export
    </button>
  );
}

export default TabExport;
