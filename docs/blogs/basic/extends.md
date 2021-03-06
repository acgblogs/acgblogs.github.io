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

## 原型链继承
```javascript
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}

Animal.prototype.sayHello = function() {
    console.log(`my name is ${this.name}`)
}

function Snake(name) {
    this.name = name
}

Snake.prototype = new Animal()
const snake = new Snake('蛇')
snake.sayHello()
snake.colors.push('green')

const snake2 = new Snake()
snake2.colors.push('pink')

console.log(snake.colors)
console.log(snake2.colors)
```
::: danger
问题1：原型中包含的引用类型属性将被所有实例共享  
问题2：子类在实例化的时候不能给父类构造函数传参
:::
  
  
## 借助构造函数继承
```javascript
function Animal(name) {
    this.name = name
}

Animal.prototype.sayHello = function() {
    console.log(`my name is ${this.name}`)
}

function Snake(name) {
    Animal.call(this, name)
}

Snake.prototype = new Animal()
const snake = new Snake('蛇')
snake.sayHello()
```
::: danger
借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。  
但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会为实例创建（拷贝）一遍方法
:::
  

## 组合式继承
```javascript
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}

Animal.prototype.sayHello = function() {
    console.log(`my name is ${this.name}`)
}

function Snake(name) {
    Animal.call(this, name)
}

Snake.prototype = new Animal()
Snake.prototype.constructor = Snake

const snake = new Snake('蛇1')
snake.sayHello()
snake.colors.push('green')

const snake2 = new Snake('蛇2')
snake2.colors.push('pink')

console.log(snake.colors)
console.log(snake2.colors)
```
::: danger
解决了原型继承和组合继承的缺点，但是每次创建实例都会调用两次父类构造函数
:::
  
## 寄生组合式继承
```javascript
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}

Animal.prototype.sayHello = function() {
    console.log(`my name is ${this.name}`)
}

function Snake(name) {
    Animal.call(this, name)
}

Snake.prototype = Object.create(Animal.prototype)
Snake.prototype.constructor = Snake

const snake = new Snake('蛇1')
snake.sayHello()
snake.colors.push('green')

const snake2 = new Snake('蛇2')
snake2.colors.push('pink')

console.log(snake.colors)
console.log(snake2.colors)
```
::: tip 
解决了前面几种继承的缺点，是目前比较推荐的继承方式
:::
  
## class继承
```javascript
class Animal{
    constructor(name) {
        this.name = name
    }
    
    sayHello() {
        console.log(`my name is ${this.name}`)
    }
}

class Snake extends Animal {
    constructor(name, color) {
        super(name)
        this.color = color
    }
}

const snake = new Snake('蛇', 'green')
snake.sayHello()
snake.color
```
::: tip 
本质上是一种语法糖，底层借助寄生组合实现继承
:::