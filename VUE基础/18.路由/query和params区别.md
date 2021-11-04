# query 和 params 区别

query 语法：
传递参数 --> this.$router.push({path:"地址",query:{id:"123"}});
      或 --> this.$router.push({name:"地址",query:{id:"123"}});
接收参数 --> this.$route.query.id;

params 语法：
传递参数 --> this.$router.push({name:"地址",params:{id:"123"}});
接收参数 --> this.$route.params.id;

## 区别

1. query 用 path 或 name 来写传参地址，而 params 只能用 name 来编写传参地址
2. query 参数会在 浏览器地址栏 上显示，而 params 不会将参数显示在 浏览器地址栏
