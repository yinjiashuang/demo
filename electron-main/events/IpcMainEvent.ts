import {app, BrowserWindow, ipcMain, shell} from 'electron';

export const IpcMainEvent = (mainWindow: BrowserWindow): void => {
    ipcMain.on('exit', () => {
        app.exit();
    });

    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('maximize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        }else {
            mainWindow.maximize();
        }
    });

    ipcMain.on('login', (_, url) => {
        shell.openExternal(url).then(() => {
            mainWindow.webContents.send('main-channel', '发送消息');
        });
    });

    app.on('open-url', (_, argv) => {
        const form = urlTool(argv);
        mainWindow.webContents.send('login-success', form);
    });
};

const urlTool = (url: string) => {
    //将url用“?”和“&”分割;
    const array: Array<String> = url.split('?').pop().split('&');

    //声明一个空对象用来储存分割后的参数；
    const data = {};

    array.forEach((ele) => {

        //将获得到的每个元素用 "="进行分割
        let dataArr = ele.split('=');

        //将数组的每一个元素遍历到对象中;
        data[dataArr[0]] = dataArr[1];

    });
    return data;
};
