(function(){
     // 淡入淡出轮播图
     var block = document.querySelector('.block'),
     f_left = document.querySelector('#content .btn .left'),
     f_right = document.querySelector('#content .btn .right'),
     cir_li = document.querySelectorAll('#content .cir li'),
     img = document.querySelectorAll('#content .firstUl img'),
     len = document.querySelectorAll("#content .firstUl li").length,// 获取image张数 
     flag = true,
     index = 0,
     timer,
     i;
 // 封装左右换图函数
 function leftOrRight(bool) {
     if (flag) {
         flag = false;
         img[index].className = '';
         cir_li[index].className = '';
         if (bool) {
             index++;
         } else {
             index--;
             if (index < 0) {
                 index = len - 1;
             }
         }
         index %= len;
         img[index].className = 'on';
         cir_li[index].className = 'on';
         // 防止用户快速点击
         setTimeout(function(){
             flag = true;
         },800);
     }
 }

 /* 自动播放 */
 function autoPlay() {
     timer = setInterval(function () {
         leftOrRight(true);
     }, 4000);
 }
 autoPlay();
 /* 当鼠标经过的时候，
     1.清除定时器 
     2.使用for循给数组cir_li的每一个元素添加对应的角标，即cir_li[0]的角标为0....
     3.cir_li[i].onclick：意思为无论点击哪个元素都会触发点击事件
     4.但cir_li[i]被点击后，通过this.index获取当前被点击的元素角标
     5.然后利用for循环删除所有角标，再单独给img[this.index]和cir_li[this.index]添加on类名
 */

 // 点击圆点
 block.onmouseover = function () {
     clearInterval(timer);
     for (i = 0; i < len; i++) {
         cir_li[i].index = i;
         cir_li[i].onclick = function () {
             index = this.index;//记录当前被点击的角标
             for (i = 0; i < len; i++) {
                 cir_li[i].className = '';
                 img[i].className = '';
             }
             cir_li[index].className = 'on';
             img[index].className = 'on';
         }
     }
 }
 // 鼠标离开在器自动播放
 block.onmouseout = function () {
     clearInterval(timer);
     autoPlay();
 }
 // 点右箭头切换下一张
 f_right.onclick = function () {
     leftOrRight(true);
 }
 // 点左箭头切换上一张
 f_left.onclick = function () {
     leftOrRight(false);
 }


 /* 滚动轮播图 */
 var carousle2 = document.querySelector('.carousle2'),/* 获取第二个轮播图块，当鼠标经过清除定时器 */
     s_left = document.querySelector('#content .secBtn .left'),/* 第二个轮播图左按钮 */
     s_right = document.querySelector('#content .secBtn .right'),/* 第二个轮播图右按钮 */
     line_li = document.querySelectorAll('#content .line li'),/* 线型li导航列表 */
     secLi = document.querySelectorAll('#content .secUl li'),/* 获取图片列表li */
     secUl = document.querySelector('#content .secUl'),
     liWidth = secLi[0].offsetWidth,
     len2 = secLi.length,// 获取image张数 
     numAll = document.querySelector('.numAll'),
     num = document.querySelector('.num'),
     lock = true,
     index2 = 0,
     timer2,
     j;

 // 封装左右播放函数
 function leftOrRight2(bool) {
     // 进入函数的锁，初始状态为开
     if (lock) {
         lock = false;//当进行图片切换的时候，把门锁掉，等整张图片切换完成再开锁，避免切换图片到一半就点击
         if (bool) {//右点击按钮
             run(secUl, { left: secUl.offsetLeft - liWidth }, function () {
                 index2++;
                 if (index2 >= len2 - 1 || secUl.offsetLeft <= -(len2 - 1) * liWidth) {
                     index2 = 0;
                     secUl.style.left = 0 + 'px';
                 }
                 changeIndex();
                 lock = true;//当图片切换完成后再把锁打开，以便下次再次执行
             });
         } else {//左点击按钮
             if (index2 <= 0 || secUl.offsetLeft >= 0) {
                 index2 = len2 - 1;
                 secUl.style.left = -(len2 - 1) * liWidth + 'px';
             }
             run(secUl, { left: secUl.offsetLeft + liWidth }, function () {
                 index2--;
                 changeIndex();
                 lock = true;
             });
         }
     }
 }
 //  自动播放函数
 function autoplay2() {
     timer2 = setInterval(function () {
         leftOrRight2(true);
     }, 4000);
 }
 autoplay2();

 carousle2.onmouseover = function () {
     clearInterval(timer2);
 }
 carousle2.onmouseout = function () {
     autoplay2();
 }
 // 左点击按钮
 s_left.onclick = function () {
     leftOrRight2(false);
 }
 // 右点击按钮
 s_right.onclick = function () {
     leftOrRight2(true);
 }
 // 改变index函数  和  引索数字的切换
 function changeIndex() {
     for (j = 0; j < len2 - 1; j++) {
         line_li[j].className = '';
         line_li[index2].className = 'on';
     }
     num.innerText = index2 + 1;
     numAll.innerText = len2 - 1;
 }
 // index索引点击切图
 for (j = 0; j < len2 - 1; j++) {
     line_li[j].index2 = j;
     line_li[j].onclick = function () {
         index2 = this.index2;
         run(secUl, { left: - liWidth * index2 });
         changeIndex();
     }
 }
}())