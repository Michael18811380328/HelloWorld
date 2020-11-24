# 渐进式 Web 应用（PWA）

PWA（Progressive web apps，渐进式 Web 应用）运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。这些应用无处不在、功能丰富，使其具有与原生应用相同的用户体验优势。

PWA 是可被发现、易安装、可链接、独立于网络、渐进式、可重用、响应性和安全的。关于这些含义的细节，请参阅 [PWA的优势](https://developer.mozilla.org/zh-CN/docs/Web/Apps/Progressive/Advantages)。

## 核心 PWA 指南

以下指南通过简单的示例和工作原理，展示了实施PWA需要做什么。需要的时候再学习。

1. [PWA 介绍](https://developer.mozilla.org/zh-CN/docs/Web/Apps/Progressive/Introduction)
2. [PWA 结构](https://developer.mozilla.org/zh-CN/docs/Web/Apps/Progressive/App_structure)
3. [通过 Service workers 让 PWA 离线工作](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Offline_Service_workers)
4. [让 PWA 易于安装](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Installable_PWAs)
5. [通过通知推送让 PWA 可重用](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push)
6. [渐进式加载](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Loading)

## 技术指南

- [用户端存储](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage) — 关于如何使用 Web 存储、IndexedDB 和 Service workers 的指南。
- [使用 Service workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers) — 关于 Service Worker API 的深入指南。
- [使用 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB) — 有关 IndexedDB 的知识与细节。
- [使用 Web 存储 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) — Web 存储 API 简化了工作。
- [使用应用 Shell 架构的快速加载的 Web 应用](https://developers.google.com/web/updates/2015/11/app-shell) — 使用 App Shell 编码模式创建快速加载的应用的指南。
- [使用推送 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API/Using_the_Push_API) — 了解 Web Push API 背后的知识。
- [使用通知 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API/Using_the_Notifications_API) — 换言之，Web 通知。
- [响应式设计的构建模块](https://developer.mozilla.org/zh-CN/docs/Web/Apps/Modern/Responsive/responsive_design_building_blocks) — 学习响应式设计的基础知识，也是现代应用布局的基本话题。
- [移动优先](https://developer.mozilla.org/zh-CN/docs/Web/Apps/Modern/Responsive/Mobile_first) — 在创建响应式应用程序布局时，通常将移动布局创建为默认并在顶部构建更宽的布局。
- [“添加到主屏幕”指南](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Add_to_home_screen) — 了解如何利用添加到主屏幕（A2HS）。

## 工具

- [localForage](https://localforage.github.io/localForage/) — a nice simple JavaScript library for making client-side data storage really simple; it uses IndexedDB by default, and falls back to Web SQL/Web Storage if necessary.
- [ServiceWorkerWare](https://github.com/fxos-components/serviceworkerware) — an *Express-like* microframework for easy Service Worker development.
- [oghliner](https://github.com/mozilla/oghliner) — not only a template but a tool for deploying Offline Web Apps to GitHub Pages.
- [sw-precache](https://github.com/GoogleChrome/sw-precache) — a node module to generate service worker code that will precache specific resources.
- [workbox](https://github.com/GoogleChrome/workbox) — spiritual successor to sw-precache with more advanced caching strategies and easy precaching.
- [upup](https://www.talater.com/upup/) — a tiny script that makes sure your site is always there for your users.
- [The service worker cookbook](https://serviceworke.rs/) — A series of excellent service worker/push recipes, showing how to implement an offline app, but also much more.