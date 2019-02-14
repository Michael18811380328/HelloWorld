<template>
<div id="index-page" @click="goToStoryDetail">
  <!-- 顶部轮播 -->
  <el-carousel arrow="nerver" height="250px">
    <el-carousel-item v-for="item in topStories" :key="item.id" :data-id="item.id">
      <div class="top-stories-item" :style="'background-image: url(' + item.image + ')'" :data-id="item.id">
        <div class="top-stories-item-text" :data-id="item.id">
          <span :data-id="item.id">{{ item.title }}</span>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
  <!-- 热闻列表 -->
  <div id="stories-list">
    <template v-for="(stories, index) in storiesByDay">
      <span class="stories-time" :key="index">{{ stories.date }}</span>
      <div class="stories-list-item" v-for="item in stories.stories" :key="item.id" :data-id="item.id">
        <span :data-id="item.id">{{ item.title }}</span>
        <img :src="item.images[0]" :data-id="item.id"/>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
import axios from 'axios'
import { formatDate } from '../utils/util'
import scroll from '../utils/scroll'

export default {
  components: {
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem
  },
  data () {
    return {
      topStories: [],
      storiesByDay: [],
      beforeDay: ''
    }
  },
  /**
   * 进入页面加载今日热闻
   */
  created () {
    axios.get('/api/4/news/latest').then(res => {
      if (res.status === 200) {
        this.topStories = res.data.top_stories
        this.storiesByDay = [{
          stories: res.data.stories,
          date: '今日热闻'
        }]
        this.beforeDay = res.data.date
      }
    })
  },
  /**
   * 页面滚动触底时加载过往热闻
   */
  mounted () {
    window.onscroll = () => {
      if (scroll.reachBottom()) {
        this.getMoreStories()
      }
    }
  },
  /**
   * 离开本页面时解除滚动监听，以免影响其它页面
   */
  destroyed () {
    window.onscroll = null
  },
  methods: {
    /**
     * 加载过往热闻
     */
    getMoreStories () {
      axios.get('/api/4/news/before/' + this.beforeDay).then(res => {
        if (res.status === 200) {
          this.storiesByDay.push({
            stories: res.data.stories,
            date: formatDate(res.data.date)
          })
          this.beforeDay = res.data.date
        }
      })
    },
    /**
     * 跳转到详情
     */
    goToStoryDetail (e) {
      if (e.target.dataset.id) {
        this.$router.push('/detail?id=' + e.target.dataset.id)
      }
    }
  }
}
</script>

<style>
#index-page {
  background: #eee;
}

.top-stories-item {
  height: 100%;
  background-size: cover;
  position: relative;
}

.top-stories-item-text {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  padding: 40px 20px;
}

.top-stories-item-text span {
  color: white;
  text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  font-size: 18px;
}

#stories-list {
  padding: 15px;
}

.stories-time {
  display: block;
  color: #717171;
  padding: 15px 0;
  font-size: 20px;
}

.stories-list-item {
  display: flex;
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  background: white;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.stories-list-item span {
  display: block;
  flex-grow: 1;
  font-size: 18px;
  margin-right: 30px;
}

.stories-list-item img {
  width: 80px;
  height: 80px;
}
</style>
