const utils = require('../../utils/util.js')

Page({
  data: {
    storyId: '',
    longComments: [],
    shortComments: []
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
   * 进入页面加载评论内容
   */
  onShow () {
    this.getComments(0)
    this.getComments(1)
  },

  /**
   * 加载长评或短评
   * @param { Number } type 评论类型，0-长评，1-短评
   */
  getComments (type) {
    const postfix = ['/long-comments', '/short-comments']
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/story/' + this.data.storyId + postfix[type],
      success: (res) => {
        // 格式化评论发表时间
        for (let i = 0; i < res.data.comments.length; ++i) {
          res.data.comments[i].time = utils.formatTime(res.data.comments[i].time)
        }
        // 设置数据
        if (type === 0) {
          this.setData({ longComments: res.data.comments })
        } else {
          this.setData({ shortComments: res.data.comments })
        }
      }
    })
  }
})
