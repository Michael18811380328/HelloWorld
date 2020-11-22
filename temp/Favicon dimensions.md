# Favicon dimensions

最近更新网站的 favicon.ico 图标文件，那么需要设计什么尺寸的图标呢？有没有固定的标准？

在栈溢出找到了详细的解释：https://stackoverflow.com/questions/2268204/favicon-dimensions

> I have a favicon with the dimensions of height=26px / width=20px named favicon.png
> ```
> <link href=http://www.example.com/images/favicon.png rel="shortcut icon" />
> ```
> **Question**: Is my favicon.png supposed to be a particular size? Also, can I use a non-standard size/dimension and if so, how?

#### 答案

favicon 图标支持 16-32-48 像素的 ICO 图片。ICO 格式的图片与PNG格式的图片不同。这里需要一个方形的图片。原始答案建议大家使用一个生成器自动生成favicon图标（http://realfavicongenerator.net/)）。

[The favicon is supposed to be a set of 16x16, 32x32 and 48x48 pictures in ICO format](http://msdn.microsoft.com/en-us/library/ie/gg491740(v=vs.85).aspx). ICO format is different than PNG. Non-square pictures are not supported.To generate the favicon, for many reasons explained below, I advise you to use this [favicon generator](http://realfavicongenerator.net/). Full disclosure: I'm the author of this site.

#### 综合分析

favicon 必须是正方形（height===width）桌面浏览器和IOS不支持其他形状的图标。图标的格式可以使ico或者是png格式。下面是两种类型的图标的比较。

Favicon must be square. Desktop browsers and Apple iOS do not support non-square icons.

The favicon is supported by several files:

- A `favicon.ico` icon.
- Some other PNG icons.

In order to get the best results across desktop browsers (Windows/IE, MacOS/Safari, etc.), you need to combine both types of icons.

## `favicon.ico`

尽管所有的浏览器都支持ICO文件图标，这个文件类型主要支持早期的IE浏览器。ICO格式不同于png格式。因为一些智能浏览器可以很好的转化PNG图片，即使这些图片使用被错误的重命名为ICO后缀。一个ICO文件可以包含几个图片，微软推使用16×16或者 32×32的尺寸，例如，在地址栏中的图片是16像素的，在任务栏中的快捷方式是32像素的。

Although all desktop browsers can deal with this icon, it is primarily for older version of IE.

The ICO format is different of the PNG format. This point is tricky because some browsers are smart enough to process a PNG picture correctly, even when it was wrongly renamed with an ICO extension.

An ICO file can contain several pictures and [Microsoft recommends to put 16x16, 32x32 and 48x48 versions of the icon in `favicon.ico`](http://msdn.microsoft.com/en-us/library/ie/gg491740(v=vs.85).aspx). For example, IE will use the 16x16 version for the address bar, and the 32x32 for a task bar shortcut.

使用下面的语句声明图标，并把图标放在根目录下面，不推荐让浏览器自动寻找png图标。

Declare the favicon with:

```
<link rel="icon" href="/path/to/icons/favicon.ico">
```

However, it is recommended to [place `favicon.ico` in the root directory of the web site](http://realfavicongenerator.net/faq#why_icons_in_root) and to [not declare it at all](http://realfavicongenerator.net/faq#why_ico_not_declared) and let the modern browsers pick the PNG icons.

## PNG icons

新版IE浏览器和chrome-FF浏览器都推荐使用PNG格式，尺寸从16-32不等。例如，Safari可以使用最大196的图标

Modern desktop browsers (IE11, recent versions of Chrome, Firefox...) prefer to use PNG icons. The usual expected sizes are [16x16, 32x32 and "as big as possible"](http://realfavicongenerator.net/favicon_compatibility). For example, MacOS/Safari uses the 196x196 icon if it is the biggest it can find.

下面详细介绍了不同设备不同浏览器推荐的尺寸

What are the recommended sizes? Pick your favorite platforms:

- [Most desktop browsers: 16x16, 32x32, "as big as possible"](http://realfavicongenerator.net/favicon_compatibility)
- [Android Chrome: 192x192](https://developer.chrome.com/multidevice/android/installtohomescreen)
- [Google TV: 96x96](https://developers.google.com/tv/web/docs/design_for_tv#favicons)
- ... and others that are more or less documented.

可以声明多个路径

The PNG icons are declared with:

```
<link rel="icon" type="image/png" href="/path/to/icons/favicon-16x16.png" sizes="16x16">
<link rel="icon" type="image/png" href="/path/to/icons/favicon-32x32.png" sizes="32x32">
...
```

注意：FF不支持sizes属性，会使用最后的PNG图片，所以确保最后的是 32 像素的图片。并且在FF中可以防止瞎子啊一个不需要的大图片。

Beware: [Firefox does not support the `sizes` attribute and uses the last PNG icon it finds](https://bugzilla.mozilla.org/show_bug.cgi?id=751712). Make sure to declare the 32x32 picture last: it is good enough for Firefox, and that will prevent it from downloading a big picture it does not need.

Chrome不支持sizes属性，会下载所有的声明的图标，所以最好不要声明太多的图标。

Also note that [Chrome does not support the `sizes` attribute and tends to load all declared icons](https://code.google.com/p/chromium/issues/detail?id=324820). Better not declare too many icons.

## Mobile platforms

This question is about desktop favicon so there is no need to delve too much in this topic.

[Apple defines touch icon for the iOS platform](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html). iOS does not support non-square icon. [It simply rescales non-square pictures to make them square (look for the Kioskea example)](http://realfavicongenerator.net/blog/apple-touch-icon-the-good-the-bad-the-ugly/).

[Android Chrome relies on the Apple touch icon and also defines a 192x192 PNG icon](https://developer.chrome.com/multidevice/android/installtohomescreen).

[Microsoft defines the tile picture](http://blogs.msdn.com/b/ie/archive/2012/06/08/high-quality-visuals-for-pinned-sites-in-windows-8.aspx) and the [`browserconfig.xml` file](http://msdn.microsoft.com/en-us/library/ie/dn455106(v=vs.85).aspx).

## Conclusion

Generating a favicon that works everywhere is quite complex. I advise you to use this [favicon generator](http://realfavicongenerator.net/). Full disclosure: I'm the author of this site.

结论：生成一个可以在任何浏览器可以很好使用的favicon是很复杂的，原作者建议使用自己的图标生成器。