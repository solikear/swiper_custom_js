/*
 * @Date: 2020-03-13 10:56:15
 * @LastEditors: Deer404
 * @LastEditTime: 2020-03-14 00:28:49
 * @FilePath: \练习\js\moveSpeed.js
 */
function moveSpeed(obj, json, callback) {
    // obj.id? clearInterval(obj.id):"";
    obj.id ? clearInterval(obj.id) : ""
    let flag
    obj.id = setInterval(function () {
        flag = true
        let attr, start, target, speed;
        for (attr in json) {
            // console.log(attr)
            //start为离左边的距离
            if (attr == "opacity") {
                start = parseInt(getStyle(obj, attr) * 100)
                target = json[attr] * 100
            } else {
                start = parseInt(getStyle(obj, attr))
                target = json[attr];
            }
            speed = (target - start) * 0.2; //保证速度最大值不超过相隔 距离
            //速度
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //保证最小速度为 1px
            if (start != target) {
                if (attr == "opacity") {
                    obj.style[attr] = (start + speed) / 100;
                } else {
                    obj.style[attr] = start + speed + "px";
                }
                flag = false
            }
        }
        if (flag) {
            clearInterval(obj.id)
            callback && callback()
        }
    }, 13)
}

function getStyle(obj, attr) {
    // 条件?结果1:结果2==》条件为真，那么取结果1，否则取结果2
    return obj.currentStyle ? (obj.currentStyle[attr]) : (getComputedStyle(obj, true)[attr]);
    /*  if(obj.currentStyle)//ie
          return  parseInt(obj.currentStyle[attr]);
      else
          return   parseInt(getComputedStyle(obj,true)[attr]);*/
}