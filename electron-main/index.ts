import {app, BrowserWindow} from 'electron';
import * as path from 'path';

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
    // if (app.isPackaged) {
    //     await mainWindow.loadFile(path.join(__dirname, '../index.html'));
    // } else {
    //     let url = 'http://localhost:3000';
    //     await mainWindow.loadURL(url);
    // }
    // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
    if (process.env.VITE_DEV_SERVER_URL) {
        await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        // Load your file
        await mainWindow.loadFile('dist/index.html');
    }
    mainWindow.webContents.openDevTools();
};

app.whenReady().then(async () => {
    // 创建窗口
    await createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
