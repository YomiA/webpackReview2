1. 拿到新项目的时候，要用包管理工具把他管理起来，所以要先用 npm init -y 创建一个包管理文件(package.json);
2. 创建文件夹 src 和 dist
3. 创建 src 里面的 index.html 和 main.js 文件
4. 尝试下能不能在命令窗口打包 在命令窗口 输入 webpack .\src\main.js .\dist\bundle.js
   注意：由于 webpack 版本太高，不能用以上的命令，所以要改为 webpack .\src\main.js -o .\dist\bundle.js 而且就算没有 dist 这个文件夹，webpack 也会帮我们自动生成一个文件夹
5. 然后在 index.html 文件中导入 bundle.js 不是 main.js,这样就能看到 main.js 效果了
6. 全局打包效果不大好，为了能够让它自动打包，所以我们要安装一个工具(webpack-dev-server)进行自动打包 安装方法 npm i webpack-dev-server -D
   注意：安装 webpack-dev-server 的时候，可能会有警告说你未安装 webpack ,所以这时候你要按照他要求来按照对应的 webpack 工具 (安装方法：npm i webpack -D)
7. 自动打包之前，我们需要再根目录里面新建一个配置文件叫 webpack.config.js
8. 刚刚安装了 webpack-dev-server 而想要用这个工具去实施打包的话，那么就要在 package.json 里面添加一个有关于的 webpack-dev-server 的脚本
   添加的脚本是："dev":"webpack-dev-server --open --port 3000 --contentBase src --hot"
   注意：一定要再 "scripts" 这个中添加脚本,添加完之后运行 npm run dev 可能会报错，叫你安装 webpack-cli 那你就安装这个
   运行完之后可能会报错，这时候你就要去 index.html 里面的 bundle.js 路径改下，因为这时候生成的 bundle.js 文件不在dist中，而是在虚拟内存中
   或者说 这时候 你直接安装一个 html-webpack-plugin 工具，有这个工具你就可以不用写 bundle.js 路径，他会自动生成路径
9. 安装 html-webpack-plugin 这个工具,装完之后就要去配置文件中对 html-webpack-plugin 这个工具进行配置
10. 以上就是对 js 的引用和导入还有配置的问题，但是页面中不可能单单存在js还有一些样式css文件存在，接下来就是对css的引用和导入配置
11. 引用和导入 css 我们不可能像 js 那样,因为 plugin 只是对 js 有效，对 css 无效,这时候我们就需要用到另一个工具 loader
    这个工具就是专门处理 plugin 处理不了的文件，所以这时候就需要安装 loader 这个工具了
    安装方法是 cnpm i style-loader css-loader -D
12. 安装完 loader 这个加载器之后，也要跟 plugin 一样去 配置文件里面 配置下。
13. 删除掉 node-modules ,输入 npm i 可以重新安装 node-modules
14. 以上是 loader 处理 css 文件的，但是在一些 css 文件中会出现图片等的 url 地址该怎么处理呢？
15. 默认情况下，webpack 无法处理 css 文件中的 url 地址，不管是 照片 还是 字体库 ，只要是 url 地址都处理不了
    所以就又要安装另外的一个 loader 来处理这些 css 文件, 那就是 url-loader 但是他是依赖于里面的一个 file-loader 所以俩个都要装
    通过 cnpm i url-loader file-loader -D 来安装对应的 loader 安装完之后也要去 配置文件里面 配置下
16. 配置的时候，因为图片名称的问题，所以有时候要给 url-loader 传一些参数
    给 loader 传参就跟给 链接传参一样 在 loader 后面 加个问号 比如 url-loader?id=10&age=20
    url-loader 后面的参数是固定的 limit=图片字节大小
    limit给定的值是图片的大小，如果我们引用的图片的大小，大于或者等于给定的limit的值，则不会被转为 base64 格式的字符串
    如果图片小于给定的 limit 值，则会被转化为 base64 的字符串
    [name]表示的是用原本的图片的名字 [ext]表示的是用原本图片的后缀名 [hash:8]截取哈希值的前8位
17. 接下来是处理 字体文件 的，也是用的 url-loader 来处理的，和图片处理一样 我们先导入一些字体文件，比如 Bootstrap 里面就有很多的 字体文件
    也就是小图标，所以首先我们得要安装 bootstrap,用命令行来安装 cnpm i bootstrap -s 安装完成后，再 main.js 中导入bootstrap 然后再去
    配置文件中处理字体文件用 url-loader
18. 在 webpack 中，默认只能处理 一部分的 ES6 语法，一些更高级的ES6语法或者 ES7 语法，webpack 是处理不了的；这时候就需要借助于第三方的
    loader，来帮助 webpack 处理这些高级的语法，当第三方 loader 把高级语法 转为 低级的语法后，会把结果交给 webpack 去打包到bundle.js中去
19. 通过 Babel，可以帮我们将高级的语法 转为 低级的语法，在 webpack 中，可以运行如下两套命令，安装两套包，去安装相关的 Babel 的loader功能
20. 第一套包：cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
    第二套包：cnpm i babel-preset-env babel-preset-stage-0 -D
21. 安装完上面的俩个包之后，打开 webpack 配置文件 webpack.config.js 在 module 节点下的 rules 数组中，添加一个新的匹配规则：
    { test:/\.js$/, use:'babel-loader', exclude:/node_modules/ } 注意:在 配置 babel 的 loader 规则的时候，必须把 node_modules
    目录，通过 exclude 选项排除掉，原因有俩个：
    21-1. 如果不排除 node_modules, 则 Babel 会把 node_modules 中所有的 第三方 JS 文件都打包编译，这样会非常消耗 CPU 同事打包速度非常慢
    21-2. 哪怕最终 Babel 把所有的 node_modules 中的js都打包完毕了，项目也是无法运行的
22. 在项目的 根目录 中，新建一个叫做 .babelrc 的 Babel 配置文件，这个 配置文件，属于 JSON 格式，所以在写 .babelrc 配置的时候，必须要符合
    JSON 语法规范。例如：不能写注释，字符串必须用 双引号
23. 在 .babelrc 文件中写如下配置： 可以把 [preset] 翻译成 [语法] 的意思
    {
      "presets":["env","stage-0"],
      "plugins":["transform-runtime"]
      }