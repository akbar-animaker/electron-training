const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = electron;

let mainWindow;
let newWindow;


function createdAddWindow() {
    newWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 200,
        title: 'Add To Do'
    });
    newWindow.loadURL(`file://${__dirname}/add.html`);
    newWindow.on('closed', () => newWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    newWindow.close();
});

let menuTemplate = [
    {
        label: 'File',
        submenu: [{
            label: 'Todo',
            click() {
                createdAddWindow();
            }
        }, {
            label: 'Clear Todo',
            click() {
                mainWindow.webContents.send('todo:clear', true);
            }
        }, {
            label: 'Quit',
            accelerator: (() => {
                if (process.platform === 'darwin') {
                    return 'Command+Q'
                } else {
                    return 'Ctrl+Q'
                }
            })(),
            click() {
                app.quit();
            }
        }]
    }
];
if (process.env.NODE_ENV !== 'prouction') {
    menuTemplate.push({
        label: 'View',
        submenu: [{ role: 'reload' }, {
            label: 'Dev Tools',
            accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }]
    })
}
if (process.platform === 'darwin') {
    menuTemplate = [{
        label: 'Electron'
    }, ...menuTemplate]
}
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.on(('closed'), () => app.quit());
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    const menuApp = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menuApp)
});