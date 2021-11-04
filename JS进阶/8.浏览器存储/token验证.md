# token 验证

1. 第一次登录的时候，前端向后端的登陆接口发送用户名和密码
2. 后端收到请求，验证用户名和密码，验证成功就给前端返回一个 token
3. 前端拿到 token，将 token 存储到 localStorage 或 vuex 中，并跳转路由页面
4. 此后前端每次跳转路由，就判断 localStroage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面(通过路由守卫)
5. 每次向后端接口发送请求时，都要用请求拦截器在请求头中加 token
  axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
6. 后端判断请求头中有无 token，有 token 就验证 token，验证成功返回数据，验证失败（例如：token过期）就返回 401，请求头中没有 token 也返回 401
7. 如果前端拿到状态码为 401，就清除 token 信息并跳转到登录页面(通过响应拦截器)

## token 应该存储在 cookie 还是 webStorage 中

1. token 存储在 cookie
优点：可以指定 httponly 来防止被 JS 读取；也可以指定secure 来保证 token 只在 HTTPS下 传输
缺点：每次都要发给服务器，增加请求大小，且容易遭受 CSRF 攻击(可以在服务器端检查 Refer 和 Origin)

2. token 存储在 webStorage
优点：不用每次都发给服务器，可减小请求与响应的大小
缺点：webStorage 可被 JS 访问，所以容易遭受 XSS 攻击

如果大部分资源/请求都需要服务器授权，那就应该用 Cookie，浏览器会自动将 Cookie 发给服务器
如果绝大部分资源都不需要授权，只有少数几个功能（AJAX实现）是需要授权的，那就使用 LocalStorage
