## video-js 说明

Video.js is a web video player built from the ground up for an HTML5 world. It supports HTML5 and Flash video, as well as YouTube and Vimeo (through [plugins](https://videojs.com/plugins/)). It supports video playback on desktops and mobile devices. 

video.js 是一个基于H5的网页视频播放器（支持H5和flsah，需要通过插件支持Youtube和Vimeo，国内貌似不需要）。可以在桌面端或者移动端使用。

### 基本使用

Next, using Video.js is as simple as creating a `<video>` element, but with an additional `data-setup` attribute. At a minimum, this attribute must have a value of `'{}'`, but it can include any Video.js [options](https://github.com/videojs/video.js/blob/master/docs/guides/options.md) - just make sure it contains valid JSON!

基本使用：自动创建一个 video 标签，具有一个额外的属性 data-setup。这个属性必须是一个JSON对象，可以设置选项（视频自动播放，宽度高度、媒体流、响应式、语言、循环、海报等选项，详见官网）。

官网配置链接：https://github.com/videojs/video.js/blob/master/docs/guides/options.md

~~~html
<head>
  <link href="https://vjs.zencdn.net/7.5.4/video-js.css" rel="stylesheet">
  <!-- If you'd like to support IE8 (for Video.js versions prior to v7) -->
  <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
</head>

<body>
  <video id='my-video' class='video-js' controls preload='auto' width='640' height='264'
  poster='MY_VIDEO_POSTER.jpg' data-setup='{}'>
    <source src='MY_VIDEO.mp4' type='video/mp4'>
    <source src='MY_VIDEO.webm' type='video/webm'>
    <p class='vjs-no-js'>
      To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
    </p>
  </video>

  <script src='https://vjs.zencdn.net/7.5.4/video.js'></script>
</body>
~~~

### 高级使用

If you don't want to use automatic setup, you can leave off the `data-setup` attribute and initialize a `<video>` element manually using the `videojs` function

如果你不想使用自动创建(想要自定义安装)，你可以不需要在 video 标签上设置 data-setup 属性，只在后面使用一个 videojs 函数。这个函数也接受一个选项optins和一个回调函数(当播放器准备就绪、播放结束的回调函数)。

The `videojs` function also accepts an `options` object and a callback to be invoked when the player is ready:

~~~js
var player = videojs('my-player');

var options = {};
var player = videojs('my-player', options, function onPlayerReady() {
  videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  this.on('ended', function() {
    videojs.log('Awww...over so soon?!');
  });
});
~~~

### 原始链接

Github 链接

https://github.com/videojs/video.js

官网入门链接

https://videojs.com/getting-started/

开发文档链接

https://docs.videojs.com/