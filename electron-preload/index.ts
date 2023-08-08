import electronAPI, {ElectronAPI} from './toolkit';
import {contextBridge} from 'electron';

const api = {};

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
    } catch (error) {
        console.error(error);
    }
} else {
    window.electron = electronAPI;
    window.api = api;
}

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {};
    }
}
