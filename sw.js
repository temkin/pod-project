if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),a={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>a[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-0n6cBYhu.js",revision:null},{url:"assets/index-CM-Nciih.css",revision:null},{url:"assets/workbox-window.prod.es5-B9K5rw8f.js",revision:null},{url:"index.html",revision:"b2ac5e0a1c9bf719ed185fccae1ccf45"},{url:"vite.png",revision:"a26e80c71709a3ecdaf0e341acbaa8a1"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"vite.png",revision:"a26e80c71709a3ecdaf0e341acbaa8a1"},{url:"manifest.webmanifest",revision:"ee21413b211b6cd00d32ae4e700a5bf2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
