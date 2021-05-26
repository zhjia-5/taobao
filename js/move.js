// 封装dom多值运动+回调函数方法
// 三个参数：dom,键值对属性对象，回调函数
function run(dom,attrObj,callback){
    clearInterval(dom.timer);
    var speed, cur;
    dom.timer = setInterval(function(){
        var lock = true;//锁
        for(var attr in attrObj){//for遍历属性
            if(attr == 'opacity'){ //如果是特殊属性opacity,
                cur = parseFloat(getStyle(dom,attr))*100;
            }else{//如果是width height left top ...
                cur = parseInt(getStyle(dom,attr));
            }
            speed = (attrObj[attr] - cur) / 7;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(attr == 'opacity'){
                dom.style.opacity = (cur + speed)/100;
            }else{  
                dom.style[attr] = cur + speed + 'px';
            }
            // 每次循环cur相加的属性值如果还没达到attrObj对象里面给定的属性值，那就锁住。
            // 如果如果达到的话就不会改变lock的值，每次lock的值将在53行出改为true
            if(cur != attrObj[attr]){
                lock = false;
            }
        }
        if(lock){//当所有的cur都达到传参的属性值，则清除定时器，并判断是否有回调函数，
            clearInterval(dom.timer);
            typeof callback == 'function' && callback();//&&：如果前面为true，则执行后面代码
        }
    },30);
}
// 封装获取样式的兼容性方法
function getStyle(dom,attr){
    if(window.getComputedStyle){//chrome and Firefox
        return window.getComputedStyle(dom,null)[attr];
    }else{
        return dom.currentStyle[attr];//IE
    }
}