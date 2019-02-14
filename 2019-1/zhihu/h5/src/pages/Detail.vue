<template>
<div id="detail-page">
  <div id="story-title" :style="'background-image: url(' + image + ')'">
    <div id="title-text">
      <span id="image-source">{{ imageSource }}</span>
      <span id="title">{{ title }}</span>
    </div>
  </div>
  <rich-text id="story-content" v-html="storyContent"></rich-text>
  <div id="action">
    <button id="share" @click="share">☍</button>
    <button id="discuss" @click="goToDiscussion">☷</button>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import RichText from '../components/RichText'
import { Message } from 'element-ui'

export default {
  components: {
    'rich-text': RichText
  },
  data () {
    return {
      image: '',
      imageSource: '',
      storyContent: '',
      title: ''
    }
  },
  created () {
    axios.get('/api/4/news/' + this.$route.query.id).then(res => {
      if (res.status === 200) {
        this.image = res.data.image
        this.imageSource = res.data.image_source
        this.storyContent = res.data.body
        this.title = res.data.title
      }
    })
  },
  methods: {
    /**
     * 跳转到评论页
     */
    goToDiscussion () {
      this.$router.push('/discussion?id=' + this.$route.query.id)
    },
    /**
     * 分享内容（无接入SDK，仅占位，不做实现）
     */
    share () {
      Message({
        showClose: true,
        message: '分享功能未实现',
        type: 'error'
      })
    }
  }
}
</script>

<style>
#story-title {
  height: 250px;
  background-size: cover;
}

#title-text {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column-reverse;
}

#title-text span {
  display: block;
}

#title-text #title {
  padding: 15px 30px;
  color: white;
  text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
  font-size: 20px;
}

#title-text #image-source {
  padding: 15px 30px;
  text-align: right;
  color: rgba(255,255,255,.6);
  font-size: 12px;
}

#story-content {
  padding: 20px;
}

#action {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  padding: 0 5px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

#action button {
  padding: 0;
  margin: 8px 0;
  border: none;
  color: white;
  text-shadow:0px 1px 2px rgba(0,0,0,0.3);
  font-size: 20px;
  background: none;
}
</style>
