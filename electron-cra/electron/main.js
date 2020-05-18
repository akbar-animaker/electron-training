const electron = require('electron');
const { BrowserWindow } = electron;
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
  const main_window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false
  });
  main_window.loadURL(startUrl);
  // const main_window = new MainWindow(startUrl);
  new TimerTray(
    iconPath,
    main_window
  );
})