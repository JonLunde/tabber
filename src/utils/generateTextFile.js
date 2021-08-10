// Align all tabs to the according to the widest tab.
function alignTabs(tabBars) {
  const alignedTabs = tabBars;
  let widestTabBar = 0;

  alignedTabs.forEach((tabBar) => {
    if (tabBar.tabLines[0].length > widestTabBar) widestTabBar = tabBar.tabLines[0].length;
  });

  alignedTabs.forEach((tabBar) => {
    const alignedTabBar = tabBar;
    const dashesToAdd = widestTabBar - alignedTabBar.tabLines[0].length;
    alignedTabBar.tabLines = alignedTabBar.tabLines.map((line) => {
      let newLine = line;
      newLine += '-'.repeat(dashesToAdd);
      return newLine;
    });
  });

  return alignedTabs;
}

// Adds legend for notations at the bottom of the file.
function addNotationLegend(dataString) {
  let withNotation = dataString;
  withNotation += '\nh - Hammer on\n';
  withNotation += 'p - Pull off\n';
  withNotation += '/ - Slide up\n';
  withNotation += '\\ - Slide down\n';
  withNotation += 'X - Percussive slap\n';
  withNotation += '~ - Vibrato\n';
  withNotation += '+ - Hermonic\n';
  withNotation += 'x - Mute string\n';

  return withNotation;
}

// Adds the dynamic part of the text file. Derived from the state provided.
function createDataString(textTab) {
  let dataString = '';
  dataString += '-----------------------------------------------------\n';
  dataString += `${textTab.tabDetails.title} - `;
  dataString += `${textTab.tabDetails.artist}\n`;
  dataString += '-----------------------------------------------------\n';

  if (textTab.tabDetails.source !== '') {
    dataString += `Source: ${textTab.tabDetails.source}\n`;
  } else dataString += '\n';

  if (textTab.tuning.name !== null) {
    dataString += `Tuning: ${textTab.tuning.name}\n`;
  }

  if (textTab.tabDetails.capo !== '') {
    dataString += `Capo: ${textTab.tabDetails.capo}\n`;
  }

  textTab.tabBars.forEach((tabBar) => {
    dataString += `\n${tabBar.title}\n`;
    tabBar.tabLines.forEach((line, i) => {
      // Tuning of first string should be in lower case.
      dataString +=
        i === 0 ? `${textTab.tuning.values[i].toLowerCase()}|${line}--|\n` : `${textTab.tuning.values[i]}|${line}--|\n`;
    });
    dataString += '\n';
  });

  dataString = addNotationLegend(dataString);

  return dataString;
}

// This function generates the exported text-file from the Tabber state.
export default function generateTextFile(textTab) {
  const alignedTab = { ...textTab, tabBars: alignTabs(textTab.tabBars) };
  return createDataString(alignedTab);
}
