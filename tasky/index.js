const eletron = require('electron');
const path = require('path');
const { app } = eletron;
const TimerTray = require('./timer_tray');
const MainWindow = require('./main_window');

app.on('ready', () => {
    app.dock.hide();
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    new TimerTray(
        iconPath,
        new MainWindow(`file://${__dirname}/src/index.html`)
    );
})