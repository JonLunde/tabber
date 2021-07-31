const fs = require('fs');

const createDataString = (textTab) => {
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

  textTab.alignedTabs.forEach((tabBar) => {
    dataString += tabBar.title + '\n';
    tabBar.tabLines.forEach((line) => {
      dataString += line + '\n';
    });
    dataString += '\n';
  });

  dataString = addNotationLegend(dataString);

  console.log('server return: ', dataString);
  return dataString;
};

const addNotationLegend = (dataString) => {
  dataString += '\nh - Hammer on\n';
  dataString += 'p - Pull off\n';
  dataString += '/ - Slide up\n';
  dataString += '\\ - Slide down\n';
  dataString += 'X - Percussive slap\n';
  dataString += '~ - Vibrato\n';
  dataString += '+ - Hermonic\n';
  dataString += 'x - Mute string\n';

  return dataString;
};

const writeTextTab = (textTab) => {
  const dataString = createDataString(textTab);
  fs.writeFile('./tmp/test.txt', dataString, (err) => {
    if (err) return console.log(err);
  });
};

module.exports = writeTextTab;
