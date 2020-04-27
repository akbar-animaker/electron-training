const electron = require('electron');
const path = require('path');
const { app } = electron;
const url = require('url');
const TimerTray = require('./timer_tray');
const MainWindow = require('./main_window');

app.on('ready', () => {
  app.dock.hide();
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `../src/assets/${iconName}`);
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  // Set the path where recordings will be saved
  app.setPath("userData", __dirname + "/saved_recordings")
  new TimerTray(
      iconPath,
      new MainWindow(startUrl)
  );
})