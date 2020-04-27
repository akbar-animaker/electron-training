const electron = require('electron');
const { Tray, ipcMain, Menu, app } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Timer App')
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
        // ipcMain.on('Update:Timer', this.setTrayTitle.bind(this))
    }

    // setTrayTitle(event, title) {
    //     this.setTitle(title)
    // }

    onRightClick(event) {
        const menuConfig = Menu.buildFromTemplate([{
            label: 'Quit',
            click: () => app.quit()
        }]);
        this.popUpContextMenu(menuConfig)
    }

    onClick(event, bounds) {
        const { x, y } = bounds;
        const { width, height } = this.mainWindow.getBounds();
        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            /**
             * This is because OSX icons displayed in top but window, icons displayed in bottom
             */
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: yPosition,
                width,
                height
            })
            this.mainWindow.show();
        }
    }
}

module.exports = TimerTray;