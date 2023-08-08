import {contextBridge} from 'electron';
import {ElectronAPI, electronAPI} from './toolkit';

const TRTCCloud = require('trtc-electron-sdk').default;
// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
        contextBridge.exposeInMainWorld('trtc', new TRTCCloud());
    } catch (error) {
        console.error(error);
    }
} else {
    window.electron = electronAPI;
    window.api = api;
    window.trtc = new TRTCCloud();
}

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {};
        trtc: typeof TRTCCloud;
    }
}
