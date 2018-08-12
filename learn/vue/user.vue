<template>
  <div class="users">
    <h2>Our Main Clients</h2>
    <ul>
      <li v-for="user in users" v-on:click="user.show = !user.show">
        <h3>{{ user.name }}</h3>
        <p v-show="user.show">{{ user.age }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: 'users',
      props:{
        users:{
          type:Array,
          required:true
        }
      },
      //使用props进行属性传值，说明传值的属性
      data () {
         return {
          //直接进行组件内数据使用
          //users:[
            //{name:"Mike",age:20,show:false},
            //{name:"Tom",age:26,show:false},
            //{name:"Amy",age:23,show:false}
            //]
         }
      }
    }
</script>

<style scoped>
    .users{
      width:500px;
      margin:0 auto;
    }
    h1, h2 {
      font-weight: normal;
    }
    ul {
      list-style-type: none;
      padding: 0;
      border:2px solid #ccc;
    }
    li {
      display: inline-block;
      margin: 0 10px;
      border:1px solid pink;
    }
    a {
      color: #42b983;
    }
</style>
