---
title: Echart使用踩坑
date: '2020-09-08 08:00:00'
sidebar: true
categories:
 - echart
 - 踩坑
tags:
 - echart
 - 宽高自适应
publish: true
---

## Echart渲染无法自适应宽高

当echart渲染前，如果绑定的dom元素处于display: none状态，echart无法获取dom的实际宽高，这时会以默认的100 * 100宽高来渲染
解决办法是设置固定宽高