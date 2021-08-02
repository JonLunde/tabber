export default function generateTextFile(textTab) {
  const alignedTab = { ...textTab, tabBars: alignTabs(textTab.tabBars) };
  return createDataString(alignedTab);
}

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

// Adds the dynamic part of the text file. Derived from the state provided.
function createDataString(textTab) {
  let dataString = '';
  dataString += textTab.tabDetails.title + ' - ';
  dataString += textTab.tabDetails.artist + '\n\n';
  if (textTab.tuning.name !== null) {
    dataString += textTab.tuning.name + '\n';
  }
  if (textTab.tabDetails.capo !== '') {
    dataString += textTab.tabDetails.capo + '\n';
  }
  if (textTab.tabDetails.source !== '') {
    dataString += textTab.tabDetails.source + '\n\n';
  } else dataString += '\n';

  textTab.tabBars.forEach((tabBar) => {
    dataString += tabBar.title + '\n';
    tabBar.tabLines.forEach((line) => {
      dataString += line + '\n';
    });
    dataString += '\n';
  });

  dataString = addNotationLegend(dataString);

  return dataString;
}

// Adds legend for notations at the bottom of the file.
function addNotationLegend(dataString) {
  dataString += '\nh - Hammer on\n';
  dataString += 'p - Pull off\n';
  dataString += '/ - Slide up\n';
  dataString += '\\ - Slide down\n';
  dataString += 'X - Percussive slap\n';
  dataString += '~ - Vibrato\n';
  dataString += '+ - Hermonic\n';
  dataString += 'x - Mute string\n';

  return dataString;
}
