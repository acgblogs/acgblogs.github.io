---
title: 手撕函数篇
date: '2020-09-08 08:00:00'
sidebar: true
categories:
 - 手撕
 - 函数
tags:
 - call
 - bind
 - apply
publish: true
---
## 手写call方法
call方法接收两个参数(context, ...args)，context为即将改变this指向的对象，args为任意个普通参数

```javascript
Function.prototype.myCall = function(context,...args){
    context = [null,undefined].includes(context) ? Window : Object(context)
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
```
  
## 手写apply方法
apply方法接收两个参数(context, args)，context为即将改变this指向的对象，args为单个数组对象
```javascript
Function.prototype.myApply = function(context, args = []){
    if(Object(args).constructor !== Array){
        throw new Error('the second param args must be the type of Array')
    }
    context = [null,undefined].includes(context) ? Window : Object(context)
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
```
  
## 手写bind方法
bind方法与Call方法极其相似，不同点在于bind返回的是函数而不是执行结果  
相同点是同样接收两个参数(context, ...args)，context为即将改变this指向的对象，args为任意个普通参数
```javascript
Function.prototype.myBind = function(context, ...args){
    const self = this
    return function() {
        context = [null,undefined].includes(context) ? Window : Object(context)
        context.fn = self
        const result = context.fn(...args)
        delete context.fn
        return result
    }
}
```
  
## 手写new
new的本质分为以下4个步骤：  
1. 创建一个新的对象
2. 将构造函数中的this指向该对象
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回对象（按照规范，如果函数执行值是值类型返回该新对象，如果是引用类型返回该引用）
```javascript
function Animal(name) {
    this.name = name
}

function myNew(fn, ...args) {
    const obj = Object.create(null)
    obj.__proto = fn.prototype
    const res = fn.apply(obj, args)
    return res instanceof Object ? res : obj
}

myNew(Animal, '哈士奇')
```

## 防抖函数

## 节流函数

## Object相关方法

### Object.create()
```javascript
function objectCreate(obj, properties){
    if(typeof obj !== 'object') {
        throw new Error('Object prototype may only be an Object or null')
    }
    if([null, undefined].includes(properties)) {
        throw new Error('Cannot convert undefined or null to object')
    }
    return { __proto__: obj }
}
```