// 项目的js入口文件

console.log('OK');

import './css/index.css'

import './css/index.scss'

import './css/index.less'

// 注意：如果要通过路径的形式，去引入 node_modules 中相关的文件，可以直接省略路径前面的 node_modules 这一层目录，直接写 包 的名称，然后后面
// 跟上具体的文件路径，不写这层目录，默认就会去 node_modules 中查找
import 'bootstrap/dist/css/bootstrap.css'

// class关键字，是 ES6 中提供的新语法，是用来实现 ES6 中面向对象编程的方式
class Person{ // 相当于一个 Person 的构造函数，到时候可以 new 一个 person 得到一个 person 实例
    // 使用 static 关键字，可以定义静态属性
    // 静态属性其实就是可以直接通过 类名直接访问的属性，比如 Person.info
    // 跟静态属性相对的是实例属性，他是只能通过类的实例来访问的属性，比如 p1.name
    static info = {name:'zs',age:20}
}

console.log(Person.info);

// 通过构造函数拿到的实例对象，这个跟java C# 实现的面向对象的方式 完全一样 ，class 是从后端语言借鉴过来的，来实现面向对象
// var p1 = new Person();