import {ConfigEnv, defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import * as path from 'path';
import resolve from 'vite-plugin-resolve';

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [
            vue(),
            electron([
                {
                    entry: 'electron-main/index.ts', // 主进程文件
                    vite: {
                        build: {
                            outDir: 'dist/electron-main'
                        }
                    }
                },
                {
                    entry: 'electron-preload/index.ts', // 预加载
                    vite: {
                        build: {
                            outDir: 'dist/electron-preload'
                        }
                    }
                }
            ]),
            resolve({
                'trtc-electron-sdk': `
                  const TRTCCloud = require("trtc-electron-sdk");
                  const TRTCParams = TRTCCloud.TRTCParams;
                  const TRTCAppScene = TRTCCloud.TRTCAppScene;
                  const TRTCVideoStreamType = TRTCCloud.TRTCVideoStreamType;
                  const TRTCScreenCaptureSourceType = TRTCCloud.TRTCScreenCaptureSourceType;
                  const TRTCVideoEncParam = TRTCCloud.TRTCVideoEncParam;
                  const Rect = TRTCCloud.Rect;
                  const TRTCAudioQuality = TRTCCloud.TRTCAudioQuality;
                  const TRTCScreenCaptureSourceInfo = TRTCCloud.TRTCScreenCaptureSourceInfo;
                  const TRTCDeviceInfo = TRTCCloud.TRTCDeviceInfo;
                  const TRTCVideoQosPreference = TRTCCloud.TRTCVideoQosPreference;
                  const TRTCQualityInfo = TRTCCloud.TRTCQualityInfo;
                  const TRTCQuality = TRTCCloud.TRTCQuality;
                  const TRTCStatistics = TRTCCloud.TRTCStatistics;
                  const TRTCVolumeInfo = TRTCCloud.TRTCVolumeInfo;
                  const TRTCDeviceType = TRTCCloud.TRTCDeviceType;
                  const TRTCDeviceState = TRTCCloud.TRTCDeviceState;
                  const TRTCBeautyStyle = TRTCCloud.TRTCBeautyStyle;
                  const TRTCVideoResolution = TRTCCloud.TRTCVideoResolution;
                  const TRTCVideoResolutionMode = TRTCCloud.TRTCVideoResolutionMode;
                  const TRTCVideoMirrorType = TRTCCloud.TRTCVideoMirrorType;
                  const TRTCVideoRotation = TRTCCloud.TRTCVideoRotation;
                  const TRTCVideoFillMode = TRTCCloud.TRTCVideoFillMode;
                  const TRTCRoleType = TRTCCloud.TRTCRoleType;
                  const TRTCScreenCaptureProperty = TRTCCloud.TRTCScreenCaptureProperty;
                  export { 
            TRTCParams,
            TRTCAppScene,
            TRTCVideoStreamType,
            TRTCScreenCaptureSourceType,
            TRTCVideoEncParam,
            Rect,
            TRTCAudioQuality,
            TRTCScreenCaptureSourceInfo,
            TRTCDeviceInfo,
            TRTCVideoQosPreference,
            TRTCQualityInfo,
            TRTCStatistics,
            TRTCVolumeInfo,
            TRTCDeviceType,
            TRTCDeviceState,
            TRTCBeautyStyle,
            TRTCVideoResolution,
            TRTCVideoResolutionMode,
            TRTCVideoMirrorType,
            TRTCVideoRotation,
            TRTCVideoFillMode,
            TRTCRoleType,
            TRTCQuality,
            TRTCScreenCaptureProperty,
          };
          export default TRTCCloud.default;
         `
            }),
        ],
        build: {
            emptyOutDir: false
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            port: 5173,
            https: false,
            host: '0.0.0.0',
            open: false,
            proxy: {
                '/client': {
                    changeOrigin: true,
                    target: env.VITE_APP_BASE_URL,
                    rewrite: (path) => path.replace(/^\/client/, '')
                },
            }
        }
    };
});
