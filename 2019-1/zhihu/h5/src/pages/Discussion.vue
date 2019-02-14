<template>
<div id="discussion-page">
  <!-- 长评 -->
  <span id="long-comments-bar">{{ longComments.length }}条长评</span>
  <div class="comments" v-for="(item, index) in longComments" :key="index">
    <div class="info">
      <img class="avatar" :src="item.avatar" />
      <span class="author">{{ item.author }}</span>
      <span class="likes">❤ {{ item.likes }}</span>
    </div>
    <span class="content">{{ item.content }}</span>
    <span class="time">{{ item.time }}</span>
  </div>
  <!-- 短评 -->
  <span id="short-comments-bar">{{ shortComments.length }}条短评</span>
  <div class="comments" v-for="(item, index) in shortComments" :key="index">
    <div class="info">
      <img class="avatar" :src="item.avatar" />
      <span class="author">{{ item.author }}</span>
      <span class="likes">❤ {{ item.likes }}</span>
    </div>
    <span class="content">{{ item.content }}</span>
    <span class="time">{{ item.time }}</span>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { formatTime } from '../utils/util'

export default {
  data () {
    return {
      longComments: [],
      shortComments: []
    }
  },
  created () {
    this.getComments(0)
    this.getComments(1)
  },
  methods: {
    /**
     * 加载长评或短评
     * @param { Number } type 评论类型，0-长评，1-短评
     */
    getComments (type) {
      const postfix = ['/long-comments', '/short-comments']
      axios.get('/api/4/story/' + this.$route.query.id + postfix[type]).then(res => {
        if (res.status === 200) {
          // 格式化评论发表时间
          for (let i = 0; i < res.data.comments.length; ++i) {
            res.data.comments[i].time = formatTime(res.data.comments[i].time)
          }
          // 设置数据
          if (type === 0) {
            this.longComments = res.data.comments
          } else {
            this.shortComments = res.data.comments
          }
        }
      })
    }
  }
}
</script>

<style>
#long-comments-bar, #short-comments-bar, .comments {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: block;
}

.comments .info {
  display: flex;
  align-items: center;
}

.comments .info .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comments .info .author {
  flex-grow: 1;
  padding: 15px;
}

.comments .info .likes {
  color: #888;
}

.comments .content, .comments .time {
  display: block;
}

.comments .time {
  margin-top: 15px;
  color: #999;
  font-size: 12px;
}
</style>
