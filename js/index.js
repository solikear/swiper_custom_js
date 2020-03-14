/*
 * @Date: 2020-03-13 11:59:56
 * @LastEditors: Deer404
 * @LastEditTime: 2020-03-14 19:58:34
 * @FilePath: \轮播图\js\index.js
 */
"use strict"
let ul = document.querySelector("ul")
let next = document.querySelector("#next")
let prev = document.querySelector("#prev")
let index = 1
let points = document.querySelectorAll(".points li")
let limitTimer;
let autoTimer;
let container = document.querySelector(".window")
container.onmouseover = stop
container.onmouseout = play
/**
 * 遍历按钮集合 给每个按钮绑定点击事件
 */
points.forEach((item, i) => {
    item.onclick = () => {
        index = i + 1
        move()
    }
})
//下一页点击事件
next.onclick = () => {
    clearTimeout(limitTimer)
    //节流函数防止疯狂点击 缺点 200ms轮播时间=轮播函数内时间+200ms
    limitTimer = setTimeout(() => { 
        index += 1
        move()
    }, 200)
}
//上一页点击事件
prev.onclick = () => {
    clearTimeout(limitTimer)
    limitTimer = setTimeout(() => {
        index -= 1
        move()
    }, 200)
}
/**
 * 移动函数，利用包装好的插件，进行移动
 * 利用补图法 当图片滚到辅助图时候，利用插件回调调整到正确位置
 */
function move() {
    let target = index * -520
    switch (target) {
        case -3120:
            moveSpeed(ul, {
                left: target
            }, () => {
                ul.style.left = "-520px"
            })
            break
        case 0:
            moveSpeed(ul, {
                left: target
            }, () => {
                ul.style.left = "-2600px"
            })
            break
        default:
            moveSpeed(ul, {
                "left": target
            })
            break

    }
    //更新index值
    if (index == 6) {
        index = 1
    }
    if (index == 0) {
        index = 5
    }
    buttonShow()
}
/**
 * 按钮更新函数 遍历按钮集合，更新按钮的选中状态
 */
function buttonShow() {
    points.forEach((item) => {
        // item.className ==""
        if (item.className == "on") {
            item.className = ""
        }
    })
    points[index - 1].className = "on"
}
/**
 * 自动轮播 1500ms轮播一次图片
 */
function play() {
    autoTimer = setInterval(() => {
        next.onclick()
    }, 1500)
}
/**
 * 停止自动轮播
 */
function stop() {
    clearInterval(autoTimer)
}
window.onload = () => play()