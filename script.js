self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log('[Service Worker] Push had this data: "'+event.data+'"');

  let notificationData = event.data.json();
  const title = notificationData.title;
  // 可以发个消息通知页面
  //util.postMessage(notificationData); 
  // 弹消息框
  event.waitUntil(self.registration.showNotification(title, notificationData));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  let notification = event.notification;
  notification.close();
  event.waitUntil(
      clients.openWindow(notification.data.url)
  );
});

// Perform install steps
// var CACHE_NAME = 'my-site-cache-v1';
// var urlsToCache = [
//     '/'
// ];

//缓存文件
// self.addEventListener('install', function(event) {
//     // Perform install steps
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(function(cache) {
//             console.log('Opened cache');
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

//缓存响应
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           // Cache hit - return response
//           if (response) {
//             return response;
//           }
  
//           // IMPORTANT: Clone the request. A request is a stream and
//           // can only be consumed once. Since we are consuming this
//           // once by cache and once by the browser for fetch, we need
//           // to clone the response
//           var fetchRequest = event.request.clone();
  
//           return fetch(fetchRequest).then(
//             function(response) {
//               // Check if we received a valid response
//               if(!response || response.status !== 200 || response.type !== 'basic') {
//                 return response;
//               }
  
//               // IMPORTANT: Clone the response. A response is a stream
//               // and because we want the browser to consume the response
//               // as well as the cache consuming the response, we need
//               // to clone it so we have 2 stream.
//               var responseToCache = response.clone();
  
//               caches.open(CACHE_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request, responseToCache);
//                 });
  
//               return response;
//             }
//           );
//         })
//       );
//   });

// self.addEventListener('activate', function(event) {

//     var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheWhitelist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });
