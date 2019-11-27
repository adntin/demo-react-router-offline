// https://developers.google.com/web/tools/workbox/modules/workbox-window

import { Workbox } from 'workbox-window';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    const wb = new Workbox('/sw.js'); // 注意：路径需要和webpack.config.js中`swDest`一致

    wb.addEventListener('installed', event => {
      console.log('[Service Worker] installed!', event);
    });

    wb.addEventListener('activated', event => {
      console.log('[Service Worker] activated!', event);
      // 1. 默默获取首页URL，因为webpack.config.js中已经剔除index.html
      const urlsToCache = [
        window.location.origin + '/index.html',
        // ...window.performance.getEntriesByType('resource').map(r => r.name),
      ];
      // 2. 将该URL列表发送到 serviceWorker 的路由器
      wb.messageSW({
        type: 'CACHE_URLS',
        payload: { urlsToCache },
      });
    });

    wb.addEventListener('controlling', event => {
      console.log('[Service Worker] controlling!', event);
    });

    wb.register().catch(error => {
      // file:///Users/devin/Desktop/xxx/dist/index.html
      // 必须是https协议
      // "SecurityError: Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported."
      console.log('[Service Worker] register failure:', error.toString());
    });
  });
} else {
  console.log('[Service Worker] are not supported in the production environment or in the browser!');
}
