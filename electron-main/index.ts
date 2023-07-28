import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import {IpcMainEvent} from './events/IpcMainEvent.ts';

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        useContentSize: true,
        frame: false,
        width: 1300,
        height: 850,
        minWidth: 1300,
        minHeight: 850,
        show: false,
        webPreferences: {
            contextIsolation: false, // 是否开启隔离上下文
            nodeIntegration: true, // 渲染进程使用node api
            preload: path.join(__dirname, '../electron-preload/index.js')
        }
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });

    // 如果打包了，渲染index.html
    if (app.isPackaged) {
        await mainWindow.loadFile(path.join(__dirname, '../index.html'));
    } else {
        let url = 'http://localhost:5173'; // 本地启动的vue项目路径
        await mainWindow.loadURL(url);
    }
    IpcMainEvent(mainWindow);
    mainWindow.webContents.openDevTools();
};

app.setAsDefaultProtocolClient('StoneHawkMeetingClient');
app.whenReady().then(async () => {
    // 创建窗口
    await createWindow();
    // installExtension(REDUX_DEVTOOLS)
    //     .then((name) => {
    //         console.log(`Added Extension: ${name}`);
    //     }).catch((error) => {
    //     console.log(`An error occurred`, error);
    // });
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
