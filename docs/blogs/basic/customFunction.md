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

::: tip Call函数
Call方法接收两个参数(context, ...args)，context为即将改变this指向的对象，args为任意个普通参数
:::

```javascript
Function.prototype.myCall = function(context,...args){
    context = [null,undefined].includes(context) ? Window : Object(context)
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}
```
  

::: tip Apply函数
Apply方法接收两个参数(context, args)，context为即将改变this指向的对象，args为单个数组对象
:::
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
  

::: tip Bind函数
Bind方法与Call方法极其相似，不同点在于bind返回的是函数而不是执行结果  
相同点是同样接收两个参数(context, ...args)，context为即将改变this指向的对象，args为任意个普通参数
:::
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