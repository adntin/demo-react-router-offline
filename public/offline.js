/* eslint-disable no-undef */
// https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
// https://developers.google.com/web/tools/workbox/modules/workbox-precaching
// https://developers.google.com/web/tools/workbox/modules/workbox-core
// https://github.com/GoogleChrome/workbox/issues/1767

importScripts('/workbox-v4.3.1/workbox-sw.js');

const now = Date.now();

// 添加静态资源到`precache`缓存，来自`/public/*`。剔除`index.html`，因为希望`index.html`是`runtime`缓存
workbox.precaching.precacheAndRoute([
  { url: '/manifest.json', revision: now },
  { url: '/favicon.ico', revision: now },
  { url: '/logo192.png', revision: now },
  { url: '/logo512.png', revision: now },
]);

workbox.routing.registerRoute(
  new workbox.routing.NavigationRoute(async ({ url }) => {
    // 1. 第一次打开（没有缓存）时，不会执行以下脚本
    // 2. 此脚本用于处理`precache`缓存没有`index.html`的fallback
    // 3. `runtime`缓存需要自己（人工）`/src/service-worker.js`默默请求`/index.html`路径
    // const cacheName = workbox.core.cacheNames.precache;
    // const cacheKey = workbox.precaching.getCacheKeyForURL('/index.html');
    const cacheName = workbox.core.cacheNames.runtime;
    const cacheKey = '/index.html';
    const cache = await caches.open(cacheName);

    let networkResponse;
    let networkError;

    // 从远程拿资源
    try {
      // 有网络
      networkResponse = await fetch(url.origin + cacheKey);
      if (networkResponse.ok) {
        await cache.put(cacheKey, networkResponse.clone()); // 保存到`runtime`缓存
        return networkResponse;
      }
    } catch (error) {
      // 无网络
      networkError = error;
    }

    // 从本地拿资源
    const cacheMatch = await cache.match(cacheKey);
    if (cacheMatch) {
      return cacheMatch;
    } else if (networkResponse) {
      return networkResponse;
    } else {
      throw networkError;
    }
  }),
);
