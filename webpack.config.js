// 由于 webpack 是基于 node 进行构建的，所以，webpack 的配置文件中，任何合法的 node 代码都是支持的
var path = require('path')

// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时把打包好的 bundle 注入到页面底部
var htmlWebpackPlugin = require('html-webpack-plugin')
// 如果要配置以上插件，需要再导出的对象中，挂载一个 plugins 节点，跟 entry output 同级别

// 当以命令形式运行 webpack 或者 webpack-dev-server 的时候，工具会发现，我们并没有提供要打包的文件 入口 和 出口文件
// 此时，他会检查项目根目录中的 配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象进行打包构建

module.exports = {
    entry: path.join(__dirname,'./src/main.js'), //入口文件
    output: { // 指定输出选项
        path: path.join(__dirname,'./dist'), //输出路径
        filename: "bundle.js" //指定输出文件的名称
    },
    plugins: [ //所有的 webpack 插件的配置 节点
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'), //指定模板文件路径
            filename: "index.html" // 设置生成的内存页面名称
        })
    ],
    module: { //配置所有第三方loader模块
        rules: [// 第三方模块的匹配规则
            {test: /\.css$/, use: ['style-loader','css-loader']}, // 处理css文件的loader
            {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']}, //处理scss文件的loader
            {test: /\.less$/, use: ['style-loader','css-loader','sass-loader','less-loader']},//处理less文件的loader
            // 给 loader 传参就跟给 链接传参一样 在 loader 后面 加个问号 比如 url-loader?id=10&age=20
            // url-loader 后面的参数是固定的 limit=图片字节大小
            // limit给定的值是图片的大小，如果我们引用的图片的大小，大于或者等于给定的limit的值，则不会被转为 base64 格式的字符串
            // 如果图片小于给定的 limit 值，则会被转化为 base64 的字符串
            // [name]表示的是用原本的图片的名字 [ext]表示的是用原本图片的后缀名 [hash:8]截取哈希值的前8位
            {test: /\.(jpg|png|bmp|jpeg|gif)$/,use:'url-loader?limit=11295&name=[hash:8]-[name].[ext]'},// 这是处理图片路径的 loader
            {test: /\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}, //这是处理 字体文件 的loader
            {test: /\.js$/,use:'babel-loader', exclude: /node_modules/} //这是配置 Babel 来转换高级的 ES 语法

        ]
    }
}