import {contextBridge} from 'electron';
import {ElectronAPI, electronAPI} from './toolkit';

const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI);
        contextBridge.exposeInMainWorld('api', api);
        contextBridge.exposeInMainWorld('zgDefines', zgDefines);
        contextBridge.exposeInMainWorld('zgEngine', zgEngine);
    } catch (error) {
        console.error(error);
    }
} else {
    window.electron = electronAPI;
    window.api = api;
    window.zgDefines = zgDefines;
    window.zgEngine = zgEngine;
}

declare global {
    interface Window {
        electron: ElectronAPI;
        api: {};
        zgDefines: {};
        zgEngine: {};
    }
}
