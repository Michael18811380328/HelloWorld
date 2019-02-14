const utils = require('../../utils/util.js')

Page({
  data: {
    topStories: [],
    storiesByDay: [],
    beforeDay: ''
  },

  /**
   * 进入页面加载今日热闻
   */
  onShow () {
    this.getStories()
  },

  /**
   * 上拉触底，加载更多热闻
   */
  onReachBottom () {
    this.getMoreStories()
  },

  /**
   * 获取首页数据
   */
  getStories () {
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: (res) => {
        this.setData({
          topStories: res.data.top_stories,
          storiesByDay: [{
            stories: res.data.stories,
            date: '今日热闻'
          }],
          beforeDay: res.data.date
        })
      }
    })
  },

  /**
   * 加载过往热闻
   */
  getMoreStories () {
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + this.data.beforeDay,
      success: (res) => {
        this.data.storiesByDay.push({
          stories: res.data.stories,
          date: utils.formatDate(res.data.date)
        })
        this.setData({
          storiesByDay: this.data.storiesByDay,
          beforeDay: res.data.date
        })
      }
    })
  },

  /**
   * 点击某条热闻，跳转到热闻详情
   */
  goToStoryDetail (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.target.dataset.id
    })
  }
})
