if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const a=e=>s(e,t),l={module:{uri:t},exports:o,require:a};i[t]=Promise.all(n.map((e=>l[e]||a(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CM-Nciih.css",revision:null},{url:"assets/index-UR7iStWO.js",revision:null},{url:"assets/workbox-window.prod.es5-B9K5rw8f.js",revision:null},{url:"index.html",revision:"eecaaad7aa7009a09a9cb0510e26def1"},{url:"vite.png",revision:"a26e80c71709a3ecdaf0e341acbaa8a1"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"vite.png",revision:"a26e80c71709a3ecdaf0e341acbaa8a1"},{url:"manifest.webmanifest",revision:"ee21413b211b6cd00d32ae4e700a5bf2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
