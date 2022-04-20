const proxy = require('http-proxy-middleware');
// setupProxy.js 可以配置多个代理，可灵活的控制请求是否进行代理
module.exports = function(app) {
  app.use(
    proxy('/api1', { // 请求路径前缀为 /api1 则会触发该代理配置
      target: 'http://localhost:5000', // 请求转发给谁
      changeOrigin: true, // 控制服务器收到的请求头中 host 字段的值
      pathRewrite: {'^/api1': ''} // 去除请求前缀，保证交给服务器的是正常请求地址（必须）
    }),
    proxy('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {'^/api2': ''}
    })
  )
}