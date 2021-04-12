---
title: 继承篇
date: '2020-09-08 08:00:00'
sidebar: true
categories:
 - 继承
 - 原型
tags:
 - 原型
 - 寄生
 - 组合
publish: true
---

## 原型继承
```javascript
function Animal() {
    this.name = '动物'
}

Animal.prototype.sayHello = function() {
    console.log(`my name is ${this.name}`)
}

function Snake(name) {
    this.name = name
}

function Pig(name) {
    this.name = name
}

Snake.prototype = new Animal()
const snake = new Snake('蛇')
console.log(snake)
snake.sayHello()

Pig.prototype = new Animal()
Pig.prototype.sayHi = function() {
    console.log('i want to eat')
}

new Pig('猪').sayHello()
snake.sayHi()
```
::: danger
问题1：原型中包含的引用类型属性将被所有实例共享  
问题2：子类在实例化的时候不能给父类构造函数传参
:::