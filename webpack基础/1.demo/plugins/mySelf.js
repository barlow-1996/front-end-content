class MyPlugin {
  constructor(option = {}) {};

  apply(compiler) {
    compiler.hooks.done.tap('MyPlugin', function(compilation, callback) {
      // compilation 指向当前模块
      console.log('I am done!');
    })
  }
}

module.exports = MyPlugin;