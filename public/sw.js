if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/190-ed1137387e43200a.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/231-2220c01be9de70ef.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/349-08a6046ee7bc93aa.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/474-ccac2edc320df2f2.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/534-b30c7c18731ecf04.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/674-eec64b9006cf6935.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/794-c5d0e60a081dc380.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/883-485f493c9f46b78f.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/(pages)/auth/page-1639f77a1ecb1327.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/(pages)/demo/page-73a30b6f8121526f.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/(pages)/page-d58437b7dc5a6363.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/(pages)/recent/page-f45d29de621e7033.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/(pages)/upgrade/page-39c00eacd1737821.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/(pages)/welcome/page-dafa6cee4c31a239.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/_not-found/page-a0b5507a2b7b57b8.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/app/layout-a6247416ec5ea9db.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/fd9d1056-bfbeafacdddf7a4f.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/main-app-0c2c112a0030cf1e.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/main-c18f18fc816619b0.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e5ef6417b0a534dc.js",revision:"iJHhPlz1IcxTVqtTn5vOW"},{url:"/_next/static/css/18881dd9d3b90590.css",revision:"18881dd9d3b90590"},{url:"/_next/static/css/1c4dd4e03279108c.css",revision:"1c4dd4e03279108c"},{url:"/_next/static/iJHhPlz1IcxTVqtTn5vOW/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/iJHhPlz1IcxTVqtTn5vOW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/favicon.ico",revision:"1b250d4e1e0e6319aa31d3a38209694b"},{url:"/icon512_maskable.png",revision:"0761a24ba4e6ec1b14d1baa120ef4c91"},{url:"/icon512_rounded.png",revision:"f807dab9505ac35a6fc4374a8054f906"},{url:"/logo.png",revision:"86ee0e8fada6f335a13c9f77446d0c9e"},{url:"/manifest.json",revision:"5bb8d8eebc74ae26ff9642aa3643415d"},{url:"/mockup.png",revision:"3a4d562b1569af08e140f4b74c5841c4"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));