---
title: Dom2事件的妙用
date: '2021-06-07 08:00:00'
sidebar: true
categories:
 - Dom2
 - addEventListener
tags:
 - 事件监听
 - addEventListener
publish: true
---

本文有感而发，源于之前开发的类swipe轮播插件

## dom2事件的生命周期

注册：通过 `addEventListener` 方法注册监听器到被监听的对象，即`EventTarget`上，也就是绑定了监听器的引用，这个引用必须是`EventListenerOrEventListenerObject` 类型
> 
> `EventListener` 是一个回调函数，当被监听对象触发了事件侦听的行为时触发该函数
>  `EventListenerObject` 是一个实现了handleEvent方法的对象，当被监听对象触发了事件侦听的行为时触发该对象的handleEvent方法

反注册：通过 `removeEventListener` 方法移出监听引用

本质：dom2事件监听的注册和反注册过程本质是对监听器的引用和解绑过程。在非主动解绑事件的前提：正常绑定在dom上的事件监听器，会随dom销毁的时候被反注册（详细查阅dom的消耗过程），绑定在window上的事件需要window被销毁（如刷新页面等情况）才会反注册。也就是说，当被监听对象被销毁或者监听引用被释放时，事件监听也就结束了

示例：
```javascript
function handleEvent() {
    console.log('I am a button') 
}

const button = document.querySelector('input[type=button]')
const normalObject = { handleEvent }

button.addEventListener('click', normalObject.handleEvent)

setTimeout(() => {
    button.removeEventListener('click', handleEvent)
}, 5000)

// Q1：5s后点击按钮的输出？
// Q2：如果第8行代码改为以下形式，5s后点击按钮的输出又会是啥？
button.addEventListener('click', normalObject)
```

## 为什么引入 `EventListenerObject`
按我个人理解是从集中式管理方面出发：当单个事件对象不同事件触发行为表现一致，又或者是多个事件对象同一事件行为表现一致时，可以采用集中式管理

例如：
> 当一个dom元素绑定多个事件，然后这些事件最终的行为结果是一样时，可采用集中式管理，举个例子：
> 
> domA的鼠标移动，鼠标按下或者鼠标点击事件最终都需要激活某一项功能时，可以通过`EventListenerObject`进行集中式管理
```javascript
const eventListenerObject = {
    handleEvent() {
        // do something
    }
}
domA.addEventListener('mousemove', eventListenerObject)
domA.addEventListener('mousedown', eventListenerObject)
domA.addEventListener('click', eventListenerObject)
```
 
  
> 当多个dom元素绑定同个行为事件，然后这些事件最终的行为结果是一样时，可采用集中式管理，举个例子：
> 
> domA的鼠标点击，domB的鼠标点击或者domC的鼠标点击事件最终都需要激活某一项功能时，可以通过`EventListenerObject`进行集中式管理
```javascript
const eventListenerObject = {
    handleEvent() {
        // do something
    }
}
domA.addEventListener('click', eventListenerObject)
domB.addEventListener('click', eventListenerObject)
domC.addEventListener('click', eventListenerObject)
```

## `EventListenerObject`的妙处

> 组件式原则
```javascript
// 回归到开头提到的有感而发，swipe组件内部的事件该如何处理，看如下代码：
// 示例一
class Swipe implements EventListenerObject {
    constructor() {}

    handleEvent({ type }) {
        switch(type) {
            case 'touchStart':
                return this.touchStart()
            case 'touchMove':
                return this.touchMove()
            case 'touchEnd':
                return this.touchEnd()
        }
    }

    touchStart() {
        // do something
    }

    touchMove() {
        // do something
    }

    touchEnd() {
        // do something
    }
}
// 示例二
const eventListenerObject = {
    handleEvent() {
        console.log('handle click')
    }
}

domA.addEventListener('click', eventListenerObject)
// 点击输出domA输出 'handle click'

window.addEventListener('click', eventListenerObject)
// 点击任意地方输出 'handle click'
```
> 
> 暴力式解绑事件
```javascript
const swipe = new Swipe()
// 示例一中， 这一句一旦执行，注册于该对象的所有收集到的事件都会被解绑
swipe.handleEvent = null

// 示例二中
eventListenerObject.handleEvent = null
// window和domA的点击事件被解绑
```

## `EventListenerObject`的弊端
> 难以通过监听对象无法判断触发顺序
```javascript
// 如 对 domA添加 多个相同类型的事件时，不轻易判断执行顺序
// 如果按照常规事件监听
domA.addEventListener('click', () => {
    console.log('first')
})
domA.addEventListener('click', () => {
    console.log('second')
})
// 按照 EventListenerObject 事件监听
const eventObj = {
    handleEvent({ type }) {
        // 无法知道是1还是2触发的行为，当然可以通过计数判断，但是不合理
        console.log('???')
    }
}
domA.addEventListener('click', eventObj)
domA.addEventListener('click', eventObj)
```
> 部分暴力解绑过程不可逆
```javascript
const swipe = new Swipe()
// 如前面 通过  swipe.handleEvent = null解绑所有事件后，无法再次注册里面的逻辑事件
```