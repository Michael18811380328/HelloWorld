const WxParse = require('../../wxParse/wxParse.js')

Page({
  data: {
    storyId: '',
    image: '',
    imageSource: '',
    title: ''
  },

  /**
   * 页面加载完成后提取从其他页面传递过来的id参数
   */
  onLoad (option) {
    if (option.id || option.query.id) {
      this.data.storyId = option.id || option.query.id
    }
  },

  /**
   * 进入页面加载热闻详情
   */
  onShow () {
    this.getStoryDetail()
  },

  /**
   * 获取热闻详情
   */
  getStoryDetail () {
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + this.data.storyId,
      success: (res) => {
        WxParse.wxParse('story', 'html', res.data.body, this, 5)
        this.setData({
          image: res.data.image,
          imageSource: res.data.image_source,
          title: res.data.title
        })
      }
    })
  },

  /**
   * 转发分享当前热闻
   */
  onShareAppMessage () {
    return {
      title: this.data.title,
      imageUrl: this.data.image,
      path: '/pages/detail/detail?id=' + this.data.storyId
    }
  },

  /**
   * 跳转到当前热闻对应的评论页面
   */
  goToDiscussion () {
    wx.navigateTo({
      url: '/pages/discussion/discussion?id=' + this.data.storyId
    })
  }
})
