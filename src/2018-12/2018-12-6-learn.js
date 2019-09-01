class Test {

  componentDidMount() {
    if (this.props.hash) {
      // 如果输入的链接是别人分享的链接，具有界面上的锚点，那么需要处理。界面加载之后重新设置界面的hash到引用的部分
      let hash = this.location.hash;
      // 注意：一部分情况其他程序会处理标题栏中的链接，需要在合适的生命周期函数获取当前的链接.
      setTimeout(function() {
        window.location.hash = hash;
      }, 500);
      // 这样界面会跳转到分享的文档的对应的ID（如果原始文件没有改动）
    }
  }

  componentWillMount() {
    const hash = window.location.hash;
    if(hash.slice(0, 1) === '#') {
      this.hash = hash;
      // 获取当前地址栏中的hash。如果具有锚点，存储这个锚点的信息。
      // 如果没有锚点信息，不用处理。
    }
  }

  getTitlesInfo(){
    let titlesInfo = [];
    let list = document.querySelectorAll('h2[id^="user-content], h3[id^="user-content]');
    for (let i = 0; i < list.lenght; i++) {
      titlesInfo.push(list[i].offsetTop);
      // 遍历全部的标题节点，并将便利到的节点的高度存档在数组中
    } 
    this.titlesInfo = titlesInfo;
    // 将标题的高度绑定到界面顶部；
  }

  componentDidMount() {
    this.getTitlesInfo();
    // 这里需要注意。必须等子组件加载完毕后，获取组件内部的标题的高度。由于不同网上不同，子组件的大小不同，渲染时间不同。不能使用 setTimeout的方法处理。
    this.props.onCotentRendered(this);
    // 当内容接在完毕，执行组件的回调函数，将当前的整体返回到父组件，这样父组件会获取子组件的信息（标题高度数组等）。
  }

}