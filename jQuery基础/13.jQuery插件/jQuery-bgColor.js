(function($) {
    // 自己封装插件有两种方法

    // 1. 给jQuery原型添加方法
    $.fn.bgColor = function(color) { // 这里的 $.fn 就是jQuery的原型
        // console.log(this);  // this是调用这个bgColor方法的jQuery对象
        this.css('backgroundColor',color)

        // 返回调用这个方法的jQuery本身
        return this
    }

    // 2. 给jQuery直接添加方法
    $.add = function(a,b) {
        return a+b
    }
}(jQuery))