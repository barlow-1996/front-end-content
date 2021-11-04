<template>
    <div>
        <h3>这是 body 组件 === {{ msg }}</h3>
        <router-link to="/login"> 登录 </router-link>
        <router-link to="/register"> 注册 </router-link>
        <router-view></router-view>

        <input type="button" value="post请求" @click="postInfo">
        <p>{{ content }}</p>
    </div>
</template>

<script>
import axios from 'axios' // 用axios的组件要先导入 axios 库
import './mock'

export default {
  data () {
    return {
      msg: '456',
      content: '好笑的笑话'
    }
  },
  methods: {
    postInfo () {
      // var that = this
      var url = '/api/msdk/proxy/query_common_credit'
      axios.get(url).then(
        function (response) {
          // that.content = response.data // 这里的 this 已经不指向 data 了，所以要在上面定义一个 that 来表示之前的 this 指向
          console.log(response.data)
          // {
          //   data: {},    // data由服务器提供的响应
          //   status: 200,  // 服务器响应的 HTTP 状态码
          //   statusText: 'OK',   // 服务器响应的 HTTP 状态信息
          //   headers: {},    // 服务器响应的头
          //   config: {}     // 为请求提供的配置信息
          // }
        }, function (err) {
          console.log(err)
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
