# referer 作用

referer 头信息提供了引导用户代理到当前页的前一页的地址信息

## 防盗链

当我们在自己的网页里引用站外的图片时，常出现图片无法正常显示的情况

### 服务器是怎么知道这个图片是在站外被引用的呢

如果是直接在浏览器输入地址进来，则没有 Referer 参数
这就是为什么服务器知道我们的图片是从哪引用过来的，也知道客户们是从哪个网站链接点过来的。

### 如何配置服务器，用来图片防盗链

原理：在服务器层面，根据HTTP协议的referer头信息进行判断
如果来自站外，则统一重写到一个很小的防盗链提醒图片上去。

具体步骤：
1、打开apache重写模块 mod_rewrite
2、在需要防盗的网站或目录，写 .htaccess 文件，并指定防盗链规则
如何指定？分析referer信息，如果不是来自本站，则重写。
重写规则：那种情况重写？
是 jpeg/jpg/gif/png 图片时，是 referer 头与 localhost 不匹配时重写。

## 防止 CSRF 攻击
