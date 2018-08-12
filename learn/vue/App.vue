<template>
  <div id="app">
    <app-header></app-header>
    <img src="./assets/logo.png">
    <h1>{{ title }}</h1>
    <users v-bind:users="clients"></users>
    <app-footer></app-footer>
  </div>
</template>
<!--根模板内部只有一个根标签-->

<script>
  import Users from './components/Users.vue'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  //局部注册组件

  export default {
    name: 'App',
    data(){
        return {
            title:"Michael AN's fisrt Vue CLI",
            clients:[
              {name:"Mike",age:20,show:false},
              {name:"Tom",age:26,show:false},
              {name:"Amy",age:23,show:false}
            ]
            //如果数据是公共的，可以放在根组件目录下
        }
    },
    components:{
      "users":Users,
      "app-header":Header,
      "app-footer":Footer
      //组件注册（字符串对应的标签可以直接当做标签使用），组件的名称不能使用系统的标签，文件的路径使用英文
    }
  }
</script>


<style>
  body {
    margin:0px;
  }
  #app {
    font-family:Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    color: #2c3e50;
  }
</style>
