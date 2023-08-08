import {contextBridge} from 'electron';
import {ElectronAPI, electronAPI} from './toolkit';
import TRTCCloud from 'trtc-electron-sdk/liteav/trtc';
// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
        contextBridge.exposeInMainWorld('trtc', TRTCCloud);
    } catch (error) {
        console.error(error);
    }
} else {
    window.electron = electronAPI;
    window.api = api;
    window.trtc = new TRTCCloud;
}

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {};
        trtc: TRTCCloud;
    }
}
