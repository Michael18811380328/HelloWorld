# html2canvas

http://html2canvas.hertzen.com/

https://github.com/niklasvh/html2canvas

http://html2canvas.hertzen.com/documentation

这个库允许你直接在浏览器上获取图片或其部分的“屏幕截图”。

屏幕截图基于DOM，因此可能无法100%准确地反映真实情况。

因为它不会生成实际的屏幕截图，而是根据页面上提供的信息构建屏幕截图。

## 工作原理

脚本将遍历加载它的页面的DOM。它收集所有元素的信息，然后使用这些元素来构建页面的表示。实际上，它不是基于一个页面的10个字来构建的，而是基于它的一个页面的表示。

因此，它只能正确地呈现它理解的属性，这意味着有许多CSS属性不起作用。有关支持的CSS属性的完整列表，请查看[支持的功能](https://translate.baiducontent.com/transpage?cb=translateCallback&ie=utf8&source=url&query=http%3A%2F%2Fhtml2canvas.hertzen.com%2Ffeatures%2F&from=en&to=zh&token=&monLang=zh)第页。

## 使用案例

~~~jsx
import html2canvas from 'html2canvas';

onCapture = () => {
  html2canvas(document.querySelector("#map-container"), {
    allowTaint: true,
    taintTest: true,
    useCORS: true,
    ignoreElements: (element) => {
      if (CAPTURE_IGNORE_CLASS_LIST.includes(element.className)) {
        return true;
      }
    }
  }).then(canvas => {
    const captureContainer = document.createElement('div');
    captureContainer.className = 'map-capture';
    const downLoadLink = document.createElement('a');
    downLoadLink.className = 'download-link';
    captureContainer.appendChild(downLoadLink);
    captureContainer.appendChild(canvas);
    document.querySelector('.dtable-map-plugin').appendChild(captureContainer);

    document.querySelector('.map-capture').appendChild(canvas);
    this.convertCanvasToImage(canvas);
  });
}

convertCanvasToImage = (canvas) => {
  const src = canvas.toDataURL("image/png", 1);
  const link = document.querySelector('.download-link');
  link.href = src;
  link.download = 'map.png';
  link.click();
  document.querySelector('.map-capture').remove();
}
~~~

